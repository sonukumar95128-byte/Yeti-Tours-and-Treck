"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export interface CategoryRow {
  id: string;
  slug: string;
  label: string;
  order: number;
  packageCount: number;
}

export default function CategoryManager({ categories }: { categories: CategoryRow[] }) {
  const router = useRouter();
  const [newLabel, setNewLabel] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [edits, setEdits] = useState<Record<string, string>>({});

  async function addCategory() {
    if (!newLabel.trim()) return;
    setBusy(true);
    setError("");
    const res = await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label: newLabel.trim() }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to add category");
    } else {
      setNewLabel("");
      router.refresh();
    }
    setBusy(false);
  }

  async function saveLabel(id: string) {
    const label = edits[id];
    if (!label?.trim()) return;
    setBusy(true);
    await fetch(`/api/admin/categories/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label: label.trim() }),
    });
    router.refresh();
    setBusy(false);
  }

  async function remove(id: string) {
    if (!confirm("Delete this category?")) return;
    setBusy(true);
    setError("");
    const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to delete category");
    } else {
      router.refresh();
    }
    setBusy(false);
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Label</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Packages</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id} className="border-t border-slate-100">
                <td className="px-4 py-3">
                  <input
                    defaultValue={c.label}
                    onChange={(e) => setEdits((s) => ({ ...s, [c.id]: e.target.value }))}
                    className="border border-slate-300 rounded-lg px-2 py-1 text-sm w-full max-w-xs"
                  />
                </td>
                <td className="px-4 py-3 text-slate-500">{c.slug}</td>
                <td className="px-4 py-3 text-slate-600">{c.packageCount}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 text-xs">
                    <button
                      disabled={busy}
                      onClick={() => saveLabel(c.id)}
                      className="px-2.5 py-1 rounded-full border border-slate-300 hover:bg-slate-100"
                    >
                      Save
                    </button>
                    <button
                      disabled={busy}
                      onClick={() => remove(c.id)}
                      className="px-2.5 py-1 rounded-full border border-red-200 text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                  No categories yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="font-bold text-ink mb-3">Add Category</h2>
        <div className="flex gap-3">
          <input
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="e.g. Wildlife Safaris"
            className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm"
          />
          <button
            disabled={busy}
            onClick={addCategory}
            className="bg-ink text-white font-bold text-sm px-5 py-2 rounded-full hover:bg-forest transition disabled:opacity-60"
          >
            Add
          </button>
        </div>
        {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
      </div>
    </div>
  );
}
