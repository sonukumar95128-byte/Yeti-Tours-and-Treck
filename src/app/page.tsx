import Hero from "@/components/home/Hero";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import FeaturedTours, { TourCardData } from "@/components/home/FeaturedTours";
import Destinations from "@/components/home/Destinations";
import Services from "@/components/home/Services";
import TravelGuide from "@/components/home/TravelGuide";
import Testimonials from "@/components/home/Testimonials";
import ContactSection from "@/components/home/ContactSection";
import {
  getFeaturedPackages,
  getCategories,
  getDestinations,
  getTestimonials,
  formatPrice,
} from "@/lib/tours";

export const dynamic = "force-dynamic";

export const metadata = {
  title: { absolute: "Yeti Tours & Trek | Licensed Bhutan Tour Operator" },
  description:
    "Plan a Bhutan journey with Yeti Tours & Trek — licensed operator No. 50002238 in Taba, Thimphu. Culture, festivals, treks, visa and SDF arranged in one file.",
  alternates: { canonical: "/" },
};

export default async function Home() {
  const [featured, categories, destinations, testimonials] = await Promise.all([
    getFeaturedPackages(),
    getCategories(),
    getDestinations(),
    getTestimonials(),
  ]);

  const packages: TourCardData[] = featured.map((p) => ({
    slug: p.slug,
    title: p.title,
    categoryId: p.categoryId,
    categoryLabel: p.category.label,
    summary: p.summary,
    durationDays: p.durationDays,
    durationNights: p.durationNights,
    locations: p.locations,
    coverImage: p.coverImage,
    priceLabel: formatPrice(p.priceFrom, p.priceNote),
  }));

  return (
    <>
      <Hero />
      <WhyChooseUs />
      <FeaturedTours packages={packages} categories={categories} />
      <Destinations destinations={destinations} />
      <Services />
      <TravelGuide />
      <Testimonials testimonials={testimonials} />
      <ContactSection />
    </>
  );
}
