"use client";

import { useState, FormEvent } from "react";

const COUNTRIES = [
  "United States",
  "United Kingdom",
  "India",
  "Australia",
  "Canada",
  "Germany",
  "France",
  "Singapore",
  "Japan",
  "United Arab Emirates",
  "New Zealand",
  "Netherlands",
  "Switzerland",
  "Italy",
  "Spain",
  "Sweden",
  "Norway",
  "Denmark",
  "Ireland",
  "Belgium",
  "Austria",
  "Portugal",
  "South Korea",
  "China",
  "Hong Kong",
  "Thailand",
  "Malaysia",
  "Indonesia",
  "Philippines",
  "Vietnam",
  "Nepal",
  "Sri Lanka",
  "Bangladesh",
  "Bhutan",
  "South Africa",
  "Brazil",
  "Mexico",
  "Argentina",
  "Saudi Arabia",
  "Qatar",
  "Israel",
  "Other",
];

const ADULT_OPTIONS = Array.from({ length: 10 }, (_, i) => i + 1);
const CHILDREN_OPTIONS = Array.from({ length: 11 }, (_, i) => i);

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "GENERAL",
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("whatsapp"),
          country: data.get("country"),
          season: data.get("season"),
          interest: data.get("interest"),
          travelers: data.get("adults"),
          children: data.get("children"),
          message: data.get("message"),
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="lg:col-span-7 bg-slate-50 border border-slate-200 p-8 rounded-2xl shadow-sm flex items-center justify-center text-center">
        <div>
          <p className="text-2xl mb-2">✓</p>
          <h3 className="text-lg font-bold text-ink mb-2">Thank you!</h3>
          <p className="text-sm text-gray-600">
            Your private travel designer will connect with you via email within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="lg:col-span-7 bg-slate-50 border border-slate-200 p-8 rounded-2xl shadow-sm space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-xs uppercase font-bold tracking-wider text-slate-600 mb-2">
            Full Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Enter your full name"
            className="w-full bg-white border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ink"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs uppercase font-bold tracking-wider text-slate-600 mb-2">
            Email Address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Enter your email address"
            className="w-full bg-white border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ink"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="whatsapp" className="block text-xs uppercase font-bold tracking-wider text-slate-600 mb-2">
            WhatsApp Number *
          </label>
          <input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            required
            placeholder="+91 XXXXX XXXXX"
            className="w-full bg-white border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ink"
          />
        </div>
        <div>
          <label htmlFor="country" className="block text-xs uppercase font-bold tracking-wider text-slate-600 mb-2">
            Country of Residence *
          </label>
          <select
            id="country"
            name="country"
            required
            defaultValue=""
            className="w-full bg-white border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ink"
          >
            <option value="" disabled>
              Select your country
            </option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="season" className="block text-xs uppercase font-bold tracking-wider text-slate-600 mb-2">
            When are you planning to visit Bhutan? *
          </label>
          <select
            id="season"
            name="season"
            required
            defaultValue=""
            className="w-full bg-white border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ink"
          >
            <option value="" disabled>
              Select your travel dates
            </option>
            <option>Spring (March – May)</option>
            <option>Summer (June – August)</option>
            <option>Autumn (September – November)</option>
            <option>Winter (December – February)</option>
            <option>Flexible Dates</option>
          </select>
        </div>
        <div>
          <label htmlFor="interest" className="block text-xs uppercase font-bold tracking-wider text-slate-600 mb-2">
            What kind of Bhutan experience are you looking for? *
          </label>
          <select
            id="interest"
            name="interest"
            required
            defaultValue=""
            className="w-full bg-white border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ink"
          >
            <option value="" disabled>
              Select an experience
            </option>
            <option>Culture &amp; Heritage</option>
            <option>Trekking &amp; Hiking</option>
            <option>Luxury Escape</option>
            <option>Honeymoon &amp; Romance</option>
            <option>Festival Experience</option>
            <option>Photography Tour</option>
            <option>Wellness Retreat</option>
            <option>Family Holiday</option>
            <option>Nature &amp; Wildlife</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="adults" className="block text-xs uppercase font-bold tracking-wider text-slate-600 mb-2">
            Adults
          </label>
          <select
            id="adults"
            name="adults"
            defaultValue="2"
            className="w-full bg-white border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ink"
          >
            {ADULT_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n === 10 ? "10+" : n}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="children" className="block text-xs uppercase font-bold tracking-wider text-slate-600 mb-2">
            Children <span className="normal-case font-medium text-slate-400">(Optional)</span>
          </label>
          <select
            id="children"
            name="children"
            defaultValue="0"
            className="w-full bg-white border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ink"
          >
            {CHILDREN_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n === 10 ? "10+" : n}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs uppercase font-bold tracking-wider text-slate-600 mb-2">
          Tell Us About Your Dream Journey
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Share your interests, preferred hotels, trekking level, dietary requirements, celebration plans, or any special requests. We'll create a personalized Bhutan itinerary just for you."
          className="w-full bg-white border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ink"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
      )}

      <div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full bg-ink hover:bg-forest text-white font-bold py-4 rounded-xl text-sm transition tracking-wider uppercase shadow-lg disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : "Plan My Bhutan Journey"}
        </button>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-4 text-[13px] text-slate-500 text-center">
          <span>✔ Free Personalized Itinerary</span>
          <span>✔ Local Bhutan Travel Experts</span>
          <span>✔ Response Within 24 Hours</span>
        </div>
      </div>
    </form>
  );
}
