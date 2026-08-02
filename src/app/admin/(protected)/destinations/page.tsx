import Link from "next/link";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { deleteDestination } from "./actions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { primaryButtonClass } from "@/components/admin/form-styles";

export const metadata = { title: "Admin: Destinations" };

export default async function AdminDestinationsPage() {
  const supabase = getSupabaseAdminClient();
  const { data: destinations, error } = await supabase
    .from("destinations")
    .select("id, slug, name, region")
    .order("name");
  if (error) throw new Error(error.message);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-stone-900">Destinations</h1>
        <Link href="/admin/destinations/new" className={primaryButtonClass}>
          + New destination
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-stone-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-stone-50">
              <th className="border-b border-stone-200 p-3 font-semibold">Name</th>
              <th className="border-b border-stone-200 p-3 font-semibold">Slug</th>
              <th className="border-b border-stone-200 p-3 font-semibold">Region</th>
              <th className="border-b border-stone-200 p-3 font-semibold" />
            </tr>
          </thead>
          <tbody>
            {(destinations ?? []).map((d) => (
              <tr key={d.id} className="border-b border-stone-100 last:border-0">
                <td className="p-3 font-medium text-stone-900">{d.name}</td>
                <td className="p-3 text-stone-500">{d.slug}</td>
                <td className="p-3 text-stone-600">{d.region}</td>
                <td className="p-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/destinations/${d.id}/edit`}
                      className="text-sm font-medium text-teal-700 hover:underline"
                    >
                      Edit
                    </Link>
                    <DeleteButton
                      action={deleteDestination.bind(null, d.id)}
                      confirmText={`Delete "${d.name}"? Packages linked to it must be removed or reassigned first.`}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {(destinations ?? []).length === 0 && (
              <tr>
                <td colSpan={4} className="p-6 text-center text-stone-500">
                  No destinations yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
