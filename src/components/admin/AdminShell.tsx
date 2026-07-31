"use client";

import { useState } from "react";
import { AdminNav } from "./AdminNav";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-slate-50">
      <div className="lg:hidden fixed top-0 inset-x-0 z-40 h-14 bg-ink border-b border-white/10 flex items-center justify-between px-4">
        <span className="font-display text-base font-bold tracking-wider text-white">
          YETI TOURS
        </span>
        <button
          onClick={() => setOpen(true)}
          aria-label="Open admin menu"
          className="text-white p-2 -mr-2"
        >
          ☰
        </button>
      </div>

      {open && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 h-screen w-64 lg:w-56 shrink-0 border-r border-white/10 bg-ink flex flex-col z-50 transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="px-5 py-5 border-b border-white/10 shrink-0 flex items-center justify-between">
          <div>
            <span className="block font-display text-lg font-bold tracking-wider text-white">
              YETI TOURS
            </span>
            <p className="mt-1 text-xs text-gold/70">Admin panel</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close admin menu"
            className="lg:hidden text-white/70 p-1"
          >
            ✕
          </button>
        </div>
        <AdminNav onNavigate={() => setOpen(false)} />
        <form
          action="/api/admin/logout"
          method="POST"
          className="px-3 py-4 border-t border-white/10 shrink-0"
        >
          <button
            type="submit"
            className="w-full rounded-lg px-3 py-2 text-sm text-white/70 bg-white/5 hover:bg-forest hover:text-white transition-colors text-left"
          >
            Log out
          </button>
        </form>
      </aside>

      <main className="flex-1 min-w-0 p-4 pt-20 sm:p-6 sm:pt-20 lg:p-8 lg:pt-8">{children}</main>
    </div>
  );
}
