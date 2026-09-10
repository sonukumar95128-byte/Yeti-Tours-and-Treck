import type { Metadata } from "next";
import Link from "next/link";
import SectionDivider from "@/components/site/SectionDivider";
import { COMPANY, SDF, indianSdfLine, sdfAdultLine, sdfChildLine } from "@/lib/bhutan";

export const metadata: Metadata = {
  title: "Visa, SDF & entry rules",
  description:
    "Current Bhutan Sustainable Development Fee, visa fee, regional permits, licensed guides and how Yeti Tours & Trek processes your trip.",
};

export default function TravelInfoPage() {
  return (
    <section className="py-16 sm:py-20 bg-mist min-h-[70vh]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-forest font-bold text-xs uppercase tracking-widest mb-2">
          For guests planning Bhutan
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-4">
          Visa, SDF and how travel in Bhutan works
        </h1>
        <SectionDivider />
        <p className="text-gray-600 text-sm leading-relaxed mb-10">
          {COMPANY.name} is a licensed Bhutanese inbound operator (Licence No.{" "}
          {COMPANY.licenseNo}), based in {COMPANY.city}. The figures below follow the
          Department of Tourism and{" "}
          <a
            href={COMPANY.officialTravelUrl}
            className="text-forest underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            bhutan.travel
          </a>
          . We are not a government office.
        </p>

        <dl className="bg-white border border-slate-200 rounded-2xl p-6 mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-wider text-slate-500 font-bold">Business name</dt>
            <dd className="font-semibold text-ink mt-1">{COMPANY.legalName}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-slate-500 font-bold">Licence No.</dt>
            <dd className="font-semibold text-ink mt-1">{COMPANY.licenseNo}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-slate-500 font-bold">Activity</dt>
            <dd className="font-semibold text-ink mt-1">{COMPANY.activity}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-slate-500 font-bold">Valid until</dt>
            <dd className="font-semibold text-ink mt-1">{COMPANY.licenseValidUntil}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-slate-500 font-bold">Issued by</dt>
            <dd className="font-semibold text-ink mt-1">{COMPANY.issuingAuthority}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-slate-500 font-bold">Office</dt>
            <dd className="font-semibold text-ink mt-1">
              {COMPANY.village}, {COMPANY.gewog}, {COMPANY.dzongkhag}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-slate-500 font-bold">Proprietor</dt>
            <dd className="font-semibold text-ink mt-1">{COMPANY.proprietor}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-slate-500 font-bold">Verify listing</dt>
            <dd className="font-semibold text-ink mt-1">
              <a
                href={COMPANY.directoryUrl}
                className="text-forest underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                services.bhutan.travel
              </a>
            </dd>
          </div>
        </dl>

        <div className="space-y-8 text-sm text-gray-700 leading-relaxed">
          <article className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="font-display text-xl font-bold text-ink mb-3">Sustainable Development Fee</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>International adults: {sdfAdultLine()}.</li>
              <li>{sdfChildLine()}.</li>
              <li>{indianSdfLine()}.</li>
              <li>
                The US${SDF.internationalAdultUsd} rate is a published concession on the statutory
                US${SDF.statutoryAdultUsd} levy, currently advertised through {SDF.concessionUntil}.
              </li>
              <li>
                SDF is a government levy. It is not a hotel tax and does not pay for your guide,
                vehicle or rooms. We include it in your written quote so you see the full trip cost.
              </li>
            </ul>
          </article>

          <article className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="font-display text-xl font-bold text-ink mb-3">Visa and entry permit</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Most nationalities need a visa before travel. The visa fee is US${SDF.visaFeeUsd}{" "}
                per person, one-time and non-refundable.
              </li>
              <li>
                Indian nationals use an entry permit (not the US$40 visa). SDF is still payable.
              </li>
              <li>
                Bangladesh and Maldives follow the regional process published by Immigration —
                we confirm the exact track when you enquire.
              </li>
              <li>
                You may apply yourself at{" "}
                <a
                  href={COMPANY.visaApplyUrl}
                  className="text-forest underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  immi.gov.bt
                </a>
                , or we apply on your behalf after the itinerary and passport scan are confirmed.
              </li>
              <li>Passport should be valid at least six months from the date of entry.</li>
            </ul>
          </article>

          <article className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="font-display text-xl font-bold text-ink mb-3">Guides, hotels and treks</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Since 2022 guests may book hotels, a guide and transport separately. Using a licensed
                operator keeps visa or permit, SDF and certified stays on one file.
              </li>
              <li>
                Overnight stays we book are in Department of Tourism–certified hotels or registered
                village homestays — not unlicensed private rentals.
              </li>
              <li>
                Treks still require an accredited operator or trek guide, a trek permit, camp crew
                where needed, and travel insurance that covers high-altitude evacuation.
              </li>
            </ul>
          </article>

          <article className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="font-display text-xl font-bold text-ink mb-3">What our quotes include</h2>
            <p className="mb-3">
              Published “from” prices on this website are the touring cost unless the package note
              says otherwise. Your confirmed quotation itemises:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>SDF for each paying night</li>
              <li>Visa or permit fee where it applies</li>
              <li>Guide, driver, vehicle, certified stays, meals and listed entrance fees</li>
              <li>Flights into Paro, quoted separately</li>
            </ul>
          </article>

          <p>
            Questions before you book?{" "}
            <Link href="/#contact" className="text-forest font-semibold underline">
              Write to us
            </Link>{" "}
            or WhatsApp{" "}
            <a href={COMPANY.whatsapp} className="text-forest font-semibold underline">
              {COMPANY.phone}
            </a>
            . Complaints we cannot resolve may also go to the Department of Tourism at{" "}
            <a href={`mailto:${COMPANY.dotEmail}`} className="text-forest underline">
              {COMPANY.dotEmail}
            </a>{" "}
            or {COMPANY.dotPhone}.
          </p>
        </div>
      </div>
    </section>
  );
}
