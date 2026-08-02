import { DestinationForm } from "../DestinationForm";
import { createDestination } from "../actions";

export const metadata = { title: "New Destination" };

export default function NewDestinationPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-stone-900">New destination</h1>
      <div className="mt-6">
        <DestinationForm action={createDestination} />
      </div>
    </div>
  );
}
