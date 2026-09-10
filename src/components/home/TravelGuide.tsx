"use client";

import Link from "next/link";
import { useState } from "react";
import SectionDivider from "@/components/site/SectionDivider";

const faqs = [
  {
    q: "What is the Sustainable Development Fee (SDF)?",
    a: [
      "SDF is a government levy paid by visitors to Bhutan. It funds conservation, culture and public services. It is not a hotel charge.",
      "International adults currently pay US$100 per night. Children aged 6–11 pay US$50. Children under 6 pay no SDF. This US$100 figure is a published concession on the statutory US$200 rate, advertised through 31 August 2027.",
      "Indian nationals pay Nu. 1,200 per adult per night (Nu. 600 for children 6–11). Your written quote from Yeti Tours & Trek lists SDF separately from hotels, guide and transport.",
    ],
  },
  {
    q: "How do visa and entry permits work?",
    a: [
      "Most nationalities need a visa before arrival. The visa fee is US$40 per person, one-time and usually non-refundable. Indian guests use an entry permit instead of that visa fee; SDF still applies.",
      "You can apply yourself at immi.gov.bt, or we submit the file after we have your passport scan and confirmed dates. Passports should be valid at least six months from entry.",
    ],
  },
  {
    q: "Do I have to book a licensed operator?",
    a: [
      "Yeti Tours & Trek holds Licence No. 50002238 for Tour Operator Activities (Tourism Services), issued by the Department of Industry, Ministry of Industry, Commerce and Employment, valid until 31 August 2027. Office: Taba, Thimphu Thromde.",
      "International visitors travel with a licensed Bhutanese guide. Treks need a trek permit and licensed trek guide. Overnight stays are in Department of Tourism–certified hotels or registered homestays.",
    ],
  },
  {
    q: "When is the best time to visit Bhutan?",
    a: [
      "Spring (March–May): clear days and rhododendron bloom; Paro and other tshechus fall in this window.",
      "Autumn (September–November): the most stable mountain views and major monastery festivals.",
      "Winter is quieter and good for low-valley culture. Summer monsoon can delay Paro flights — we build buffer days when needed.",
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
            Planning a journey to Bhutan
          </h2>
          <SectionDivider />
          <p className="text-gray-600">
            Visa, Sustainable Development Fee, licensed guides and certified stays — the rules
            guests actually travel under. Full detail on our{" "}
            <Link href="/travel-info" className="text-forest font-semibold underline">
              visa and SDF page
            </Link>
            .
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
                  type="button"
                  onClick={() => setOpen(isOpen ? 0 : idx)}
                  aria-expanded={isOpen}
                  className="w-full p-5 text-left font-bold text-ink flex justify-between items-center bg-slate-50/50"
                >
                  <span>{faq.q}</span>
                  <span className={isOpen ? "text-gold" : ""}>{isOpen ? "▲" : "▼"}</span>
                </button>
                {isOpen && (
                  <div className="p-5 text-sm text-gray-600 border-t border-slate-100 space-y-2 leading-relaxed">
                    {faq.a.map((p) => (
                      <p key={p.slice(0, 32)}>{p}</p>
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
