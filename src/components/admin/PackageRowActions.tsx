"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PackageRowActions({
  id,
  published,
  featured,
}: {
  id: string;
  published: boolean;
  featured: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function patch(data: Record<string, unknown>) {
    setBusy(true);
    await fetch(`/api/admin/packages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    router.refresh();
    setBusy(false);
  }

  async function remove() {
    if (!confirm("Delete this tour package? This cannot be undone.")) return;
    setBusy(true);
    await fetch(`/api/admin/packages/${id}`, { method: "DELETE" });
    router.refresh();
    setBusy(false);
  }

  return (
    <div className="flex items-center gap-2 text-xs">
      <button
        disabled={busy}
        onClick={() => patch({ published: !published })}
        className="px-2.5 py-1 rounded-full border border-slate-300 hover:bg-slate-100"
      >
        {published ? "Unpublish" : "Publish"}
      </button>
      <button
        disabled={busy}
        onClick={() => patch({ featured: !featured })}
        className="px-2.5 py-1 rounded-full border border-slate-300 hover:bg-slate-100"
      >
        {featured ? "Unfeature" : "Feature"}
      </button>
      <button
        disabled={busy}
        onClick={remove}
        className="px-2.5 py-1 rounded-full border border-red-200 text-red-600 hover:bg-red-50"
      >
        Delete
      </button>
    </div>
  );
}
