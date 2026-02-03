"use client";

import { useState } from "react";

export default function PlanPage() {
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
          destination: data.get("destination") || undefined,
          budget: data.get("budget") || undefined,
          dates: data.get("dates") || undefined,
          travelers: data.get("travelers") || undefined,
          message: data.get("message") || undefined,
          sourcePage: "plan",
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
    <div className="pb-24 md:pb-12">
      <div className="border-b border-stone-200 bg-white py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-bold text-stone-900 sm:text-4xl">
            Custom Trip Planner
          </h1>
          <p className="mt-2 text-stone-600">
            Tell us your preferences and we&apos;ll send a tailored itinerary and quote within 24 hours.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="block text-sm font-medium text-stone-700">Name *</span>
              <input
                type="text"
                name="name"
                required
                className="mt-1 w-full rounded-lg border border-stone-300 px-4 py-3 text-stone-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                placeholder="Your name"
              />
            </label>
            <label className="block">
              <span className="block text-sm font-medium text-stone-700">Phone *</span>
              <input
                type="tel"
                name="phone"
                required
                className="mt-1 w-full rounded-lg border border-stone-300 px-4 py-3 text-stone-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                placeholder="+92 300 1234567"
              />
            </label>
          </div>
          <label className="block">
            <span className="block text-sm font-medium text-stone-700">Email</span>
            <input
              type="email"
              name="email"
              className="mt-1 w-full rounded-lg border border-stone-300 px-4 py-3 text-stone-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              placeholder="you@example.com"
            />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-stone-700">Destination(s) of interest</span>
            <input
              type="text"
              name="destination"
              className="mt-1 w-full rounded-lg border border-stone-300 px-4 py-3 text-stone-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              placeholder="e.g. Hunza, Skardu, Thailand, Malaysia"
            />
          </label>
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="block text-sm font-medium text-stone-700">Preferred dates</span>
              <input
                type="text"
                name="dates"
                className="mt-1 w-full rounded-lg border border-stone-300 px-4 py-3 text-stone-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                placeholder="e.g. March 2025, or flexible"
              />
            </label>
            <label className="block">
              <span className="block text-sm font-medium text-stone-700">Number of travelers</span>
              <input
                type="text"
                name="travelers"
                className="mt-1 w-full rounded-lg border border-stone-300 px-4 py-3 text-stone-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                placeholder="e.g. 4 adults, 2 kids"
              />
            </label>
          </div>
          <label className="block">
            <span className="block text-sm font-medium text-stone-700">Budget (optional)</span>
            <input
              type="text"
              name="budget"
              className="mt-1 w-full rounded-lg border border-stone-300 px-4 py-3 text-stone-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              placeholder="e.g. 100k PKR per person, or USD"
            />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-stone-700">Message</span>
            <textarea
              name="message"
              rows={4}
              className="mt-1 w-full rounded-lg border border-stone-300 px-4 py-3 text-stone-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              placeholder="Trip type (adventure, family, honeymoon), special requests, etc."
            />
          </label>
          {status === "success" && (
            <div className="rounded-xl bg-teal-50 p-4 text-teal-800">
              Thanks! We&apos;ll get back to you within 24 hours.
            </div>
          )}
          {status === "error" && (
            <div className="rounded-xl bg-red-50 p-4 text-red-800">
              Something went wrong. Please try again.
            </div>
          )}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-full bg-teal-600 py-3.5 font-semibold text-white hover:bg-teal-700 disabled:opacity-70"
          >
            {status === "loading" ? "Sending…" : "Get my custom itinerary"}
          </button>
        </form>

      </div>
      <div className="h-20 md:hidden" aria-hidden />
    </div>
  );
}
