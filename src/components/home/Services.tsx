"use client";

import SectionDivider from "@/components/site/SectionDivider";
import InfiniteMarquee from "@/components/site/InfiniteMarquee";

const services = [
  {
    icon: "🛂",
    title: "Visa, permit and SDF",
    text: "We prepare your Immigration file. The US$40 visa fee and the Sustainable Development Fee are included in your package price.",
  },
  {
    icon: "🏨",
    title: "Certified stays",
    text: "Nights are booked in Department of Tourism–certified hotels or registered village homestays — not unlicensed private rentals.",
  },
  {
    icon: "🛬",
    title: "Airport & Ground Transfers",
    text: "VIP airport welcoming gates and fully chauffeured safe premium transit logistics across all sectors.",
  },
  {
    icon: "🥾",
    title: "Trekking Support & Insurance",
    text: "Full technical field crews, certified culinary camp chefs, mountain medical tools, and evacuation links.",
  },
];

export default function Services() {
  const cards = services.map((s) => (
    <article
      key={s.title}
      className="w-[260px] sm:w-[280px] shrink-0 border border-white/10 p-6 rounded-xl bg-white/5 text-left"
    >
      <span className="text-gold text-2xl mb-4 block">{s.icon}</span>
      <h4 className="text-lg font-bold mb-2">{s.title}</h4>
      <p className="text-gray-300 text-xs leading-relaxed">{s.text}</p>
    </article>
  ));

  return (
    <section
      id="services"
      className="py-24 bg-ink text-white relative overflow-hidden [--marquee-fade:#0f2d52]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold font-bold text-xs uppercase tracking-widest block mb-2">
            Seamless Travel Logistics
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Our End-to-End Premium Concierge Services
          </h2>
          <SectionDivider tone="dark" />
        </div>
      </div>

      <InfiniteMarquee duration={38}>{cards}</InfiniteMarquee>
    </section>
  );
}
