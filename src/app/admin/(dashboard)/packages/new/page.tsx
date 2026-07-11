import PackageForm from "@/components/admin/PackageForm";
import { getCategories } from "@/lib/tours";

export const dynamic = "force-dynamic";

export default async function NewPackagePage() {
  const categories = await getCategories();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink mb-6">New Tour Package</h1>
      <PackageForm categories={categories} />
    </div>
  );
}
