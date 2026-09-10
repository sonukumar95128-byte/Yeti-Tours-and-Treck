import type { Metadata } from "next";
import SectionDivider from "@/components/site/SectionDivider";
import { COMPANY } from "@/lib/bhutan";

export const metadata: Metadata = {
  title: "Privacy | Yeti Tours & Trek",
  description: "How Yeti Tours & Trek handles enquiry and booking personal data.",
};

export default function PrivacyPage() {
  return (
    <section className="py-16 sm:py-20 bg-mist min-h-[70vh]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-gray-700 leading-relaxed">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-4">Privacy</h1>
        <SectionDivider />
        <div className="space-y-4 bg-white border border-slate-200 rounded-2xl p-6">
          <p>
            {COMPANY.legalName} collects the name, email, phone, nationality, travel dates and
            message you submit on this website so we can quote and operate your Bhutan journey.
          </p>
          <p>
            Passport biodata and photos are used only to process visas or permits with the
            Department of Immigration and related hotels or airlines. We do not sell guest lists.
          </p>
          <p>
            Enquiry records are stored on our booking system. You may ask us to correct or delete a
            lead that has not become a confirmed tour by writing to {COMPANY.email}.
          </p>
          <p>
            This site uses only cookies required to run the pages and the admin login. We do not run
            advertising trackers.
          </p>
        </div>
      </div>
    </section>
  );
}
