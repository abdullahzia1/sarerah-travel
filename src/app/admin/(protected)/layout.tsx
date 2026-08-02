import Link from "next/link";
import { LogoutButton } from "./LogoutButton";

// Admin pages are auth-gated and always read live data -- never prerender them.
export const dynamic = "force-dynamic";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/destinations", label: "Destinations" },
  { href: "/admin/packages", label: "Packages" },
  { href: "/admin/reviews", label: "Reviews" },
  { href: "/admin/settings", label: "Settings" },
  { href: "/admin/leads", label: "Leads" },
];

export default function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-50">
      <div className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-display text-lg font-bold text-stone-900">
              Sarerah Admin
            </Link>
            <nav className="hidden gap-4 md:flex">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-stone-600 hover:text-stone-900"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <LogoutButton />
        </div>
        <nav className="flex flex-wrap gap-3 border-t border-stone-100 px-4 py-2 md:hidden">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="text-xs font-medium text-stone-600 hover:text-stone-900">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
