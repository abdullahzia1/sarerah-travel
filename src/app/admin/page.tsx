"use client";

import { useEffect, useState } from "react";

interface Lead {
  name: string;
  phone: string;
  email?: string;
  destination?: string;
  package?: string;
  budget?: string;
  dates?: string;
  travelers?: string;
  message?: string;
  sourcePage: string;
  timestamp: string;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
    const k = params.get("key") ?? "";
    setKey(k);
    if (!k) {
      setLoading(false);
      setError("Add ?key=YOUR_ADMIN_SECRET to the URL (set ADMIN_SECRET in .env for production).");
      return;
    }
    fetch(`/api/leads?key=${encodeURIComponent(k)}`)
      .then((r) => {
        if (!r.ok) throw new Error("Unauthorized");
        return r.json();
      })
      .then(setLeads)
      .catch(() => setError("Failed to load leads. Check your key."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-center">Loading…</div>;
  if (error) {
    return (
      <div className="mx-auto max-w-md p-8">
        <h1 className="font-display text-xl font-bold">Leads Admin</h1>
        <p className="mt-2 text-stone-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-2xl font-bold text-stone-900">Leads</h1>
      <p className="mt-1 text-stone-600">{leads.length} total</p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full border border-stone-200 text-left text-sm">
          <thead>
            <tr className="bg-stone-100">
              <th className="border-b border-stone-200 p-3 font-semibold">Time</th>
              <th className="border-b border-stone-200 p-3 font-semibold">Name</th>
              <th className="border-b border-stone-200 p-3 font-semibold">Phone</th>
              <th className="border-b border-stone-200 p-3 font-semibold">Email</th>
              <th className="border-b border-stone-200 p-3 font-semibold">Source</th>
              <th className="border-b border-stone-200 p-3 font-semibold">Destination / Package</th>
              <th className="border-b border-stone-200 p-3 font-semibold">Message</th>
            </tr>
          </thead>
          <tbody>
            {[...leads].reverse().map((lead, i) => (
              <tr key={i} className="border-b border-stone-100">
                <td className="p-3 text-stone-500">
                  {new Date(lead.timestamp).toLocaleString()}
                </td>
                <td className="p-3">{lead.name}</td>
                <td className="p-3">{lead.phone}</td>
                <td className="p-3">{lead.email ?? "—"}</td>
                <td className="p-3">{lead.sourcePage}</td>
                <td className="p-3">
                  {lead.destination ?? lead.package ?? "—"}
                </td>
                <td className="max-w-xs truncate p-3 text-stone-600" title={lead.message}>
                  {lead.message ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
