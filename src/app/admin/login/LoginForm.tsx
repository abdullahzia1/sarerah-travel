"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { inputClass, labelClass, fieldWrapClass, primaryButtonClass } from "@/components/admin/form-styles";

const initialState: LoginState = {};

export function LoginForm({ from }: { from: string }) {
  const [state, formAction] = useActionState(login, initialState);

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <input type="hidden" name="from" value={from} />
      {state.error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-800">{state.error}</p>
      )}
      <div className={fieldWrapClass}>
        <label className={labelClass} htmlFor="username">
          Username
        </label>
        <input id="username" name="username" type="text" required autoFocus className={inputClass} />
      </div>
      <div className={fieldWrapClass}>
        <label className={labelClass} htmlFor="password">
          Password
        </label>
        <input id="password" name="password" type="password" required className={inputClass} />
      </div>
      <SubmitButton className={`${primaryButtonClass} w-full`}>Sign in</SubmitButton>
    </form>
  );
}
