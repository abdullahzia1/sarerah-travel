"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ViewportReveal } from "@/components/ui/animations";

export function LeadForm() {
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
          message: data.get("message") || undefined,
          sourcePage: "home_lead_form",
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
    <section className="bg-teal-700 py-16 md:py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <ViewportReveal variant="fadeInUp">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Get a custom itinerary in 15 minutes
          </h2>
          <p className="mt-2 text-teal-100">
            Share your preferences and we&apos;ll send a tailored plan and quote. No spam, no obligation.
          </p>
        </ViewportReveal>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="block text-sm font-medium text-teal-100">Name *</span>
              <input
                type="text"
                name="name"
                required
                className="mt-1 min-h-[44px] w-full rounded-lg border border-teal-600 bg-white/10 px-4 py-3 text-base text-white placeholder-teal-300 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
                placeholder="Your name"
              />
            </label>
            <label className="block">
              <span className="block text-sm font-medium text-teal-100">Phone *</span>
              <input
                type="tel"
                name="phone"
                required
                className="mt-1 min-h-[44px] w-full rounded-lg border border-teal-600 bg-white/10 px-4 py-3 text-base text-white placeholder-teal-300 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
                placeholder="+92 300 1234567"
              />
            </label>
          </div>
          <label className="block">
            <span className="block text-sm font-medium text-teal-100">Email</span>
            <input
              type="email"
              name="email"
              className="mt-1 min-h-[44px] w-full rounded-lg border border-teal-600 bg-white/10 px-4 py-3 text-base text-white placeholder-teal-300 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
              placeholder="you@example.com"
            />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-teal-100">Destination or trip idea</span>
            <input
              type="text"
              name="destination"
              className="mt-1 min-h-[44px] w-full rounded-lg border border-teal-600 bg-white/10 px-4 py-3 text-base text-white placeholder-teal-300 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
              placeholder="e.g. Hunza, Thailand, Skardu"
            />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-teal-100">Message</span>
            <textarea
              name="message"
              rows={3}
              className="mt-1 min-h-[80px] w-full rounded-lg border border-teal-600 bg-white/10 px-4 py-3 text-base text-white placeholder-teal-300 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
              placeholder="Dates, travelers, budget (optional)"
            />
          </label>
          <AnimatePresence mode="wait">
            {status === "success" && (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-lg bg-teal-600/50 p-3 text-sm text-white"
              >
                Thanks! We&apos;ll get back to you shortly.
              </motion.p>
            )}
            {status === "error" && (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-lg bg-red-500/30 p-3 text-sm text-white"
              >
                Something went wrong. Please try again.
              </motion.p>
            )}
          </AnimatePresence>
          <button
            type="submit"
            disabled={status === "loading"}
            className="smooth-tap min-h-[44px] w-full rounded-full bg-white py-3.5 font-semibold text-teal-800 transition-smooth hover:bg-teal-50 hover:shadow-md disabled:opacity-70"
          >
            {status === "loading" ? "Sending…" : "Get my itinerary"}
          </button>
        </form>
      </div>
    </section>
  );
}
