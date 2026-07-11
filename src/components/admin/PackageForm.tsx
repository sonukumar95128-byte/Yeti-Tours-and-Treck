"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { CategoryOption } from "@/lib/tour-constants";

interface ItineraryDay {
  dayNumber: number;
  title: string;
  description: string;
}

export interface PackageFormValues {
  id?: string;
  title: string;
  categoryId: string;
  summary: string;
  overview: string;
  durationDays: number;
  durationNights: number;
  locations: string;
  highlights: string[];
  priceFrom: number | null;
  priceNote: string;
  coverImage: string;
  featured: boolean;
  published: boolean;
  itinerary: ItineraryDay[];
}

const emptyDay = (n: number): ItineraryDay => ({ dayNumber: n, title: "", description: "" });

export default function PackageForm({
  initial,
  categories,
}: {
  initial?: Partial<PackageFormValues>;
  categories: CategoryOption[];
}) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [categoryId, setCategoryId] = useState(initial?.categoryId ?? categories[0]?.id ?? "");
  const [summary, setSummary] = useState(initial?.summary ?? "");
  const [overview, setOverview] = useState(initial?.overview ?? "");
  const [durationDays, setDurationDays] = useState(initial?.durationDays ?? 1);
  const [durationNights, setDurationNights] = useState(initial?.durationNights ?? 0);
  const [locations, setLocations] = useState(initial?.locations ?? "");
  const [highlightsText, setHighlightsText] = useState((initial?.highlights ?? []).join("\n"));
  const [priceFrom, setPriceFrom] = useState<string>(initial?.priceFrom?.toString() ?? "");
  const [priceNote, setPriceNote] = useState(initial?.priceNote ?? "");
  const [coverImage, setCoverImage] = useState(initial?.coverImage ?? "");
  const [featured, setFeatured] = useState(initial?.featured ?? false);
  const [published, setPublished] = useState(initial?.published ?? true);
  const [itinerary, setItinerary] = useState<ItineraryDay[]>(
    initial?.itinerary?.length ? initial.itinerary : [emptyDay(1)]
  );
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [error, setError] = useState("");

  function updateDay(index: number, field: keyof ItineraryDay, value: string | number) {
    setItinerary((days) => days.map((d, i) => (i === index ? { ...d, [field]: value } : d)));
  }

  function addDay() {
    setItinerary((days) => [...days, emptyDay(days.length + 1)]);
  }

  function removeDay(index: number) {
    setItinerary((days) => days.filter((_, i) => i !== index).map((d, i) => ({ ...d, dayNumber: i + 1 })));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("saving");
    setError("");

    const payload = {
      title,
      categoryId,
      summary,
      overview,
      durationDays: Number(durationDays),
      durationNights: Number(durationNights),
      locations,
      highlights: highlightsText.split("\n").map((h) => h.trim()).filter(Boolean),
      priceFrom: priceFrom ? Number(priceFrom) : null,
      priceNote,
      coverImage,
      featured,
      published,
      itinerary: itinerary.filter((d) => d.title.trim() || d.description.trim()),
    };

    try {
      const res = await fetch(
        initial?.id ? `/api/admin/packages/${initial.id}` : "/api/admin/packages",
        {
          method: initial?.id ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to save");
      }
      router.push("/admin/packages");
      router.refresh();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to save");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <h2 className="font-bold text-ink">Basics</h2>
        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Title *</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-slate-300 rounded-lg p-2.5 text-sm"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-2.5 text-sm"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
            {categories.length === 0 && (
              <p className="text-xs text-red-500 mt-1">
                No categories yet — create one in{" "}
                <a href="/admin/categories" className="underline">
                  Categories
                </a>{" "}
                first.
              </p>
            )}
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Locations</label>
            <input
              value={locations}
              onChange={(e) => setLocations(e.target.value)}
              placeholder="Paro, Thimphu, Punakha"
              className="w-full border border-slate-300 rounded-lg p-2.5 text-sm"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Nights</label>
            <input
              type="number"
              min={0}
              value={durationNights}
              onChange={(e) => setDurationNights(Number(e.target.value))}
              className="w-full border border-slate-300 rounded-lg p-2.5 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Days</label>
            <input
              type="number"
              min={1}
              value={durationDays}
              onChange={(e) => setDurationDays(Number(e.target.value))}
              className="w-full border border-slate-300 rounded-lg p-2.5 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Cover Image URL</label>
          <input
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            className="w-full border border-slate-300 rounded-lg p-2.5 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
            Summary (shown on cards)
          </label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={2}
            className="w-full border border-slate-300 rounded-lg p-2.5 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
            Overview (full description)
          </label>
          <textarea
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            rows={5}
            className="w-full border border-slate-300 rounded-lg p-2.5 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
            Highlights (one per line)
          </label>
          <textarea
            value={highlightsText}
            onChange={(e) => setHighlightsText(e.target.value)}
            rows={4}
            className="w-full border border-slate-300 rounded-lg p-2.5 text-sm"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Price From (USD, optional)
            </label>
            <input
              type="number"
              value={priceFrom}
              onChange={(e) => setPriceFrom(e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-2.5 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Price Note (shown if no price)
            </label>
            <input
              value={priceNote}
              onChange={(e) => setPriceNote(e.target.value)}
              placeholder="Contact us for a custom quote"
              className="w-full border border-slate-300 rounded-lg p-2.5 text-sm"
            />
          </div>
        </div>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
            Featured on homepage
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
            />
            Published
          </label>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-ink">Day-by-Day Itinerary</h2>
          <button
            type="button"
            onClick={addDay}
            className="text-xs font-bold text-forest hover:underline"
          >
            + Add Day
          </button>
        </div>
        {itinerary.map((day, i) => (
          <div key={i} className="border border-slate-200 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-slate-500">Day {day.dayNumber}</span>
              <button
                type="button"
                onClick={() => removeDay(i)}
                className="text-xs text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
            <input
              value={day.title}
              onChange={(e) => updateDay(i, "title", e.target.value)}
              placeholder="Day title"
              className="w-full border border-slate-300 rounded-lg p-2 text-sm"
            />
            <textarea
              value={day.description}
              onChange={(e) => updateDay(i, "description", e.target.value)}
              placeholder="Day description"
              rows={3}
              className="w-full border border-slate-300 rounded-lg p-2 text-sm"
            />
          </div>
        ))}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={status === "saving"}
          className="bg-ink text-white font-bold text-sm px-6 py-2.5 rounded-full hover:bg-forest transition disabled:opacity-60"
        >
          {status === "saving" ? "Saving..." : "Save Package"}
        </button>
      </div>
    </form>
  );
}
