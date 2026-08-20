import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <div className="max-w-md space-y-6 text-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#c9a24b]">
            AktivSure
          </p>
          <h1 className="mt-2 text-3xl font-bold text-[#0b1f3a]">AktivSure Connect</h1>
          <p className="mt-2 text-sm text-neutral-600">
            Product registration and lead capture for AktivSure customers.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/capture"
            className="rounded-md bg-[#0b1f3a] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#12305c]"
          >
            Register a product
          </Link>
          <Link
            href="/dashboard"
            className="rounded-md border border-[#0b1f3a] px-5 py-2.5 text-sm font-semibold text-[#0b1f3a] hover:bg-neutral-50"
          >
            View leads dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
