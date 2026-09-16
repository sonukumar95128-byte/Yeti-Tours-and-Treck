/** Official trade-licence and published DoT / bhutan.travel rates. */

export const COMPANY = {
  name: "Yeti Tours & Trek",
  legalName: "Yeti Tours & Trek",
  activity: "Tour Operator Activities (Tourism Services)",
  licenseNo: "50002238",
  licenseIssued: "31 August 2026",
  licenseValidUntil: "31 August 2027",
  issuingAuthority: "Department of Industry, Ministry of Industry, Commerce and Employment",
  dzongkhag: "Thimphu",
  gewog: "Thimphu Thromde",
  village: "Taba",
  location: "Taba, Thimphu Thromde",
  city: "Thimphu",
  postcode: "11001",
  country: "Bhutan",
  proprietor: "Nidup Tshering",
  phone: "+975 77 333 367",
  phoneTel: "+97577333367",
  email: "yetitoursandtrek@gmail.com",
  whatsapp: "https://wa.me/97577333367",
  directoryUrl: "https://services.bhutan.travel/search/tour-operator",
  visaApplyUrl: "https://immi.gov.bt/services/",
  officialTravelUrl: "https://bhutan.travel/visa",
  officialSdfFaqUrl: "https://bhutan.travel/faqs",
  dotEmail: "hosts@tourism.gov.bt",
  dotPhone: "+975 17 661 974",
  dotPhoneTel: "+97517661974",
} as const;

export const CANCELLATION = [
  { when: "30 days or more before arrival", touring: "20% of the touring cost (typical deposit)" },
  { when: "15–29 days before arrival", touring: "50% of the touring cost" },
  { when: "8–14 days before arrival", touring: "75% of the touring cost" },
  { when: "7 days or fewer, or no-show", touring: "100% of the touring cost" },
] as const;

export const SDF = {
  internationalAdultUsd: 100,
  internationalChildUsd: 50,
  childAgeFrom: 6,
  childAgeToExclusive: 12,
  under6Usd: 0,
  statutoryAdultUsd: 200,
  concessionUntil: "31 August 2027",
  indianAdultBtn: 1200,
  indianChildBtn: 600,
  visaFeeUsd: 40,
} as const;

export const TYPICAL_INCLUSIONS = [
  "Licensed Bhutanese cultural guide (trek guide on trek days)",
  "Private vehicle and driver for the published itinerary",
  "DoT-certified hotels or registered village homestays (twin share unless stated)",
  "Daily meals as specified in your confirmed itinerary",
  "Monument and festival tickets listed in the itinerary",
  "Bottled water in the vehicle and airport arrival assistance",
  "Sustainable Development Fee (SDF) for every night in Bhutan",
  "Bhutan visa fee (US$40) or entry-permit processing",
];

export const TYPICAL_EXCLUSIONS = [
  "International and Paro flights",
  "Travel insurance (required for treks)",
  "Drinks, laundry, tips, and personal expenses",
  "Optional activities and hotel upgrades",
];

export function sdfAdultLine(): string {
  return `US$${SDF.internationalAdultUsd} per adult per night`;
}

export function sdfChildLine(): string {
  return `US$${SDF.internationalChildUsd} per night for children aged ${SDF.childAgeFrom}–${SDF.childAgeToExclusive - 1}; free under ${SDF.childAgeFrom}`;
}

export function indianSdfLine(): string {
  return `Indian nationals: Nu. ${SDF.indianAdultBtn.toLocaleString("en-IN")} per adult per night (Nu. ${SDF.indianChildBtn.toLocaleString("en-IN")} for children 6–11)`;
}
