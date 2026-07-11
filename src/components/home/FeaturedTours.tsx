"use client";

import { useState } from "react";
import Link from "next/link";
import type { CategoryOption } from "@/lib/tour-constants";
import SectionDivider from "@/components/site/SectionDivider";

export interface TourCardData {
  slug: string;
  title: string;
  categoryId: string;
  categoryLabel: string;
  summary: string;
  durationDays: number;
  durationNights: number;
  locations: string;
  coverImage: string;
  priceLabel: string;
}

const ALL = "ALL";

export default function FeaturedTours({
  packages,
  categories,
}: {
  packages: TourCardData[];
  categories: CategoryOption[];
}) {
  const availableCategories = categories.filter((c) =>
    packages.some((p) => p.categoryId === c.id)
  );
  const [active, setActive] = useState<string>(ALL);

  if (packages.length === 0) return null;

  const shown = active === ALL ? packages.slice(0, 3) : packages.filter((p) => p.categoryId === active);

  return (
    <section id="tours" className="py-24 bg-mist">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-4">
            Handcrafted Experience Packages
          </h2>
          <SectionDivider />
          <p className="text-gray-600">
            Select a category below to preview signature itineraries curated by our local travel
            designers.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => setActive(ALL)}
            className={`px-5 py-2.5 rounded-md font-medium text-sm transition shadow-sm ${
              active === ALL ? "bg-ink text-gold" : "bg-white text-slate-700 hover:bg-slate-200"
            }`}
          >
            All Tours
          </button>
          {availableCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`px-5 py-2.5 rounded-md font-medium text-sm transition shadow-sm ${
                active === cat.id ? "bg-ink text-gold" : "bg-white text-slate-700 hover:bg-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {shown.map((tour) => (
            <div
              key={tour.slug}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 flex flex-col h-full"
            >
              <div className="relative h-56 bg-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tour.coverImage}
                  className="w-full h-full object-cover"
                  alt={tour.title}
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-ink mb-2">{tour.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{tour.summary}</p>
                  <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-slate-500 mb-6">
                    <span>
                      🕐 {tour.durationNights}N {tour.durationDays}D
                    </span>
                    <span>📍 {tour.locations}</span>
                  </div>
                </div>
                <Link
                  href={`/tours/${tour.slug}`}
                  className="w-full bg-ink hover:bg-forest text-white text-sm font-bold py-3 px-4 rounded-xl transition text-center"
                >
                  View Full Package
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/tours"
            className="inline-flex items-center border-2 border-ink text-ink hover:bg-ink hover:text-white font-bold px-8 py-3 rounded-md text-sm transition-all"
          >
            View All Tours &amp; Treks
          </Link>
        </div>
      </div>
    </section>
  );
}
