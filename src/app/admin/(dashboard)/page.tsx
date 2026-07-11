import Link from "next/link";
import { getPrisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const prisma = getPrisma();
  const [packageCount, publishedCount, newEnquiries, totalEnquiries] = await Promise.all([
    prisma.tourPackage.count(),
    prisma.tourPackage.count({ where: { published: true } }),
    prisma.enquiry.count({ where: { status: "NEW" } }),
    prisma.enquiry.count(),
  ]);

  const stats = [
    { label: "Tour Packages", value: packageCount, href: "/admin/packages" },
    { label: "Published", value: publishedCount, href: "/admin/packages" },
    { label: "New Enquiries", value: newEnquiries, href: "/admin/enquiries" },
    { label: "Total Enquiries", value: totalEnquiries, href: "/admin/enquiries" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="bg-white rounded-xl border border-slate-200 p-6 hover:border-gold/50 hover:shadow-md transition"
          >
            <p className="text-3xl font-bold text-ink">{s.value}</p>
            <p className="text-sm text-slate-500 mt-1">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex gap-3">
        <Link
          href="/admin/packages/new"
          className="bg-ink text-white font-bold text-sm px-5 py-2.5 rounded-full hover:bg-forest transition"
        >
          + New Tour Package
        </Link>
        <Link
          href="/tours"
          target="_blank"
          className="border border-ink text-ink font-bold text-sm px-5 py-2.5 rounded-full hover:bg-ink hover:text-white transition"
        >
          View Public Site
        </Link>
      </div>
    </div>
  );
}
