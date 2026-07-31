import Link from "next/link";
import { getPrisma } from "@/lib/prisma";
import EnquiryStatusSelect from "@/components/admin/EnquiryStatusSelect";

export const dynamic = "force-dynamic";

function toDateInputValue(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function startOfDay(d: Date): Date {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

const HQ_WHATSAPP_NUMBER = "97577333367";

function buildWhatsAppLink(e: {
  name: string;
  email: string;
  phone: string | null;
  country: string | null;
  package: { title: string } | null;
  season: string | null;
  interest: string | null;
  travelers: number | null;
  children: number | null;
  message: string | null;
}): string {
  const lines = [
    `New enquiry from ${e.name}`,
    `Email: ${e.email}`,
    e.phone ? `Phone: ${e.phone}` : null,
    e.country ? `Country: ${e.country}` : null,
    e.package ? `Package: ${e.package.title}` : null,
    e.season ? `Season: ${e.season}` : null,
    e.interest ? `Interest: ${e.interest}` : null,
    e.travelers
      ? `Travelers: ${e.travelers} adult(s)${e.children ? `, ${e.children} child(ren)` : ""}`
      : null,
    e.message ? `Message: ${e.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  return `https://wa.me/${HQ_WHATSAPP_NUMBER}?text=${encodeURIComponent(lines)}`;
}

export default async function AdminEnquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; to?: string }>;
}) {
  const { from, to } = await searchParams;

  const createdAt: { gte?: Date; lte?: Date } = {};
  if (from) createdAt.gte = startOfDay(new Date(from));
  if (to) {
    const end = startOfDay(new Date(to));
    end.setHours(23, 59, 59, 999);
    createdAt.lte = end;
  }

  const prisma = getPrisma();
  const enquiries = await prisma.enquiry.findMany({
    where: from || to ? { createdAt } : undefined,
    orderBy: { createdAt: "desc" },
    include: { package: { select: { title: true } } },
  });

  const today = new Date();
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);
  const monthAgo = new Date(today);
  monthAgo.setDate(monthAgo.getDate() - 30);
  const todayStr = toDateInputValue(today);

  const presets = [
    { label: "Today", from: todayStr, to: todayStr },
    { label: "Last 7 days", from: toDateInputValue(weekAgo), to: todayStr },
    { label: "Last 30 days", from: toDateInputValue(monthAgo), to: todayStr },
  ];

  const exportHref = `/api/admin/enquiries/export${from || to ? `?${new URLSearchParams({ ...(from ? { from } : {}), ...(to ? { to } : {}) })}` : ""}`;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h1 className="font-display text-2xl font-bold text-ink">Enquiries</h1>
        <a
          href={exportHref}
          className="border border-ink text-ink font-bold text-sm px-5 py-2.5 rounded-full hover:bg-ink hover:text-white transition"
        >
          ⬇ Export CSV
        </a>
      </div>

      <form className="bg-white rounded-xl border border-slate-200 p-4 mb-6 flex flex-wrap items-end gap-3">
        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-1">From</label>
          <input
            type="date"
            name="from"
            defaultValue={from ?? ""}
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-1">To</label>
          <input
            type="date"
            name="to"
            defaultValue={to ?? ""}
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
          />
        </div>
        <button
          type="submit"
          className="bg-ink text-white font-bold text-sm px-5 py-2 rounded-full hover:bg-forest transition"
        >
          Filter
        </button>
        {(from || to) && (
          <Link href="/admin/enquiries" className="text-sm text-slate-500 hover:underline px-1 py-2">
            Clear
          </Link>
        )}
        <div className="flex flex-wrap gap-2 ml-auto">
          {presets.map((p) => (
            <Link
              key={p.label}
              href={`/admin/enquiries?from=${p.from}&to=${p.to}`}
              className="px-3 py-1.5 rounded-full border border-slate-300 text-xs text-slate-600 hover:bg-slate-100 transition"
            >
              {p.label}
            </Link>
          ))}
        </div>
      </form>

      <div className="space-y-4">
        {enquiries.map((e) => (
          <div key={e.id} className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div>
                <p className="font-bold text-ink">
                  {e.name}{" "}
                  <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {e.type}
                  </span>
                </p>
                <p className="text-xs text-slate-500">
                  {e.email} {e.phone ? `· ${e.phone}` : ""} {e.country ? `· ${e.country}` : ""}
                </p>
                {e.package && (
                  <p className="text-xs text-forest font-semibold mt-1">Re: {e.package.title}</p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400">
                  {new Date(e.createdAt).toLocaleDateString()}
                </span>
                <a
                  href={buildWhatsAppLink(e)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-[#25D366] text-[#128C4A] text-xs font-semibold hover:bg-[#25D366]/10 transition"
                >
                  💬 WhatsApp
                </a>
                <EnquiryStatusSelect id={e.id} status={e.status} />
              </div>
            </div>
            {e.message && <p className="text-sm text-gray-700 whitespace-pre-line">{e.message}</p>}
            {(e.travelDate || e.travelers || e.children || e.season || e.interest) && (
              <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-500">
                {e.travelDate && <span>📅 {new Date(e.travelDate).toLocaleDateString()}</span>}
                {e.travelers && (
                  <span>
                    👥 {e.travelers} adult{e.travelers === 1 ? "" : "s"}
                    {e.children ? `, ${e.children} child${e.children === 1 ? "" : "ren"}` : ""}
                  </span>
                )}
                {e.season && <span>🗓 {e.season}</span>}
                {e.interest && <span>✨ {e.interest}</span>}
              </div>
            )}
          </div>
        ))}
        {enquiries.length === 0 && (
          <p className="text-center text-slate-500 py-12">
            {from || to ? "No enquiries in this date range." : "No enquiries yet."}
          </p>
        )}
      </div>
    </div>
  );
}
