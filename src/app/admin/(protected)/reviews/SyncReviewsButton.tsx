"use client";

import { useActionState } from "react";
import { runReviewsSync } from "./actions";
import { SubmitButton } from "@/components/admin/SubmitButton";

interface SyncState {
  message?: string;
  isError?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- useActionState requires this exact signature
async function syncAction(_prev: SyncState, _formData: FormData): Promise<SyncState> {
  const result = await runReviewsSync();
  return {
    message: result.ok ? `Synced ${result.count} reviews from Google.` : (result.error ?? "Sync failed."),
    isError: !result.ok,
  };
}

export function SyncReviewsButton() {
  const [state, formAction] = useActionState(syncAction, {});

  return (
    <form action={formAction} className="flex flex-wrap items-center gap-3">
      <SubmitButton>Sync from Google now</SubmitButton>
      {state.message && (
        <span className={`text-sm ${state.isError ? "text-red-600" : "text-stone-600"}`}>{state.message}</span>
      )}
    </form>
  );
}
