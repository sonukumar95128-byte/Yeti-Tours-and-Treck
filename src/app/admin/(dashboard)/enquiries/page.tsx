import { getPrisma } from "@/lib/prisma";
import EnquiryStatusSelect from "@/components/admin/EnquiryStatusSelect";

export const dynamic = "force-dynamic";

export default async function AdminEnquiriesPage() {
  const prisma = getPrisma();
  const enquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: "desc" },
    include: { package: { select: { title: true } } },
  });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink mb-6">Enquiries</h1>

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
          <p className="text-center text-slate-500 py-12">No enquiries yet.</p>
        )}
      </div>
    </div>
  );
}
