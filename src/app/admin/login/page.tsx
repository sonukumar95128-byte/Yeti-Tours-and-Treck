export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next = "/admin", error } = await searchParams;

  return (
    <div className="min-h-screen grid place-items-center bg-slate-50 px-4">
      <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="font-display text-2xl text-ink mb-1">Admin access</h1>
        <p className="text-sm text-slate-500 mb-5">Enter the admin password to continue.</p>

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            Incorrect password.
          </p>
        )}

        <form action="/api/admin/login" method="POST" className="space-y-3">
          <input type="hidden" name="next" value={next} />
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoFocus
            required
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ink"
          />
          <button
            type="submit"
            className="w-full rounded-full bg-ink px-6 py-2.5 text-sm font-bold text-gold hover:bg-forest transition-colors"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
