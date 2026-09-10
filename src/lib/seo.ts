import { COMPANY } from "@/lib/bhutan";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://yeti-tours-and-treck.vercel.app";

export const DEFAULT_OG_IMAGE =
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200";

export const SEO = {
  siteName: COMPANY.legalName,
  title: `${COMPANY.legalName} | Licensed Bhutan Tour Operator`,
  description:
    "Licensed Bhutanese tour operator (Licence No. 50002238) in Taba, Thimphu. Culture tours, Himalayan treks and tailor-made journeys. We arrange visa, SDF and certified hotels.",
  keywords: [
    "Bhutan tour operator",
    "Yeti Tours and Trek",
    "Bhutan trekking",
    "Thimphu tour agency",
    "Bhutan visa SDF",
    "licensed Bhutan operator",
    "Paro cultural tour",
    "Tiger Nest trek",
  ],
  locale: "en_BT",
};

export function absUrl(path = "/"): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function travelAgencyJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: COMPANY.legalName,
    legalName: COMPANY.legalName,
    url: SITE_URL,
    image: absUrl("/brand/yeti-logo.png"),
    logo: absUrl("/brand/yeti-logo.png"),
    email: COMPANY.email,
    telephone: COMPANY.phone,
    priceRange: "$$",
    foundingLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: COMPANY.village,
        addressLocality: COMPANY.city,
        addressRegion: COMPANY.dzongkhag,
        postalCode: COMPANY.postcode,
        addressCountry: "BT",
      },
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: `${COMPANY.village}, ${COMPANY.gewog}`,
      addressLocality: COMPANY.city,
      addressRegion: COMPANY.dzongkhag,
      postalCode: COMPANY.postcode,
      addressCountry: "BT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 27.5142,
      longitude: 89.6464,
    },
    areaServed: {
      "@type": "Country",
      name: "Bhutan",
    },
    identifier: COMPANY.licenseNo,
    description: SEO.description,
    sameAs: [COMPANY.whatsapp, COMPANY.directoryUrl],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: COMPANY.phone,
      email: COMPANY.email,
      contactType: "customer service",
      areaServed: "BT",
      availableLanguage: ["en", "dz"],
    },
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the Sustainable Development Fee (SDF) for Bhutan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "International adults currently pay US$100 per night. Children aged 6–11 pay US$50. Children under 6 pay no SDF. Indian nationals pay Nu. 1,200 per adult per night.",
        },
      },
      {
        "@type": "Question",
        name: "How much is the Bhutan visa fee?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most nationalities pay a US$40 visa fee, one-time and usually non-refundable. Indian guests use an entry permit instead of that visa fee; SDF still applies.",
        },
      },
      {
        "@type": "Question",
        name: "Is Yeti Tours & Trek a licensed Bhutan tour operator?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Yeti Tours & Trek holds Licence No. 50002238 for Tour Operator Activities (Tourism Services), office in Taba, Thimphu Thromde, valid until 31 August 2027.",
        },
      },
    ],
  };
}
