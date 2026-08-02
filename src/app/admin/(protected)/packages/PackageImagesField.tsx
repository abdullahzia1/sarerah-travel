"use client";

import { useState } from "react";
import { inputClass, secondaryButtonClass, dangerButtonClass } from "@/components/admin/form-styles";

interface PackageImage {
  url: string;
  alt?: string;
}

export function PackageImagesField({ initial }: { initial: PackageImage[] }) {
  const [images, setImages] = useState<PackageImage[]>(initial);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  function addImage() {
    setImages((prev) => [...prev, { url: "", alt: "" }]);
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  function updateImage(index: number, patch: Partial<PackageImage>) {
    setImages((prev) => prev.map((img, i) => (i === index ? { ...img, ...patch } : img)));
  }

  async function handleUpload(index: number, file: File) {
    setUploadingIndex(index);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      updateImage(index, { url: data.url });
    } catch (err) {
      alert(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploadingIndex(null);
    }
  }

  return (
    <div className="space-y-3">
      <input type="hidden" name="images" value={JSON.stringify(images.filter((img) => img.url))} />
      {images.map((img, i) => (
        <div key={i} className="flex items-center gap-3 rounded-lg border border-stone-200 p-3">
          {img.url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={img.url} alt="" className="h-12 w-12 shrink-0 rounded object-cover" />
          )}
          <div className="flex-1 space-y-2">
            <input
              type="text"
              value={img.url}
              onChange={(e) => updateImage(i, { url: e.target.value })}
              placeholder="Image URL"
              className={inputClass}
            />
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={img.alt ?? ""}
                onChange={(e) => updateImage(i, { alt: e.target.value })}
                placeholder="Alt text (optional)"
                className={inputClass}
              />
              <label className="shrink-0 cursor-pointer text-sm font-medium text-teal-700 hover:underline">
                {uploadingIndex === i ? "Uploading…" : "Upload"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={uploadingIndex !== null}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUpload(i, file);
                    e.target.value = "";
                  }}
                />
              </label>
            </div>
          </div>
          <button type="button" onClick={() => removeImage(i)} className={dangerButtonClass}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={addImage} className={secondaryButtonClass}>
        + Add image
      </button>
    </div>
  );
}
