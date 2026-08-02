"use client";

import { dangerButtonClass } from "./form-styles";

export function DeleteButton({ action, confirmText = "Delete this item?" }: { action: () => void; confirmText?: string }) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmText)) e.preventDefault();
      }}
    >
      <button type="submit" className={dangerButtonClass}>
        Delete
      </button>
    </form>
  );
}
