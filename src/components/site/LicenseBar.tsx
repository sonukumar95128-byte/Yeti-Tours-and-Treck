import Link from "next/link";
import { COMPANY } from "@/lib/bhutan";

export default function LicenseBar() {
  return (
    <div className="bg-ink text-white/80 text-[11px] sm:text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
        <p>
          {COMPANY.legalName} · Licensed tour operator · Licence No.{" "}
          <span className="text-gold font-semibold tracking-wide">{COMPANY.licenseNo}</span>
          <span className="hidden sm:inline">
            {" "}
            · Valid until {COMPANY.licenseValidUntil} · {COMPANY.location}
          </span>
        </p>
        <p className="flex flex-wrap gap-x-3 gap-y-1">
          <Link href="/travel-info" className="text-gold hover:underline">
            Visa, SDF &amp; entry rules
          </Link>
          <a
            href={COMPANY.directoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold"
          >
            Tourism Services Portal
          </a>
        </p>
      </div>
    </div>
  );
}
