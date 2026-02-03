import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about booking, payments, visas, and custom trips with Sarerah Travel.",
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children;
}
