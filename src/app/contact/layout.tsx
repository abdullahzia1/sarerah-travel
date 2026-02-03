import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Sarerah Travel via WhatsApp, phone, or email. We reply within hours.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
