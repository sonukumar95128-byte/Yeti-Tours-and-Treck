"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export interface TestimonialRow {
  id: string;
  quote: string;
  name: string;
  place: string;
  initials: string;
}

const emptyForm = { quote: "", name: "", place: "", initials: "" };

export default function TestimonialManager({ testimonials }: { testimonials: TestimonialRow[] }) {
  const router = useRouter();
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  function startEdit(t: TestimonialRow) {
    setEditingId(t.id);
    setForm({ quote: t.quote, name: t.name, place: t.place, initials: t.initials });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function submit() {
    if (!form.name.trim() || !form.quote.trim()) return;
    setBusy(true);
    setError("");
    const res = await fetch(
      editingId ? `/api/admin/testimonials/${editingId}` : "/api/admin/testimonials",
      {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to save testimonial");
    } else {
      resetForm();
      router.refresh();
    }
    setBusy(false);
  }

  async function remove(id: string) {
    if (!confirm("Delete this testimonial?")) return;
    setBusy(true);
    await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
    router.refresh();
    setBusy(false);
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Place</th>
              <th className="px-4 py-3">Quote</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((t) => (
              <tr key={t.id} className="border-t border-slate-100">
                <td className="px-4 py-3 font-semibold text-ink">{t.name}</td>
                <td className="px-4 py-3 text-slate-600">{t.place}</td>
                <td className="px-4 py-3 text-slate-600 max-w-md truncate">{t.quote}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 text-xs">
                    <button
                      onClick={() => startEdit(t)}
                      className="px-2.5 py-1 rounded-full border border-slate-300 hover:bg-slate-100"
                    >
                      Edit
                    </button>
                    <button
                      disabled={busy}
                      onClick={() => remove(t.id)}
                      className="px-2.5 py-1 rounded-full border border-red-200 text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {testimonials.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                  No testimonials yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
        <h2 className="font-bold text-ink">{editingId ? "Edit Testimonial" : "Add Testimonial"}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Traveler name"
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
          />
          <input
            value={form.place}
            onChange={(e) => setForm((f) => ({ ...f, place: e.target.value }))}
            placeholder="City, Country"
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
          />
          <input
            value={form.initials}
            onChange={(e) => setForm((f) => ({ ...f, initials: e.target.value }))}
            placeholder="Initials (e.g. EA)"
            maxLength={3}
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
          />
        </div>
        <textarea
          value={form.quote}
          onChange={(e) => setForm((f) => ({ ...f, quote: e.target.value }))}
          placeholder="Testimonial quote"
          rows={3}
          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="flex gap-3">
          <button
            disabled={busy}
            onClick={submit}
            className="bg-ink text-white font-bold text-sm px-5 py-2 rounded-full hover:bg-forest transition disabled:opacity-60"
          >
            {editingId ? "Save Changes" : "Add Testimonial"}
          </button>
          {editingId && (
            <button onClick={resetForm} className="text-sm text-slate-500 hover:underline">
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
