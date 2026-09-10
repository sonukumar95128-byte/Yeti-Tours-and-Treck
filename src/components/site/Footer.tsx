import Link from "next/link";
import Image from "next/image";
import { COMPANY } from "@/lib/bhutan";

export default function Footer() {
  return (
    <footer className="bg-ink text-slate-400 text-xs py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex items-center space-x-3">
            <div className="bg-white rounded-md px-2 py-1.5">
              <Image
                src="/brand/yeti-logo.png"
                alt="Yeti Tours & Trek Bhutan"
                width={1536}
                height={1024}
                className="h-10 w-auto"
              />
            </div>
            <div className="max-w-xs">
              <p className="text-white font-semibold text-sm">{COMPANY.legalName}</p>
              <p className="text-[11px] mt-1 leading-relaxed">
                Licence No. {COMPANY.licenseNo} · Valid until {COMPANY.licenseValidUntil}
                <br />
                {COMPANY.activity}
                <br />
                {COMPANY.village}, {COMPANY.gewog}, {COMPANY.dzongkhag}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium">
            <Link href="/travel-info" className="hover:text-gold transition">
              Visa &amp; SDF
            </Link>
            <Link href="/terms" className="hover:text-gold transition">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-gold transition">
              Privacy
            </Link>
            <a
              href={COMPANY.directoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition"
            >
              Verify operator
            </a>
            <a href={`mailto:${COMPANY.email}`} className="hover:text-gold transition">
              {COMPANY.email}
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-white/10 pt-6">
          <p>
            © {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved. A licensed
            Bhutanese tour operator — not a government website.
          </p>
          <p className="text-slate-500">Issued by {COMPANY.issuingAuthority}</p>
        </div>
      </div>
    </footer>
  );
}
