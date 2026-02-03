import Link from "next/link";

const links = {
  trips: [
    { href: "/packages", label: "All Packages" },
    { href: "/destinations", label: "Destinations" },
    { href: "/plan", label: "Custom Trip" },
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/reviews", label: "Reviews" },
    { href: "/blog", label: "Blog" },
  ],
  support: [
    { href: "/contact", label: "Contact" },
    { href: "/faq", label: "FAQ" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="font-display text-xl font-bold text-stone-900">
              Sarerah Travel
            </Link>
            <p className="mt-3 max-w-xs text-sm text-stone-600">
              Luxury adventure at excellent value. North Pakistan & Asia — curated trips, seamless experience.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-stone-600">
              <a href="tel:+923001234567" className="link-underline hover:text-stone-900">
                +92 300 1234567
              </a>
              <a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline hover:text-stone-900"
              >
                WhatsApp
              </a>
              <a href="mailto:hello@sarerahtravel.com" className="link-underline hover:text-stone-900">
                hello@sarerahtravel.com
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-500">Trips</h3>
            <ul className="mt-3 space-y-2">
              {links.trips.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-underline text-sm text-stone-600 hover:text-stone-900">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-500">Company</h3>
            <ul className="mt-3 space-y-2">
              {links.company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-underline text-sm text-stone-600 hover:text-stone-900">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-500">Support</h3>
            <ul className="mt-3 space-y-2">
              {links.support.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-underline text-sm text-stone-600 hover:text-stone-900">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-stone-200 pt-8 text-center text-sm text-stone-500">
          © {new Date().getFullYear()} Sarerah Travel. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

