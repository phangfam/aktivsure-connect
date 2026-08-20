import Link from "next/link";

export default function ConsentCheckbox({ error }: { error?: string }) {
  return (
    <div>
      <label className="flex items-start gap-2 text-sm text-neutral-700">
        <input
          type="checkbox"
          name="consent"
          className="mt-1 h-4 w-4 rounded border-neutral-400 accent-[#0b1f3a]"
        />
        <span>
          I consent to AktivSure collecting and storing my contact details for
          product registration and follow-up, as described in the{" "}
          <Link href="/privacy" target="_blank" className="text-[#0b1f3a] underline">
            Privacy Policy
          </Link>
          .
        </span>
      </label>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
