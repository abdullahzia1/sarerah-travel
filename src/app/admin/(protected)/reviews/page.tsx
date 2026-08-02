import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { setReviewHidden } from "./actions";
import { SyncReviewsButton } from "./SyncReviewsButton";
import { secondaryButtonClass } from "@/components/admin/form-styles";
import { ReviewAvatar } from "@/components/reviews/ReviewAvatar";

export const metadata = { title: "Admin: Reviews" };

export default async function AdminReviewsPage() {
  const supabase = getSupabaseAdminClient();
  const { data: reviews, error } = await supabase
    .from("reviews")
    .select("id, author, rating, text, date, is_hidden, avatar_url")
    .order("date", { ascending: false });
  if (error) throw new Error(error.message);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-stone-900">Reviews</h1>
      <p className="mt-1 text-stone-600">
        Cached from Google Places — refreshed automatically once a week. Hide any review you don&apos;t want shown
        on the site; it stays hidden until you show it again (or Google stops returning it, in which case it drops
        out of the cache on the next sync).
      </p>

      <div className="mt-4">
        <SyncReviewsButton />
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-stone-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-stone-50">
              <th className="border-b border-stone-200 p-3 font-semibold">Author</th>
              <th className="border-b border-stone-200 p-3 font-semibold">Rating</th>
              <th className="border-b border-stone-200 p-3 font-semibold">Date</th>
              <th className="border-b border-stone-200 p-3 font-semibold">Text</th>
              <th className="border-b border-stone-200 p-3 font-semibold">Status</th>
              <th className="border-b border-stone-200 p-3 font-semibold" />
            </tr>
          </thead>
          <tbody>
            {(reviews ?? []).map((r) => (
              <tr key={r.id} className={`border-b border-stone-100 last:border-0 ${r.is_hidden ? "opacity-50" : ""}`}>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <ReviewAvatar author={r.author} avatar={r.avatar_url ?? undefined} size={28} />
                    <span className="font-medium text-stone-900">{r.author}</span>
                  </div>
                </td>
                <td className="p-3 text-stone-600">{r.rating}★</td>
                <td className="p-3 text-stone-500">{new Date(r.date).toLocaleDateString()}</td>
                <td className="max-w-xs truncate p-3 text-stone-600">{r.text}</td>
                <td className="p-3 text-stone-600">{r.is_hidden ? "Hidden" : "Visible"}</td>
                <td className="p-3">
                  <form action={setReviewHidden.bind(null, r.id, !r.is_hidden)}>
                    <button type="submit" className={secondaryButtonClass}>
                      {r.is_hidden ? "Show" : "Hide"}
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {(reviews ?? []).length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-stone-500">
                  No reviews cached yet. Click &quot;Sync from Google now&quot; above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
