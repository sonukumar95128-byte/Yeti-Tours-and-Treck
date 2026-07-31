import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { verifyAdminToken } from "@/lib/adminSession";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const jar = await cookies();
  if (!verifyAdminToken(jar.get("admin_auth")?.value)) redirect("/admin/login");

  return <AdminShell>{children}</AdminShell>;
}
