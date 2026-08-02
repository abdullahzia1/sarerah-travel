"use client";

import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { inputClass, labelClass, fieldWrapClass } from "@/components/admin/form-styles";

export interface DestinationFormValues {
  slug: string;
  name: string;
  region: "North Pakistan" | "International";
  short_description: string;
  description: string;
  image_url: string;
  image_alt: string | null;
  highlights: string[];
  best_season: string | null;
  seo_title: string | null;
  seo_description: string | null;
}

export function DestinationForm({
  action,
  initial,
}: {
  action: (formData: FormData) => void;
  initial?: DestinationFormValues;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-5">
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
        <label className={labelClass}>Region</label>
        <select name="region" defaultValue={initial?.region ?? "North Pakistan"} className={inputClass}>
          <option value="North Pakistan">North Pakistan</option>
          <option value="International">International</option>
        </select>
      </div>

      <div className={fieldWrapClass}>
        <label className={labelClass}>Short description</label>
        <input name="shortDescription" defaultValue={initial?.short_description} required className={inputClass} />
      </div>

      <div className={fieldWrapClass}>
        <label className={labelClass}>Description</label>
        <textarea name="description" defaultValue={initial?.description} rows={4} required className={inputClass} />
      </div>

      <div className={fieldWrapClass}>
        <label className={labelClass}>Cover image</label>
        <ImageUploadField name="image" defaultValue={initial?.image_url} />
      </div>

      <div className={fieldWrapClass}>
        <label className={labelClass}>Image alt text</label>
        <input name="imageAlt" defaultValue={initial?.image_alt ?? ""} className={inputClass} />
      </div>

      <div className={fieldWrapClass}>
        <label className={labelClass}>Highlights (one per line)</label>
        <textarea
          name="highlights"
          defaultValue={initial?.highlights.join("\n")}
          rows={5}
          className={inputClass}
        />
      </div>

      <div className={fieldWrapClass}>
        <label className={labelClass}>Best season</label>
        <input name="bestSeason" defaultValue={initial?.best_season ?? ""} className={inputClass} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className={fieldWrapClass}>
          <label className={labelClass}>SEO title</label>
          <input name="seoTitle" defaultValue={initial?.seo_title ?? ""} className={inputClass} />
        </div>
        <div className={fieldWrapClass}>
          <label className={labelClass}>SEO description</label>
          <input name="seoDescription" defaultValue={initial?.seo_description ?? ""} className={inputClass} />
        </div>
      </div>

      <SubmitButton>{initial ? "Save changes" : "Create destination"}</SubmitButton>
    </form>
  );
}
