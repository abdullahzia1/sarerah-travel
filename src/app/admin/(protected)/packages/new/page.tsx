import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { PackageForm } from "../PackageForm";
import { createPackage } from "../actions";

export const metadata = { title: "New Package" };

export default async function NewPackagePage() {
  const supabase = getSupabaseAdminClient();
  const { data: destinations } = await supabase.from("destinations").select("id, name").order("name");

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-stone-900">New package</h1>
      <div className="mt-6">
        <PackageForm action={createPackage} destinations={destinations ?? []} />
      </div>
    </div>
  );
}
