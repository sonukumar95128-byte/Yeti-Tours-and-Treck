"use client";

import SectionDivider from "@/components/site/SectionDivider";
import InfiniteMarquee from "@/components/site/InfiniteMarquee";

const items = [
  {
    icon: "🪪",
    title: "Licensed in Bhutan",
    text: "Licence No. 50002238 in Taba, Thimphu — visa, SDF and certified stays.",
  },
  {
    icon: "🎛",
    title: "Personalized Itineraries",
    text: "Private routes crafted around your pace and interests.",
  },
  {
    icon: "🧑‍💼",
    title: "Professional Guides",
    text: "Licensed guides fluent in history, culture and ecology.",
  },
  {
    icon: "🚐",
    title: "Comfortable Transport",
    text: "Maintained 4WD SUVs and coaches on mountain roads.",
  },
  {
    icon: "🎧",
    title: "24/7 Support",
    text: "Operations desk from first enquiry to your flight home.",
  },
  {
    icon: "🕉",
    title: "Authentic Experiences",
    text: "Farmhouse meals, monastery visits and festival days.",
  },
];

export default function WhyChooseUs() {
  const cards = items.map((item) => (
    <article
      key={item.title}
      className="w-[240px] sm:w-[260px] shrink-0 bg-white border border-slate-100 rounded-sm shadow-sm px-8 py-10 text-center"
    >
      <div className="w-12 h-12 mx-auto mb-5 rounded-xl bg-ink text-gold flex items-center justify-center text-xl">
        {item.icon}
      </div>
      <h3 className="text-base font-semibold text-ink mb-2">{item.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{item.text}</p>
    </article>
  ));

  return (
    <section id="why-choose-us" className="py-24 bg-mist relative overflow-hidden [--marquee-fade:#f5f7fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-4">
            Why Choose Yeti Tours &amp; Trek
          </h2>
          <SectionDivider />
          <p className="text-gray-600">
            We don&apos;t just organize trips; we weave transformational experiences that honor
            Bhutan&apos;s strict commitment to high-value, low-impact sustainable tourism.
          </p>
        </div>
      </div>

      <InfiniteMarquee duration={46}>{cards}</InfiniteMarquee>
    </section>
  );
}
