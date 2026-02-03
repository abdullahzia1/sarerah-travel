"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ViewportReveal } from "@/components/ui/animations";

const inputClass =
  "w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder:text-stone-400 transition-smooth focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20";

export default function ContactPage() {
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
          message: data.get("message"),
          sourcePage: "contact",
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
        <ViewportReveal className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-bold text-stone-900 sm:text-4xl">Contact Us</h1>
          <p className="mt-2 text-stone-600">
            Send a message, call, or email — we typically reply within a few hours.
          </p>
        </ViewportReveal>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2">
          <ViewportReveal delay={0.1}>
            <h2 className="font-display text-xl font-semibold text-stone-900">Get in touch</h2>
            <ul className="mt-4 space-y-4 text-stone-700">
              <li>
                <a href="tel:+923001234567" className="link-underline font-medium text-stone-900">
                  +92 300 1234567
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/923001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-stone-700 hover:text-stone-900"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="mailto:hello@sarerahtravel.com" className="link-underline font-medium text-stone-900">
                  hello@sarerahtravel.com
                </a>
              </li>
            </ul>
          </ViewportReveal>

          <ViewportReveal delay={0.15}>
            <h2 className="font-display text-xl font-semibold text-stone-900">Send a message</h2>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <label className="block">
                <span className="sr-only">Name</span>
                <input type="text" name="name" required placeholder="Name" className={inputClass} />
              </label>
              <label className="block">
                <span className="sr-only">Phone</span>
                <input type="tel" name="phone" required placeholder="Phone" className={inputClass} />
              </label>
              <label className="block">
                <span className="sr-only">Email</span>
                <input type="email" name="email" placeholder="Email" className={inputClass} />
              </label>
              <label className="block">
                <span className="sr-only">Your message</span>
                <textarea name="message" required rows={4} placeholder="Your message" className={inputClass} />
              </label>
              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-lg bg-teal-50 px-4 py-3 text-sm font-medium text-teal-800"
                  >
                    Message sent. We&apos;ll reply soon.
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-800"
                  >
                    Something went wrong. Please try again.
                  </motion.p>
                )}
              </AnimatePresence>
              <button
                type="submit"
                disabled={status === "loading"}
                className="smooth-tap w-full rounded-full bg-teal-600 py-3 font-semibold text-white transition-smooth hover:bg-teal-700 hover:shadow-md disabled:opacity-70"
              >
                {status === "loading" ? "Sending…" : "Send message"}
              </button>
            </form>
          </ViewportReveal>
        </div>
      </div>
      <div className="h-20 md:hidden" aria-hidden />
    </div>
  );
}
