import "dotenv/config";
import fs from "fs";
import path from "path";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { extractDocxText, parseTourLines, parseDuration, inferCategory } from "./seed-lib/docx";
import { slugify } from "../src/lib/slugify";
import { serializeHighlights } from "../src/lib/tour-constants";

const CATEGORIES = [
  { slug: "cultural", label: "Cultural & Festivals", order: 1 },
  { slug: "spiritual", label: "Spiritual & Wellness", order: 2 },
  { slug: "luxury", label: "Luxury Escapes", order: 3 },
  { slug: "trekking", label: "Hiking & Treks", order: 4 },
  { slug: "specialty", label: "Specialty Packs", order: 5 },
];

const COVER_IMAGES: Record<string, string[]> = {
  cultural: [
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=70&w=800",
    "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=70&w=800",
  ],
  spiritual: [
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=70&w=800",
  ],
  luxury: [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=70&w=800",
  ],
  trekking: [
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=70&w=800",
  ],
  specialty: [
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=70&w=800",
  ],
};

function coverFor(category: string, index: number): string {
  const pool = COVER_IMAGES[category] ?? COVER_IMAGES.cultural;
  return pool[index % pool.length];
}

const DESTINATIONS = [
  {
    name: "Paro Valley",
    description: "Gateway city, home to Tiger's Nest and stunning heritage rice terraces.",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=70&w=500",
    order: 1,
  },
  {
    name: "Thimphu",
    description: "The iconic capital with zero traffic lights, giant Buddha statues, and arts.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=70&w=500",
    order: 2,
  },
  {
    name: "Punakha",
    description: "The ancient winter capital containing the most beautiful riverside fortress palace.",
    image:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=70&w=500",
    order: 3,
  },
  {
    name: "Bumthang Valley",
    description: "The spiritual heartland packed with ancient myths and profound temples.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=70&w=500",
    order: 4,
  },
  {
    name: "Phobjikha Valley",
    description: "Stunning broad glacial marshes home to endangered overwintering black cranes.",
    image:
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=70&w=500",
    order: 5,
  },
  {
    name: "Haa Valley",
    description: "Isolated pristine ancestral alpine valley featuring raw nomadic cultures.",
    image:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=70&w=500",
    order: 6,
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Yeti Tours designed a flawless luxury itinerary for our family. Staying at Aman while our private guide arranged a spontaneous audience with a local village head was magical. An absolute 10 out of 10 experience.",
    name: "Elizabeth & Arthur M.",
    place: "London, UK",
    initials: "EA",
    order: 1,
  },
  {
    quote:
      "The Druk Path trek arranged by Yeti was phenomenal. The camp chef cooked gourmet multi-course organic meals high up beside pristine high-altitude mountain lakes. Their support team is world-class.",
    name: "Dr. David K.",
    place: "Sydney, Australia",
    initials: "DK",
    order: 2,
  },
];

interface SeedPackage {
  slug: string;
  title: string;
  category: string;
  summary: string;
  overview: string;
  durationDays: number;
  durationNights: number;
  locations: string;
  highlights: string[];
  priceFrom: number | null;
  priceNote: string | null;
  coverImage: string;
  featured: boolean;
  published: boolean;
  itinerary: { dayNumber: number; title: string; description: string }[];
}

const FEATURED_PACKAGES: Omit<SeedPackage, "slug">[] = [
  {
    title: "Glimpse of Bhutan & Tshechu Festival",
    category: "cultural",
    summary:
      "Immerse your senses in vibrant spiritual dances, ancient fortresses, and colorful textiles of Thimphu and Paro.",
    overview:
      "This foundational itinerary uncovers the classic valley highlights of Bhutan matching your dates perfectly with local colorful monastery tshechu celebrations.",
    durationDays: 7,
    durationNights: 6,
    locations: "Paro, Thimphu, Punakha",
    highlights: [
      "Hike up to the breathtaking Tiger's Nest Monastery (Paro Taktsang)",
      "Witness magnificent sacred mask dances inside a fortress dzong",
      "Explore the organic farmhouses and traditional textiles of Thimphu",
    ],
    priceFrom: 2150,
    priceNote: null,
    coverImage: COVER_IMAGES.cultural[0],
    featured: true,
    published: true,
    itinerary: [
      { dayNumber: 1, title: "Arrival in Paro & Transfer to Thimphu", description: "" },
      { dayNumber: 2, title: "Full Day Cultural Exploration in capital Thimphu", description: "" },
      { dayNumber: 3, title: "Scenic drive over Dochula Pass to Punakha valley", description: "" },
      { dayNumber: 4, title: "Discover Punakha Dzong & suspension bridge walkways", description: "" },
      { dayNumber: 5, title: "Drive back to Paro valley for historical tours", description: "" },
      { dayNumber: 6, title: "Pilgrimage hike to Tiger's Nest Monastery", description: "" },
      { dayNumber: 7, title: "Farewell departure at Paro International Airport", description: "" },
    ],
  },
  {
    title: "Himalayan Meditation & Yoga Retreat",
    category: "spiritual",
    summary:
      "Find inner harmony through early morning monastic prayers, mindful sound healing, and yoga overlooks.",
    overview:
      "A restorative journey engineered to unplug you from modern stress by utilizing isolated alpine landscapes and wisdom from living master practitioners.",
    durationDays: 9,
    durationNights: 8,
    locations: "Thimphu, Phobjikha Valley",
    highlights: [
      "Private audience and blessing ceremony with a high-ranking Lama",
      "Daily outdoor sunrise yoga across sacred high valleys",
      "Two nights of structural quietude in monastic guest lodges",
    ],
    priceFrom: 2800,
    priceNote: null,
    coverImage: COVER_IMAGES.spiritual[0],
    featured: true,
    published: true,
    itinerary: [
      { dayNumber: 1, title: "Grounding and orientation ceremonies in Paro", description: "" },
      { dayNumber: 2, title: "Mindfulness retreats in quiet Phobjikha wetlands", description: "" },
      { dayNumber: 3, title: "Traditional hot stone herbal baths and ritual meditation", description: "" },
      { dayNumber: 4, title: "Sacred mountain hike", description: "" },
      { dayNumber: 5, title: "Departure", description: "" },
    ],
  },
  {
    title: "Bespoke Ultra-Luxury Bhutan Experience",
    category: "luxury",
    summary:
      "Indulge in properties like Amankora and Six Senses, matched with private helicopter charters over unclimbed peaks.",
    overview:
      "The pinnacle of Himalayan hospitality. Experience 5-star mountain lodges and tailor-made fine-dining events underneath ancient ruins.",
    durationDays: 8,
    durationNights: 7,
    locations: "Paro, Punakha, Bumthang",
    highlights: [
      "Stays at award-winning Amankora / Six Senses luxury collection villas",
      "Scenic private helicopter transfer to remote Bumthang Valley",
      "Exclusive fine dining culinary experiences under a canopy of stars",
    ],
    priceFrom: null,
    priceNote: "Custom Tailored — Luxury pricing tier applies upon personalized inquiry",
    coverImage: COVER_IMAGES.luxury[0],
    featured: true,
    published: true,
    itinerary: [
      { dayNumber: 1, title: "Luxury acclimation and heritage touring in Paro", description: "" },
      { dayNumber: 2, title: "Subtropical luxury valleys of Punakha via helicopter", description: "" },
      { dayNumber: 3, title: "Mystical spiritual explorations of Bumthang kingdoms", description: "" },
      { dayNumber: 4, title: "Majestic Tiger's Nest luxury fast track VIP treatment", description: "" },
      { dayNumber: 5, title: "Departure", description: "" },
    ],
  },
  {
    title: "Eastern Himalayan Birding Tour",
    category: "specialty",
    summary:
      "Spot exotic endemic species like the legendary Rufous-necked Hornbill and White-bellied Heron with professional spotting scopes.",
    overview:
      "Bhutan houses over 700 species of birds. This tour explores pristine altitudinal biological corridors guided by master ornithologists.",
    durationDays: 11,
    durationNights: 10,
    locations: "Paro, Thimphu, Punakha, Phobjikha, Trongsa",
    highlights: [
      "Expert birding guides with pristine audio and visual recording datasets",
      "Spotting endangered Black-necked Cranes and elusive Satyr Tragopans",
      "Accessing pristine deep forests of subtropical and subalpine zones",
    ],
    priceFrom: null,
    priceNote: "Inquire for Custom Group Rates",
    coverImage: COVER_IMAGES.specialty[0],
    featured: true,
    published: true,
    itinerary: [
      { dayNumber: 1, title: "Paro & Thimphu alpine bird watching", description: "" },
      { dayNumber: 2, title: "Punakha valley river ecosystems tracking", description: "" },
      { dayNumber: 3, title: "Deep exploration of bird rich bio-zones in Phobjikha & Trongsa", description: "" },
      { dayNumber: 4, title: "Return and wrap up", description: "" },
    ],
  },
  {
    title: "Honeymoon & Traditional Wedding Package",
    category: "specialty",
    summary:
      "Exchange sacred marital vows inside a historic monastery dressed in silk, hand-woven royal Ghos and Kiras.",
    overview:
      "Begin your life journey together grounded by Buddhist wedding rituals for a harmonious future, mixed with absolute luxury leisure.",
    durationDays: 7,
    durationNights: 6,
    locations: "Paro, Thimphu",
    highlights: [
      "Authentic wedding ceremony inside an ancient temple with butter lamp lighting rituals",
      "Professional traditional attire fitting and photographic sessions included",
      "Champagne toasts at high-altitude mountain lookouts",
    ],
    priceFrom: null,
    priceNote: "Custom Quotes via consultation",
    coverImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=70&w=800",
    featured: true,
    published: true,
    itinerary: [
      { dayNumber: 1, title: "Private consultation, fitting and spa treatment preparation", description: "" },
      { dayNumber: 2, title: "Sacred Monastic Wedding Ritual & Blessing ceremony", description: "" },
      { dayNumber: 3, title: "Honeymoon leisure itinerary across scenic luxury mountain chalets", description: "" },
      { dayNumber: 4, title: "Farewell", description: "" },
    ],
  },
];

async function buildPackagesFromDocx(): Promise<SeedPackage[]> {
  const dir = path.resolve(process.cwd(), "..", "Data", "Tours Pakages");
  if (!fs.existsSync(dir)) {
    console.warn(`Docx source folder not found at ${dir} — skipping docx import.`);
    return [];
  }

  const files = fs.readdirSync(dir).filter((f) => f.toLowerCase().endsWith(".docx"));
  const packages: SeedPackage[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(dir, file);
    const lines = await extractDocxText(filePath);
    if (lines.length === 0) continue;

    const parsed = parseTourLines(lines);
    const { days, nights } = parseDuration(file);
    const category = inferCategory(file);

    packages.push({
      slug: slugify(parsed.title),
      title: parsed.title,
      category,
      summary: parsed.summary || parsed.title,
      overview: parsed.overview || parsed.title,
      durationDays: days,
      durationNights: nights,
      locations: parsed.locations,
      highlights: [],
      priceFrom: null,
      priceNote: "Contact us for a custom quote",
      coverImage: coverFor(category, i),
      featured: /druk path/i.test(parsed.title),
      published: true,
      itinerary: parsed.itinerary,
    });
  }

  return packages;
}

const DUMMY_ENQUIRIES = [
  {
    type: "GENERAL" as const,
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 98765 43210",
    season: "Autumn (Sep - Nov)",
    interest: "Cultural & Festival Tours",
    message: "Planning a 7-day trip for 2 people in October to catch a tshechu festival. Could you send a custom quote?",
    status: "NEW" as const,
  },
  {
    type: "BOOKING" as const,
    packageSlug: "himalayan-meditation-yoga-retreat",
    name: "Marcus Chen",
    email: "marcus.chen@example.com",
    phone: "+1 415 555 0134",
    travelers: 2,
    message: "We'd like to reserve the meditation retreat for our anniversary next spring.",
    status: "CONTACTED" as const,
  },
  {
    type: "GENERAL" as const,
    name: "Sofia Alvarez",
    email: "sofia.alvarez@example.com",
    season: "Spring (Mar - May)",
    interest: "High-Altitude Mountain Trekking",
    message: "Looking for a moderate difficulty trek in April, group of 4, mostly beginners. What do you recommend?",
    status: "NEW" as const,
  },
  {
    type: "BOOKING" as const,
    packageSlug: "bespoke-ultra-luxury-bhutan-experience",
    name: "James & Charlotte Whitfield",
    email: "whitfield.family@example.com",
    phone: "+44 20 7946 0958",
    travelers: 2,
    message: "Interested in the ultra-luxury package with a helicopter transfer for our 20th anniversary.",
    status: "CONFIRMED" as const,
  },
  {
    type: "GENERAL" as const,
    name: "Kenji Watanabe",
    email: "kenji.w@example.com",
    interest: "Specialty Birding & Rafting",
    message: "Are group discounts available for a 6-person birding club trip?",
    status: "CLOSED" as const,
  },
];

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not configured.");
  const adapter = new PrismaPg({ connectionString: url });
  const prisma = new PrismaClient({ adapter });

  console.log("Clearing existing data...");
  await prisma.enquiry.deleteMany();
  await prisma.itineraryDay.deleteMany();
  await prisma.tourPackage.deleteMany();
  await prisma.category.deleteMany();
  await prisma.destination.deleteMany();
  await prisma.testimonial.deleteMany();

  console.log("Seeding categories...");
  const categoryIdBySlug = new Map<string, string>();
  for (const cat of CATEGORIES) {
    const created = await prisma.category.create({ data: cat });
    categoryIdBySlug.set(cat.slug, created.id);
  }

  console.log("Seeding destinations...");
  for (const dest of DESTINATIONS) {
    await prisma.destination.create({ data: dest });
  }

  console.log("Seeding testimonials...");
  for (const t of TESTIMONIALS) {
    await prisma.testimonial.create({ data: t });
  }

  const docxPackages = await buildPackagesFromDocx();
  const featuredPackages: SeedPackage[] = FEATURED_PACKAGES.map((p) => ({
    ...p,
    slug: slugify(p.title),
  }));

  const all = [...featuredPackages, ...docxPackages];

  console.log(`Seeding ${all.length} tour packages (${featuredPackages.length} featured, ${docxPackages.length} from docx)...`);

  const packageIdBySlug = new Map<string, string>();

  for (const pkg of all) {
    const categoryId = categoryIdBySlug.get(pkg.category);
    if (!categoryId) throw new Error(`Unknown category slug: ${pkg.category}`);

    const created = await prisma.tourPackage.create({
      data: {
        slug: pkg.slug,
        title: pkg.title,
        categoryId,
        summary: pkg.summary,
        overview: pkg.overview,
        durationDays: pkg.durationDays,
        durationNights: pkg.durationNights,
        locations: pkg.locations,
        highlights: serializeHighlights(pkg.highlights),
        priceFrom: pkg.priceFrom,
        priceNote: pkg.priceNote,
        coverImage: pkg.coverImage,
        featured: pkg.featured,
        published: pkg.published,
        itinerary: {
          create: pkg.itinerary.map((d) => ({
            dayNumber: d.dayNumber,
            title: d.title || `Day ${d.dayNumber}`,
            description: d.description || "",
          })),
        },
      },
    });
    packageIdBySlug.set(pkg.slug, created.id);
  }

  console.log("Seeding dummy enquiries...");
  for (const enquiry of DUMMY_ENQUIRIES) {
    const { packageSlug, ...rest } = enquiry as typeof enquiry & { packageSlug?: string };
    await prisma.enquiry.create({
      data: {
        ...rest,
        packageId: packageSlug ? packageIdBySlug.get(packageSlug) ?? null : null,
      },
    });
  }

  console.log("Seed complete.");
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
