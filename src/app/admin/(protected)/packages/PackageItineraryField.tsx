"use client";

import { useState } from "react";
import { inputClass, secondaryButtonClass, dangerButtonClass } from "@/components/admin/form-styles";

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export function PackageItineraryField({ initial }: { initial: ItineraryDay[] }) {
  const [days, setDays] = useState<ItineraryDay[]>(initial.length > 0 ? initial : []);

  function addDay() {
    setDays((prev) => [...prev, { day: prev.length + 1, title: "", description: "" }]);
  }

  function removeDay(index: number) {
    setDays((prev) => prev.filter((_, i) => i !== index));
  }

  function updateDay(index: number, patch: Partial<ItineraryDay>) {
    setDays((prev) => prev.map((d, i) => (i === index ? { ...d, ...patch } : d)));
  }

  return (
    <div className="space-y-3">
      <input type="hidden" name="itinerary" value={JSON.stringify(days)} />
      {days.map((day, i) => (
        <div key={i} className="rounded-lg border border-stone-200 p-3">
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={day.day}
              onChange={(e) => updateDay(i, { day: Number(e.target.value) })}
              className={`${inputClass} w-20`}
              aria-label="Day number"
            />
            <input
              type="text"
              value={day.title}
              onChange={(e) => updateDay(i, { title: e.target.value })}
              placeholder="Title"
              className={inputClass}
            />
            <button type="button" onClick={() => removeDay(i)} className={dangerButtonClass}>
              Remove
            </button>
          </div>
          <textarea
            value={day.description}
            onChange={(e) => updateDay(i, { description: e.target.value })}
            placeholder="Description"
            rows={2}
            className={`${inputClass} mt-2`}
          />
        </div>
      ))}
      <button type="button" onClick={addDay} className={secondaryButtonClass}>
        + Add day
      </button>
    </div>
  );
}
