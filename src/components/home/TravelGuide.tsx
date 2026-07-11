"use client";

import { useState } from "react";
import SectionDivider from "@/components/site/SectionDivider";

const faqs = [
  {
    q: "1. What is the Sustainable Development Fee (SDF)?",
    a: [
      "Bhutan enforces a mandatory Sustainable Development Fee (SDF) for all incoming international travelers to invest heavily into state environmental protection, community health, cultural preservation, and zero-carbon infrastructure upkeep.",
      "Our standard quotes comprehensively bundle this required fee for your ultimate convenience.",
    ],
  },
  {
    q: "2. When is the Best Time to Visit Bhutan?",
    a: [
      "Spring (March to May): Peak season. Warm crystal blue clear days completely framed with magnificent blooming rhododendrons and wild alpine flowers.",
      "Autumn (September to November): Peak clarity season. Pristine views of the massive unclimbed peaks combined with the largest historical monastery festivals.",
    ],
  },
  {
    q: "3. Visa & Flight Accessibility Policy",
    a: [
      "Only two domestic airlines operate into Paro International Airport (Drukair and Bhutan Airlines). Flight schedules rely heavily on clear alpine weather windows. We manage and lock down your preferred seat configurations and route connections via Bangkok, Delhi, Kathmandu, or Singapore seamlessly.",
    ],
  },
];

export default function TravelGuide() {
  const [open, setOpen] = useState(1);

  return (
    <section id="travel-guide" className="py-24 bg-mist">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-4">
            Official Bhutan Travel Guide
          </h2>
          <SectionDivider />
          <p className="text-gray-600">
            Essential regulatory knowledge and logistical insights required for smooth passage into
            the Kingdom.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const idx = i + 1;
            const isOpen = open === idx;
            return (
              <div
                key={faq.q}
                className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpen(isOpen ? 0 : idx)}
                  className="w-full p-5 text-left font-bold text-ink flex justify-between items-center bg-slate-50/50"
                >
                  <span>{faq.q}</span>
                  <span className={isOpen ? "text-gold" : ""}>{isOpen ? "▲" : "▼"}</span>
                </button>
                {isOpen && (
                  <div className="p-5 text-sm text-gray-600 border-t border-slate-100 space-y-2 leading-relaxed">
                    {faq.a.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
