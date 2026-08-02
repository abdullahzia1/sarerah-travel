"use client";

import { SubmitButton } from "@/components/admin/SubmitButton";
import { inputClass, labelClass, fieldWrapClass } from "@/components/admin/form-styles";
import { PackageItineraryField } from "./PackageItineraryField";
import { PackageImagesField } from "./PackageImagesField";

const PACKAGE_TYPES = ["Adventure", "Family", "Honeymoon", "Trekking", "Road Trip", "Group Tour"];
const DIFFICULTIES = ["Easy", "Moderate", "Challenging", "Strenuous"];

export interface PackageFormValues {
  slug: string;
  name: string;
  short_description: string;
  description: string | null;
  destination_id: string;
  type: string[];
  duration_days: number;
  difficulty: string;
  group_size: string | null;
  pickup_city: string | null;
  price_from_pkr: number;
  price_from_usd: number | null;
  currency: string | null;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  next_departures: string[];
  tags: string[];
  what_to_pack: string[];
  map_embed_url: string | null;
  best_season: string | null;
  weather: string | null;
  is_featured: boolean;
  itinerary?: { day: number; title: string; description: string }[];
  images?: { url: string; alt?: string }[];
}

export function PackageForm({
  action,
  destinations,
  initial,
}: {
  action: (formData: FormData) => void;
  destinations: { id: string; name: string }[];
  initial?: PackageFormValues;
}) {
  return (
    <form action={action} className="max-w-3xl space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className={fieldWrapClass}>
          <label className={labelClass}>Slug</label>
          <input name="slug" defaultValue={initial?.slug} required pattern="[a-z0-9-]+" className={inputClass} />
        </div>
        <div className={fieldWrapClass}>
          <label className={labelClass}>Name</label>
          <input name="name" defaultValue={initial?.name} required className={inputClass} />
        </div>
      </div>

      <div className={fieldWrapClass}>
        <label className={labelClass}>Destination</label>
        <select name="destinationId" defaultValue={initial?.destination_id ?? ""} required className={inputClass}>
          <option value="" disabled>
            Select a destination
          </option>
          {destinations.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      <div className={fieldWrapClass}>
        <label className={labelClass}>Short description</label>
        <input name="shortDescription" defaultValue={initial?.short_description} required className={inputClass} />
      </div>

      <div className={fieldWrapClass}>
        <label className={labelClass}>Description</label>
        <textarea name="description" defaultValue={initial?.description ?? ""} rows={3} className={inputClass} />
      </div>

      <div className={fieldWrapClass}>
        <label className={labelClass}>Type</label>
        <div className="flex flex-wrap gap-4">
          {PACKAGE_TYPES.map((t) => (
            <label key={t} className="flex items-center gap-2 text-sm text-stone-700">
              <input
                type="checkbox"
                name="type"
                value={t}
                defaultChecked={initial?.type?.includes(t)}
                className="rounded border-stone-300"
              />
              {t}
            </label>
          ))}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div className={fieldWrapClass}>
          <label className={labelClass}>Duration (days)</label>
          <input
            type="number"
            name="durationDays"
            defaultValue={initial?.duration_days}
            required
            min={1}
            className={inputClass}
          />
        </div>
        <div className={fieldWrapClass}>
          <label className={labelClass}>Difficulty</label>
          <select name="difficulty" defaultValue={initial?.difficulty ?? "Easy"} className={inputClass}>
            {DIFFICULTIES.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <div className={fieldWrapClass}>
          <label className={labelClass}>Group size</label>
          <input name="groupSize" defaultValue={initial?.group_size ?? ""} placeholder="e.g. 4-12" className={inputClass} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className={fieldWrapClass}>
          <label className={labelClass}>Pickup city</label>
          <input name="pickupCity" defaultValue={initial?.pickup_city ?? ""} className={inputClass} />
        </div>
        <div className={fieldWrapClass}>
          <label className={labelClass}>Currency</label>
          <select name="currency" defaultValue={initial?.currency ?? "PKR"} className={inputClass}>
            <option value="PKR">PKR</option>
            <option value="USD">USD</option>
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className={fieldWrapClass}>
          <label className={labelClass}>Price from (PKR)</label>
          <input
            type="number"
            name="priceFromPkr"
            defaultValue={initial?.price_from_pkr}
            required
            min={0}
            className={inputClass}
          />
        </div>
        <div className={fieldWrapClass}>
          <label className={labelClass}>Price from (USD, optional)</label>
          <input
            type="number"
            name="priceFromUsd"
            defaultValue={initial?.price_from_usd ?? ""}
            min={0}
            className={inputClass}
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-stone-700">
        <input type="checkbox" name="isFeatured" defaultChecked={initial?.is_featured} className="rounded border-stone-300" />
        Featured (shown first in &quot;Featured Trips&quot; on the homepage)
      </label>

      <div className={fieldWrapClass}>
        <label className={labelClass}>Highlights (one per line)</label>
        <textarea name="highlights" defaultValue={initial?.highlights?.join("\n")} rows={4} className={inputClass} />
      </div>

      <div className={fieldWrapClass}>
        <label className={labelClass}>Itinerary</label>
        <PackageItineraryField initial={initial?.itinerary ?? []} />
      </div>

      <div className={fieldWrapClass}>
        <label className={labelClass}>Images</label>
        <PackageImagesField initial={initial?.images ?? []} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className={fieldWrapClass}>
          <label className={labelClass}>Inclusions (one per line)</label>
          <textarea name="inclusions" defaultValue={initial?.inclusions?.join("\n")} rows={4} className={inputClass} />
        </div>
        <div className={fieldWrapClass}>
          <label className={labelClass}>Exclusions (one per line)</label>
          <textarea name="exclusions" defaultValue={initial?.exclusions?.join("\n")} rows={4} className={inputClass} />
        </div>
      </div>

      <div className={fieldWrapClass}>
        <label className={labelClass}>Next departures (one date per line, YYYY-MM-DD)</label>
        <textarea
          name="nextDepartures"
          defaultValue={initial?.next_departures?.join("\n")}
          rows={3}
          className={inputClass}
        />
      </div>

      <div className={fieldWrapClass}>
        <label className={labelClass}>Tags (one per line)</label>
        <textarea name="tags" defaultValue={initial?.tags?.join("\n")} rows={2} className={inputClass} />
      </div>

      <div className={fieldWrapClass}>
        <label className={labelClass}>What to pack (one per line)</label>
        <textarea name="whatToPack" defaultValue={initial?.what_to_pack?.join("\n")} rows={3} className={inputClass} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className={fieldWrapClass}>
          <label className={labelClass}>Best season</label>
          <input name="bestSeason" defaultValue={initial?.best_season ?? ""} className={inputClass} />
        </div>
        <div className={fieldWrapClass}>
          <label className={labelClass}>Weather</label>
          <input name="weather" defaultValue={initial?.weather ?? ""} className={inputClass} />
        </div>
      </div>

      <div className={fieldWrapClass}>
        <label className={labelClass}>Map embed URL (optional)</label>
        <input name="mapEmbedUrl" defaultValue={initial?.map_embed_url ?? ""} className={inputClass} />
      </div>

      <SubmitButton>{initial ? "Save changes" : "Create package"}</SubmitButton>
    </form>
  );
}
