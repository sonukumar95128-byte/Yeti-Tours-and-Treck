import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminNav } from "@/components/admin/AdminNav";
import { verifyAdminToken } from "@/lib/adminSession";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const jar = await cookies();
  if (!verifyAdminToken(jar.get("admin_auth")?.value)) redirect("/admin/login");

  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside className="w-56 shrink-0 sticky top-0 h-screen border-r border-white/10 bg-ink flex flex-col">
        <div className="px-5 py-5 border-b border-white/10 shrink-0">
          <span className="block font-display text-lg font-bold tracking-wider text-white">
            YETI TOURS
          </span>
          <p className="mt-1 text-xs text-gold/70">Admin panel</p>
        </div>
        <AdminNav />
        <form action="/api/admin/logout" method="POST" className="px-3 py-4 border-t border-white/10 shrink-0">
          <button
            type="submit"
            className="w-full rounded-lg px-3 py-2 text-sm text-white/70 bg-white/5 hover:bg-forest hover:text-white transition-colors text-left"
          >
            Log out
          </button>
        </form>
      </aside>

      <main className="flex-1 p-6 sm:p-8 min-w-0">{children}</main>
    </div>
  );
}
