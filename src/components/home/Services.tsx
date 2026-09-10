"use client";

import { useEffect, useRef, useState } from "react";
import SectionDivider from "@/components/site/SectionDivider";

const services = [
  {
    icon: "🛂",
    title: "Visa, permit and SDF",
    text: "We prepare your Immigration file, coordinate the US$40 visa fee where it applies, and itemise the Sustainable Development Fee on your quote.",
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
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-24 bg-ink text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="text-gold font-bold text-xs uppercase tracking-widest block mb-2">
            Seamless Travel Logistics
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Our End-to-End Premium Concierge Services
          </h2>
          <SectionDivider tone="dark" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s, i) => (
            <div
              key={s.title}
              style={{ transitionDelay: visible ? `${180 + i * 140}ms` : "0ms" }}
              className={`border border-white/10 p-6 rounded-xl bg-white/5 transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-x-0 motion-reduce:translate-y-0 ${
                visible
                  ? "opacity-100 translate-y-0 translate-x-0"
                  : "opacity-0 translate-y-8 -translate-x-6"
              }`}
            >
              <span className="text-gold text-2xl mb-4 block">{s.icon}</span>
              <h4 className="text-lg font-bold mb-2">{s.title}</h4>
              <p className="text-gray-300 text-xs leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
