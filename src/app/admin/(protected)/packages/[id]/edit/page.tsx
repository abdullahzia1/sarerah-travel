import { notFound } from "next/navigation";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { PackageForm } from "../../PackageForm";
import { updatePackage } from "../../actions";

export const metadata = { title: "Edit Package" };

export default async function EditPackagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = getSupabaseAdminClient();

  const [{ data: pkg }, { data: destinations }, { data: itinerary }, { data: images }] = await Promise.all([
    supabase.from("packages").select("*").eq("id", id).maybeSingle(),
    supabase.from("destinations").select("id, name").order("name"),
    supabase.from("package_itineraries").select("day, title, description").eq("package_id", id).order("sort_order"),
    supabase.from("package_images").select("url, alt").eq("package_id", id).order("sort_order"),
  ]);

  if (!pkg) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-stone-900">Edit package</h1>
      <div className="mt-6">
        <PackageForm
          action={updatePackage.bind(null, id)}
          destinations={destinations ?? []}
          initial={{ ...pkg, itinerary: itinerary ?? [], images: images ?? [] }}
        />
      </div>
    </div>
  );
}
