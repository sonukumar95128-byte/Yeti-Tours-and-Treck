import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-ink text-slate-400 text-xs py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
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
          <span className="block text-[9px] text-slate-400 max-w-[10rem]">
            © {new Date().getFullYear()} Kingdom of Bhutan. All Rights Reserved.
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-xs font-medium">
          <Link href="/#travel-guide" className="hover:text-gold transition">
            SDF Regulations
          </Link>
          <Link href="/#contact" className="hover:text-gold transition">
            Terms &amp; Conditions
          </Link>
          <Link href="/admin/login" className="hover:text-gold transition">
            Admin
          </Link>
        </div>

        <div className="flex space-x-4 text-base text-slate-300">
          <a href="#" className="hover:text-gold" aria-label="Instagram">
            IG
          </a>
          <a href="#" className="hover:text-gold" aria-label="Facebook">
            FB
          </a>
        </div>
      </div>
    </footer>
  );
}
