import { notFound } from "next/navigation";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { DestinationForm } from "../../DestinationForm";
import { updateDestination } from "../../actions";

export const metadata = { title: "Edit Destination" };

export default async function EditDestinationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = getSupabaseAdminClient();
  const { data: destination } = await supabase.from("destinations").select("*").eq("id", id).maybeSingle();
  if (!destination) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-stone-900">Edit destination</h1>
      <div className="mt-6">
        <DestinationForm action={updateDestination.bind(null, id)} initial={destination} />
      </div>
    </div>
  );
}
