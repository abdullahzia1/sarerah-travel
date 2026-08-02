"use client";

import { logout } from "./actions";
import { secondaryButtonClass } from "@/components/admin/form-styles";

export function LogoutButton() {
  return (
    <form action={logout}>
      <button type="submit" className={secondaryButtonClass}>
        Log out
      </button>
    </form>
  );
}
