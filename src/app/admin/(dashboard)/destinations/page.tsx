import { getPrisma } from "@/lib/prisma";
import DestinationManager from "@/components/admin/DestinationManager";

export const dynamic = "force-dynamic";

export default async function AdminDestinationsPage() {
  const prisma = getPrisma();
  const destinations = await prisma.destination.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink mb-2">Destinations</h1>
      <p className="text-sm text-slate-500 mb-6">
        Shown in the &quot;Legendary Bhutanese Destinations&quot; grid on the homepage.
      </p>
      <DestinationManager destinations={destinations} />
    </div>
  );
}
