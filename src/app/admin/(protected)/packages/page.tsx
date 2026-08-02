import Link from "next/link";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { deletePackage } from "./actions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { primaryButtonClass } from "@/components/admin/form-styles";

export const metadata = { title: "Admin: Packages" };

export default async function AdminPackagesPage() {
  const supabase = getSupabaseAdminClient();
  const { data: packages, error } = await supabase
    .from("packages")
    .select("id, slug, name, price_from_pkr, is_featured, destinations(name)")
    .order("name");
  if (error) throw new Error(error.message);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-stone-900">Packages</h1>
        <Link href="/admin/packages/new" className={primaryButtonClass}>
          + New package
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-stone-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-stone-50">
              <th className="border-b border-stone-200 p-3 font-semibold">Name</th>
              <th className="border-b border-stone-200 p-3 font-semibold">Destination</th>
              <th className="border-b border-stone-200 p-3 font-semibold">From (PKR)</th>
              <th className="border-b border-stone-200 p-3 font-semibold">Featured</th>
              <th className="border-b border-stone-200 p-3 font-semibold" />
            </tr>
          </thead>
          <tbody>
            {(packages ?? []).map((p) => (
              <tr key={p.id} className="border-b border-stone-100 last:border-0">
                <td className="p-3 font-medium text-stone-900">{p.name}</td>
                <td className="p-3 text-stone-600">{(p.destinations as unknown as { name: string } | null)?.name ?? "—"}</td>
                <td className="p-3 text-stone-600">{p.price_from_pkr.toLocaleString()}</td>
                <td className="p-3 text-stone-600">{p.is_featured ? "Yes" : ""}</td>
                <td className="p-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/packages/${p.id}/edit`} className="text-sm font-medium text-teal-700 hover:underline">
                      Edit
                    </Link>
                    <DeleteButton action={deletePackage.bind(null, p.id)} confirmText={`Delete "${p.name}"?`} />
                  </div>
                </td>
              </tr>
            ))}
            {(packages ?? []).length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-stone-500">
                  No packages yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
