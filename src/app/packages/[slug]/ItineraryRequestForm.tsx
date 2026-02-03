"use client";

import { useState } from "react";

export function ItineraryRequestForm({
  packageName,
  packageSlug,
}: {
  packageName: string;
  packageSlug: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email") || undefined,
          package: packageName,
          message: data.get("message") || undefined,
          sourcePage: `package_${packageSlug}`,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 max-w-md space-y-3">
      <input type="hidden" name="package" value={packageName} />
      <input
        type="text"
        name="name"
        required
        placeholder="Your name"
        className="min-h-[44px] w-full rounded-lg border border-stone-300 px-4 py-3 text-base text-stone-900"
      />
      <input
        type="tel"
        name="phone"
        required
        placeholder="Phone (with country code)"
        className="min-h-[44px] w-full rounded-lg border border-stone-300 px-4 py-3 text-base text-stone-900"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="min-h-[44px] w-full rounded-lg border border-stone-300 px-4 py-3 text-base text-stone-900"
      />
      <textarea
        name="message"
        rows={3}
        placeholder="Any questions or dates?"
        className="min-h-[80px] w-full rounded-lg border border-stone-300 px-4 py-3 text-base text-stone-900"
      />
      {status === "success" && (
        <p className="text-sm text-teal-700">Thanks! We&apos;ll send the itinerary soon.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="min-h-[44px] w-full rounded-full bg-teal-600 px-5 py-3 font-semibold text-white hover:bg-teal-700 disabled:opacity-70 sm:w-auto"
      >
        {status === "loading" ? "Sending…" : "Send itinerary request"}
      </button>
    </form>
  );
}
