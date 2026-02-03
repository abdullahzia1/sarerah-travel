"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home" },
  { href: "/packages", label: "Packages" },
  { href: "/destinations", label: "Destinations" },
  { href: "/about", label: "About" },
  { href: "/reviews", label: "Reviews" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur transition-shadow duration-300 supports-[backdrop-filter]:bg-white/80",
        scrolled ? "border-stone-200 shadow-sm" : "border-stone-200/80"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-xl font-bold tracking-tight text-stone-900 transition-opacity hover:opacity-90"
        >
          Sarerah Travel
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Main navigation">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative rounded-full px-3 py-2 text-sm font-medium transition-[color,background-color] duration-200 ease-out",
                pathname === item.href
                  ? "text-teal-800"
                  : "text-stone-600 hover:bg-stone-100 hover:text-stone-900 focus-visible:bg-stone-100"
              )}
            >
              {pathname === item.href && (
                <motion.span
                  layoutId="nav-focus-circle"
                  className="absolute inset-0 rounded-full bg-teal-100"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  aria-hidden
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/plan"
            className="rounded-full bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-[box-shadow,transform,background-color] duration-200 hover:bg-teal-700 hover:shadow-md focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
          >
            Plan trip
          </Link>
        </div>

        <motion.button
          type="button"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-stone-600 hover:bg-stone-100 md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          whileTap={{ scale: 0.92 }}
        >
          {open ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="overflow-hidden border-t border-stone-200 bg-white md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.65, 0, 0.35, 1] }}
          >
            <nav className="flex flex-col gap-1 px-4 py-4">
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * i, duration: 0.2 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-lg px-3 py-2.5 text-sm font-medium transition-smooth",
                      pathname === item.href ? "bg-teal-50 font-semibold text-teal-800" : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.2 }}
                className="mt-2"
              >
                <Link
                  href="/plan"
                  className="flex items-center justify-center rounded-full bg-teal-600 py-3 font-semibold text-white transition-smooth hover:bg-teal-700"
                  onClick={() => setOpen(false)}
                >
                  Plan trip
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

