"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/#why-choose-us", label: "About Us" },
  { href: "/tours", label: "Tours" },
  { href: "/#destinations", label: "Destinations" },
  { href: "/#travel-guide", label: "Travel Guide" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <Image
              src="/brand/yeti-logo.png"
              alt="Yeti Tours & Trek Bhutan"
              width={1536}
              height={1024}
              priority
              className="h-14 w-auto"
            />
          </Link>

          <div className="hidden lg:flex items-center space-x-6 text-sm font-medium tracking-wide">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-gold transition duration-300">
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:block">
            <Link
              href="/#contact"
              className="inline-flex items-center bg-gold hover:bg-gold-dark text-ink font-bold py-2.5 px-6 rounded-md text-sm transition-all shadow-md transform hover:-translate-y-0.5"
            >
              Plan Your Journey
            </Link>
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setOpen((o) => !o)}
              className="text-ink hover:text-gold focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-2 pb-6 space-y-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-3 py-2 rounded-md hover:bg-slate-100 text-base font-medium text-ink"
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-4">
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="block text-center bg-gold text-ink font-bold py-3 rounded-md"
            >
              Plan Your Journey
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
