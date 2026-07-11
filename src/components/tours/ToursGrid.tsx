"use client";

import { useState } from "react";
import Link from "next/link";
import type { CategoryOption } from "@/lib/tour-constants";
import type { TourCardData } from "@/components/home/FeaturedTours";

export default function ToursGrid({
  packages,
  categories,
}: {
  packages: TourCardData[];
  categories: CategoryOption[];
}) {
  const availableCategories = categories.filter((c) => packages.some((p) => p.categoryId === c.id));
  const [active, setActive] = useState<string>("ALL");

  const shown = active === "ALL" ? packages : packages.filter((p) => p.categoryId === active);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        <button
          onClick={() => setActive("ALL")}
          className={`px-5 py-2.5 rounded-md font-medium text-sm transition shadow-sm ${
            active === "ALL" ? "bg-ink text-gold" : "bg-white text-slate-700 hover:bg-slate-200"
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

      {shown.length === 0 ? (
        <p className="text-center text-gray-500">No packages published in this category yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {shown.map((tour) => (
            <div
              key={tour.slug}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 flex flex-col h-full"
            >
              <div className="relative h-56 bg-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={tour.coverImage} className="w-full h-full object-cover" alt={tour.title} />
                <span className="absolute top-4 left-4 bg-forest text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {tour.categoryLabel}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-ink mb-2">{tour.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{tour.summary}</p>
                  <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-slate-500 mb-4">
                    <span>
                      🕐 {tour.durationNights}N {tour.durationDays}D
                    </span>
                    <span>📍 {tour.locations}</span>
                  </div>
                  <p className="text-forest text-sm font-bold mb-4">{tour.priceLabel}</p>
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
      )}
    </div>
  );
}
