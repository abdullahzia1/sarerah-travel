import Link from "next/link";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { getCachedGoogleRating } from "@/data/reviews";

export const metadata = { title: "Admin Dashboard" };

const CARDS = [
  { table: "destinations", href: "/admin/destinations", label: "Destinations" },
  { table: "packages", href: "/admin/packages", label: "Packages" },
  { table: "reviews", href: "/admin/reviews", label: "Cached reviews" },
  { table: "leads", href: "/admin/leads", label: "Leads" },
] as const;

export default async function AdminDashboardPage() {
  const supabase = getSupabaseAdminClient();
  const [counts, ratingCache] = await Promise.all([
    Promise.all(
      CARDS.map(async (c) => {
        const { count, error } = await supabase.from(c.table).select("*", { count: "exact", head: true });
        if (error) throw new Error(`${c.table}: ${error.message}`);
        return count ?? 0;
      })
    ),
    getCachedGoogleRating(),
  ]);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-stone-900">Dashboard</h1>
      <p className="mt-1 text-stone-600">Manage site content.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((c, i) => (
          <Link
            key={c.table}
            href={c.href}
            className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition-smooth hover:shadow-md"
          >
            <p className="text-sm font-medium text-stone-500">{c.label}</p>
            <p className="mt-1 font-display text-3xl font-bold text-stone-900">{counts[i]}</p>
          </Link>
        ))}
        <Link
          href="/admin/reviews"
          className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition-smooth hover:shadow-md"
        >
          <p className="text-sm font-medium text-stone-500">Google rating (cached)</p>
          <p className="mt-1 font-display text-3xl font-bold text-stone-900">
            {ratingCache.reviewCount > 0 ? `${ratingCache.rating}★` : "Not synced"}
          </p>
          <p className="mt-1 text-xs text-stone-500">
            {ratingCache.reviewCount > 0
              ? `${ratingCache.reviewCount} reviews on Google · synced ${
                  ratingCache.syncedAt ? new Date(ratingCache.syncedAt).toLocaleString() : "never"
                }`
              : "Run a sync from the Reviews page"}
          </p>
        </Link>
      </div>
    </div>
  );
}
