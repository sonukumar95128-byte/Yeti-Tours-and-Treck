"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export interface DestinationRow {
  id: string;
  name: string;
  description: string;
  image: string;
  order: number;
}

const emptyForm = { name: "", description: "", image: "" };

export default function DestinationManager({ destinations }: { destinations: DestinationRow[] }) {
  const router = useRouter();
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  function startEdit(d: DestinationRow) {
    setEditingId(d.id);
    setForm({ name: d.name, description: d.description, image: d.image });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function submit() {
    if (!form.name.trim()) return;
    setBusy(true);
    setError("");
    const res = await fetch(
      editingId ? `/api/admin/destinations/${editingId}` : "/api/admin/destinations",
      {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to save destination");
    } else {
      resetForm();
      router.refresh();
    }
    setBusy(false);
  }

  async function remove(id: string) {
    if (!confirm("Delete this destination?")) return;
    setBusy(true);
    await fetch(`/api/admin/destinations/${id}`, { method: "DELETE" });
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
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {destinations.map((d) => (
              <tr key={d.id} className="border-t border-slate-100">
                <td className="px-4 py-3 font-semibold text-ink">{d.name}</td>
                <td className="px-4 py-3 text-slate-600 max-w-md truncate">{d.description}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 text-xs">
                    <button
                      onClick={() => startEdit(d)}
                      className="px-2.5 py-1 rounded-full border border-slate-300 hover:bg-slate-100"
                    >
                      Edit
                    </button>
                    <button
                      disabled={busy}
                      onClick={() => remove(d.id)}
                      className="px-2.5 py-1 rounded-full border border-red-200 text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {destinations.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-slate-500">
                  No destinations yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
        <h2 className="font-bold text-ink">{editingId ? "Edit Destination" : "Add Destination"}</h2>
        <input
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          placeholder="Destination name"
          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
        />
        <textarea
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          placeholder="Short description"
          rows={2}
          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
        />
        <input
          value={form.image}
          onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
          placeholder="Image URL"
          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="flex gap-3">
          <button
            disabled={busy}
            onClick={submit}
            className="bg-ink text-white font-bold text-sm px-5 py-2 rounded-full hover:bg-forest transition disabled:opacity-60"
          >
            {editingId ? "Save Changes" : "Add Destination"}
          </button>
          {editingId && (
            <button
              onClick={resetForm}
              className="text-sm text-slate-500 hover:underline"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
