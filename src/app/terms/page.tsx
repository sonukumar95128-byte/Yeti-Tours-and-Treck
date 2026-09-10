import type { Metadata } from "next";
import Link from "next/link";
import SectionDivider from "@/components/site/SectionDivider";
import { COMPANY } from "@/lib/bhutan";

export const metadata: Metadata = {
  title: "Terms of Booking | Yeti Tours & Trek",
  description: "Booking, payment, cancellation and responsibility terms for Yeti Tours & Trek, Bhutan.",
};

export default function TermsPage() {
  return (
    <section className="py-16 sm:py-20 bg-mist min-h-[70vh]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-gray-700 leading-relaxed">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-4">Terms of booking</h1>
        <SectionDivider />
        <p className="mb-8">
          These terms apply to tours arranged by {COMPANY.legalName}, Licence No. {COMPANY.licenseNo},{" "}
          {COMPANY.location}, Bhutan. They sit alongside the Tourism Rules and Regulations of Bhutan
          2024.
        </p>

        <div className="space-y-6 bg-white border border-slate-200 rounded-2xl p-6">
          <section>
            <h2 className="font-bold text-ink mb-2">1. Quotations and confirmation</h2>
            <p>
              A website package is an invitation to enquire, not a confirmed contract. A booking is
              confirmed only when we issue a written itinerary and you pay the deposit stated on that
              quotation. Prices may change until confirmation if hotel or festival allocations change.
            </p>
          </section>
          <section>
            <h2 className="font-bold text-ink mb-2">2. Government fees</h2>
            <p>
              The Sustainable Development Fee and visa or permit fee are government charges. We
              collect or coordinate them as part of your file. They follow rates published by the
              Department of Tourism and Immigration at the time of visa submission. See{" "}
              <Link href="/travel-info" className="text-forest underline">
                visa and SDF
              </Link>
              .
            </p>
          </section>
          <section>
            <h2 className="font-bold text-ink mb-2">3. Payments</h2>
            <p>
              Tour payments are made to {COMPANY.legalName} through the bank details on your invoice.
              Do not transfer funds to personal accounts or third parties who are not named on our
              invoice.
            </p>
          </section>
          <section>
            <h2 className="font-bold text-ink mb-2">4. Cancellation and refunds</h2>
            <p>
              If we cancel a confirmed service for reasons within our control, you are entitled to a
              full refund of amounts paid to us for that service, consistent with the Tourism Rules
              and Regulations of Bhutan 2024. Guest cancellations follow the schedule on your
              quotation (hotel and festival tickets are often non-refundable once issued). Visa fees
              are generally non-refundable once paid to Immigration. SDF already submitted follows
              Immigration’s reuse or refund practice at that time.
            </p>
          </section>
          <section>
            <h2 className="font-bold text-ink mb-2">5. Travel documents and conduct</h2>
            <p>
              You must hold a passport valid for at least six months and comply with Bhutanese law,
              including respect for dzongs, festivals and restricted areas. We may refuse service
              where documents are incomplete or conduct endangers the group.
            </p>
          </section>
          <section>
            <h2 className="font-bold text-ink mb-2">6. Trekking</h2>
            <p>
              Treks require a permit, licensed trek guide and appropriate insurance. Routes may
              change for weather, trail closure or safety. High-altitude travel carries inherent
              risk; we are not liable for events outside reasonable control.
            </p>
          </section>
          <section>
            <h2 className="font-bold text-ink mb-2">7. Contact</h2>
            <p>
              {COMPANY.legalName} · {COMPANY.location} · {COMPANY.email} · {COMPANY.phone}
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
