import ContactForm from "@/components/ContactForm";
import { getLeadSources } from "@/lib/data/sources";
import { getProducts } from "@/lib/data/products";

export default async function CapturePage({
  searchParams,
}: {
  searchParams: Promise<{ source?: string }>;
}) {
  const { source } = await searchParams;
  const [sources, products] = await Promise.all([getLeadSources(), getProducts()]);

  return (
    <div className="mx-auto max-w-lg px-4 py-10 sm:py-16">
      <div className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#c9a24b]">
          AktivSure Product Registration
        </p>
        <h1 className="mt-2 text-2xl font-bold text-[#0b1f3a] sm:text-3xl">
          Register your product
        </h1>
        <p className="mt-2 text-sm text-neutral-600">
          Register for warranty coverage and updates on the product you purchased.
        </p>
        <p className="mt-3 inline-block rounded-full bg-[#c9a24b]/15 px-3 py-1 text-xs font-semibold text-[#0b1f3a]">
          Register now and receive a small token of appreciation from AktivSure
        </p>
      </div>

      <ContactForm sources={sources} products={products} sourceSlug={source ?? null} />

      <p className="mt-6 text-center text-xs text-neutral-500">
        By registering you agree to our{" "}
        <a href="/privacy" className="underline">
          Privacy Policy
        </a>{" "}
        and{" "}
        <a href="/disclaimer" className="underline">
          Disclaimer
        </a>
        .
      </p>
    </div>
  );
}
