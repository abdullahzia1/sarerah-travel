import Link from "next/link";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { getGoogleReviews } from "@/lib/google-reviews";

export const metadata = { title: "Admin Dashboard" };

const CARDS = [
  { table: "destinations", href: "/admin/destinations", label: "Destinations" },
  { table: "packages", href: "/admin/packages", label: "Packages" },
  { table: "leads", href: "/admin/leads", label: "Leads" },
] as const;

export default async function AdminDashboardPage() {
  const supabase = getSupabaseAdminClient();
  const [counts, googleReviews] = await Promise.all([
    Promise.all(
      CARDS.map(async (c) => {
        const { count } = await supabase.from(c.table).select("*", { count: "exact", head: true });
        return count ?? 0;
      })
    ),
    getGoogleReviews(),
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
        <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Google rating</p>
          <p className="mt-1 font-display text-3xl font-bold text-stone-900">
            {googleReviews.reviewCount > 0 ? `${googleReviews.rating}★` : "Not configured"}
          </p>
          {googleReviews.reviewCount > 0 && (
            <p className="mt-1 text-xs text-stone-500">{googleReviews.reviewCount} reviews on Google</p>
          )}
        </div>
      </div>
    </div>
  );
}
