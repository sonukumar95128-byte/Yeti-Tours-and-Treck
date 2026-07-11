import { getPrisma } from "@/lib/prisma";
import CategoryManager from "@/components/admin/CategoryManager";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const prisma = getPrisma();
  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
    include: { _count: { select: { packages: true } } },
  });

  const rows = categories.map((c) => ({
    id: c.id,
    slug: c.slug,
    label: c.label,
    order: c.order,
    packageCount: c._count.packages,
  }));

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink mb-2">Tour Categories</h1>
      <p className="text-sm text-slate-500 mb-6">
        Categories power the filter tabs on the homepage and Tours page. Add new ones any time.
      </p>
      <CategoryManager categories={rows} />
    </div>
  );
}
