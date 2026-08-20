"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitContact, type SubmitContactState } from "@/lib/actions/submit-contact";
import ConsentCheckbox from "./ConsentCheckbox";
import type { LeadSource, Product } from "@/lib/data/types";

const initialState: SubmitContactState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-md bg-[#0b1f3a] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#12305c] disabled:opacity-60"
    >
      {pending ? "Submitting..." : "Register"}
    </button>
  );
}

export default function ContactForm({
  sources,
  products,
  sourceSlug,
}: {
  sources: LeadSource[];
  products: Product[];
  sourceSlug: string | null;
}) {
  const [state, formAction] = useActionState(submitContact, initialState);
  const matchedSource = sources.find((s) => s.slug === sourceSlug);

  if (state.status === "success") {
    return (
      <div className="rounded-lg border border-[#c9a24b]/40 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0b1f3a]">
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#c9a24b]" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-[#0b1f3a]">Registration received</h2>
        <p className="mt-2 text-sm text-neutral-600">
          Thank you — your product registration has been recorded. We&apos;ll be in
          touch if there&apos;s anything you need to know.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
      <input type="hidden" name="source_id" value={matchedSource?.id ?? ""} />

      {state.status === "error" && state.message && !state.fieldErrors && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{state.message}</p>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-neutral-700">
          Full name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-[#0b1f3a] focus:outline-none focus:ring-1 focus:ring-[#0b1f3a]"
        />
        {state.fieldErrors?.name && (
          <p className="mt-1 text-sm text-red-600">{state.fieldErrors.name}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-neutral-700">
            Phone number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="0123456789"
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-[#0b1f3a] focus:outline-none focus:ring-1 focus:ring-[#0b1f3a]"
          />
          {state.fieldErrors?.phone && (
            <p className="mt-1 text-sm text-red-600">{state.fieldErrors.phone}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-[#0b1f3a] focus:outline-none focus:ring-1 focus:ring-[#0b1f3a]"
          />
          {state.fieldErrors?.email && (
            <p className="mt-1 text-sm text-red-600">{state.fieldErrors.email}</p>
          )}
        </div>
      </div>
      <p className="-mt-3 text-xs text-neutral-500">Provide at least a phone number or an email.</p>

      <div>
        <label htmlFor="product_id" className="block text-sm font-medium text-neutral-700">
          Product
        </label>
        <select
          id="product_id"
          name="product_id"
          required
          defaultValue=""
          className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-[#0b1f3a] focus:outline-none focus:ring-1 focus:ring-[#0b1f3a]"
        >
          <option value="" disabled>
            Select a product
          </option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        {state.fieldErrors?.product_id && (
          <p className="mt-1 text-sm text-red-600">{state.fieldErrors.product_id}</p>
        )}
      </div>

      <ConsentCheckbox error={state.fieldErrors?.consent} />

      <SubmitButton />
    </form>
  );
}
