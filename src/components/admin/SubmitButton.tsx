"use client";

import { useFormStatus } from "react-dom";
import { primaryButtonClass } from "./form-styles";

export function SubmitButton({ children, className }: { children: React.ReactNode; className?: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={className ?? primaryButtonClass}>
      {pending ? "Saving…" : children}
    </button>
  );
}
