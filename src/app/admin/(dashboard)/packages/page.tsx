import Link from "next/link";
import { getPrisma } from "@/lib/prisma";
import PackageRowActions from "@/components/admin/PackageRowActions";

export const dynamic = "force-dynamic";

export default async function AdminPackagesPage() {
  const prisma = getPrisma();
  const packages = await prisma.tourPackage.findMany({
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    include: { category: true },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-ink">Tour Packages</h1>
        <Link
          href="/admin/packages/new"
          className="bg-ink text-white font-bold text-sm px-5 py-2.5 rounded-full hover:bg-forest transition"
        >
          + New Package
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Duration</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((p) => (
              <tr key={p.id} className="border-t border-slate-100">
                <td className="px-4 py-3">
                  <Link href={`/admin/packages/${p.id}`} className="font-semibold text-ink hover:underline">
                    {p.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-slate-600">{p.category.label}</td>
                <td className="px-4 py-3 text-slate-600">
                  {p.durationNights}N {p.durationDays}D
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      p.published ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {p.published ? "Published" : "Draft"}
                  </span>
                  {p.featured && (
                    <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-semibold bg-gold/20 text-ink">
                      Featured
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <PackageRowActions id={p.id} published={p.published} featured={p.featured} />
                </td>
              </tr>
            ))}
            {packages.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                  No tour packages yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
