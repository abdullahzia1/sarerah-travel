"use client";

import { useState } from "react";
import { inputClass, secondaryButtonClass, dangerButtonClass } from "@/components/admin/form-styles";

interface TrustBadge {
  label: string;
  sublabel?: string;
}

export function TrustBadgesField({ initial }: { initial: TrustBadge[] }) {
  const [badges, setBadges] = useState<TrustBadge[]>(initial);

  function addBadge() {
    setBadges((prev) => [...prev, { label: "", sublabel: "" }]);
  }

  function removeBadge(index: number) {
    setBadges((prev) => prev.filter((_, i) => i !== index));
  }

  function updateBadge(index: number, patch: Partial<TrustBadge>) {
    setBadges((prev) => prev.map((b, i) => (i === index ? { ...b, ...patch } : b)));
  }

  return (
    <div className="space-y-3">
      <input type="hidden" name="trustBadges" value={JSON.stringify(badges.filter((b) => b.label))} />
      {badges.map((badge, i) => (
        <div key={i} className="flex items-center gap-3">
          <input
            type="text"
            value={badge.label}
            onChange={(e) => updateBadge(i, { label: e.target.value })}
            placeholder="Label"
            className={inputClass}
          />
          <input
            type="text"
            value={badge.sublabel ?? ""}
            onChange={(e) => updateBadge(i, { sublabel: e.target.value })}
            placeholder="Sublabel (optional)"
            className={inputClass}
          />
          <button type="button" onClick={() => removeBadge(i)} className={dangerButtonClass}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={addBadge} className={secondaryButtonClass}>
        + Add badge
      </button>
    </div>
  );
}
