"use client";

import { useState, FormEvent } from "react";

export default function BookingForm({
  packageId,
  packageTitle,
}: {
  packageId: string;
  packageTitle: string;
}) {
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
          type: "BOOKING",
          packageId,
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          travelDate: data.get("travelDate") || null,
          travelers: data.get("travelers") || null,
          message: data.get("message") || `Booking request for ${packageTitle}`,
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
      <div className="bg-gray-50 rounded-xl p-6 border border-slate-200 text-center">
        <p className="text-2xl mb-2">✓</p>
        <h4 className="font-bold text-ink mb-1">Request received!</h4>
        <p className="text-sm text-gray-600">
          Our travel designer will reach out within 24 hours to confirm details and arrange your
          deposit.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 rounded-xl p-6 border border-slate-200 space-y-4">
      <h4 className="font-bold text-ink text-lg">Request to Book This Journey</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          name="name"
          type="text"
          placeholder="Full Name *"
          required
          className="w-full bg-white border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ink"
        />
        <input
          name="email"
          type="email"
          placeholder="Email Address *"
          required
          className="w-full bg-white border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ink"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input
          name="phone"
          type="tel"
          placeholder="Phone"
          className="w-full bg-white border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ink"
        />
        <input
          name="travelDate"
          type="date"
          className="w-full bg-white border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ink"
        />
        <input
          name="travelers"
          type="number"
          min={1}
          placeholder="Travelers"
          className="w-full bg-white border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ink"
        />
      </div>
      <textarea
        name="message"
        rows={3}
        placeholder="Anything else we should know?"
        className="w-full bg-white border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ink"
      />
      {status === "error" && <p className="text-sm text-red-600">Something went wrong. Please try again.</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-gold hover:bg-gold-dark text-ink font-bold py-3 rounded-xl text-sm shadow-md transition disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Request to Book / Get a Quote"}
      </button>
    </form>
  );
}
