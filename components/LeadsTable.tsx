"use client";

import { useMemo, useState } from "react";
import type { ContactWithRelations } from "@/lib/data/types";

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-MY", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function LeadsTable({ contacts }: { contacts: ContactWithRelations[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return contacts;
    return contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.phone ?? "").toLowerCase().includes(q) ||
        (c.email ?? "").toLowerCase().includes(q),
    );
  }, [contacts, query]);

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or phone..."
          className="w-full max-w-sm rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-[#0b1f3a] focus:outline-none focus:ring-1 focus:ring-[#0b1f3a]"
        />
      </div>

      {contacts.length === 0 ? (
        <div className="rounded-lg border border-dashed border-neutral-300 bg-white p-12 text-center text-sm text-neutral-500">
          No contacts captured yet.
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-neutral-300 bg-white p-12 text-center text-sm text-neutral-500">
          No contacts match &quot;{query}&quot;.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-neutral-200 bg-white shadow-sm">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-[#0b1f3a] text-white">
              <tr>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Contact</th>
                <th className="px-4 py-3 font-semibold">Source</th>
                <th className="px-4 py-3 font-semibold">Product</th>
                <th className="px-4 py-3 font-semibold">Consent</th>
                <th className="px-4 py-3 font-semibold">Captured</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-t border-neutral-100">
                  <td className="px-4 py-3 font-medium text-neutral-900">{c.name}</td>
                  <td className="px-4 py-3 text-neutral-600">
                    {c.phone && <div>{c.phone}</div>}
                    {c.email && <div className="text-neutral-500">{c.email}</div>}
                  </td>
                  <td className="px-4 py-3 text-neutral-600">{c.lead_sources?.name ?? "—"}</td>
                  <td className="px-4 py-3 text-neutral-600">{c.products?.name ?? "—"}</td>
                  <td className="px-4 py-3">
                    {c.consent_given ? (
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                        {formatDate(c.consent_timestamp)}
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700">
                        No consent
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-neutral-500">{formatDate(c.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
