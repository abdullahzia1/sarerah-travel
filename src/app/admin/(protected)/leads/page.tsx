import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { deleteLead } from "./actions";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const metadata = { title: "Admin: Leads" };

export default async function AdminLeadsPage() {
  const supabase = getSupabaseAdminClient();
  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-stone-900">Leads</h1>
      <p className="mt-1 text-stone-600">{(leads ?? []).length} total</p>

      <div className="mt-6 overflow-x-auto rounded-xl border border-stone-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-stone-50">
              <th className="border-b border-stone-200 p-3 font-semibold">Time</th>
              <th className="border-b border-stone-200 p-3 font-semibold">Name</th>
              <th className="border-b border-stone-200 p-3 font-semibold">Phone</th>
              <th className="border-b border-stone-200 p-3 font-semibold">Email</th>
              <th className="border-b border-stone-200 p-3 font-semibold">Source</th>
              <th className="border-b border-stone-200 p-3 font-semibold">Destination / Package</th>
              <th className="border-b border-stone-200 p-3 font-semibold">Message</th>
              <th className="border-b border-stone-200 p-3 font-semibold" />
            </tr>
          </thead>
          <tbody>
            {(leads ?? []).map((lead) => (
              <tr key={lead.id} className="border-b border-stone-100 last:border-0">
                <td className="p-3 text-stone-500">{new Date(lead.created_at).toLocaleString()}</td>
                <td className="p-3 font-medium text-stone-900">{lead.name}</td>
                <td className="p-3">{lead.phone}</td>
                <td className="p-3">{lead.email ?? "—"}</td>
                <td className="p-3 text-stone-600">{lead.source_page}</td>
                <td className="p-3 text-stone-600">{lead.destination ?? lead.package ?? "—"}</td>
                <td className="max-w-xs truncate p-3 text-stone-600" title={lead.message ?? undefined}>
                  {lead.message ?? "—"}
                </td>
                <td className="p-3">
                  <DeleteButton action={deleteLead.bind(null, lead.id)} confirmText="Delete this lead?" />
                </td>
              </tr>
            ))}
            {(leads ?? []).length === 0 && (
              <tr>
                <td colSpan={8} className="p-6 text-center text-stone-500">
                  No leads yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
