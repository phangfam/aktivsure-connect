export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:py-16">
      <p className="text-xs font-semibold uppercase tracking-wider text-[#c9a24b]">
        AktivSure Connect
      </p>
      <h1 className="mt-2 text-2xl font-bold text-[#0b1f3a] sm:text-3xl">Disclaimer</h1>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-neutral-700">
        <p className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">
          Draft content — product claims below must be reviewed by our regulatory contact
          before this page is published live.
        </p>

        <section>
          <h2 className="text-base font-semibold text-[#0b1f3a]">Product information</h2>
          <p>
            Information provided about AktivSure products on this site is for general
            informational purposes related to product registration and warranty support
            only. It is not medical advice.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[#0b1f3a]">No medical claims</h2>
          <p>
            AktivSure products are not intended to diagnose, treat, cure, or prevent any
            disease. Consult a qualified healthcare professional before use, especially if
            you have an existing medical condition or are taking other medication.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[#0b1f3a]">Warranty registration</h2>
          <p>
            Registering a product through this form confirms your purchase details for
            warranty support purposes. It does not extend or alter the terms of any warranty
            provided at the point of sale.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[#0b1f3a]">14-day quality warranty</h2>
          <p>
            AktivSure covers the following issues if reported within <strong>14 days of
            receiving your tin</strong>:
          </p>
          <ul className="ml-5 list-disc space-y-1">
            <li>The tin arrived dented</li>
            <li>The milk powder is lumpy when opened (a sign the seal was compromised)</li>
            <li>The tin was already expired on arrival</li>
          </ul>
          <p className="mt-2">
            To make a claim within the 14-day window, contact us using the chat assistant on
            this site or email privacy@aktivsure.com with your registration details and a
            photo of the issue.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[#0b1f3a]">Registration gift</h2>
          <p>
            Customers who register their product receive a small token of appreciation from
            AktivSure. The exact gift is being finalized and will be confirmed at a later date.
          </p>
        </section>
      </div>
    </div>
  );
}
