"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login, type LoginState } from "@/lib/actions/auth";

const initialState: LoginState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-md bg-[#0b1f3a] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#12305c] disabled:opacity-60"
    >
      {pending ? "Signing in..." : "Sign in"}
    </button>
  );
}

export default function LoginForm() {
  const [state, formAction] = useActionState(login, initialState);

  return (
    <form action={formAction} className="space-y-5 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
      {state.status === "error" && state.message && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{state.message}</p>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-[#0b1f3a] focus:outline-none focus:ring-1 focus:ring-[#0b1f3a]"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-[#0b1f3a] focus:outline-none focus:ring-1 focus:ring-[#0b1f3a]"
        />
      </div>

      <SubmitButton />
    </form>
  );
}
