export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:py-16">
      <p className="text-xs font-semibold uppercase tracking-wider text-[#c9a24b]">
        AktivSure Connect
      </p>
      <h1 className="mt-2 text-2xl font-bold text-[#0b1f3a] sm:text-3xl">Privacy Policy</h1>
      <p className="mt-2 text-sm text-neutral-500">Version v1-2026-08</p>

      <div className="prose prose-sm mt-8 max-w-none space-y-6 text-sm leading-relaxed text-neutral-700">
        <section>
          <h2 className="text-base font-semibold text-[#0b1f3a]">What data we collect</h2>
          <p>
            When you register a product with AktivSure, we collect your full name, phone
            number and/or email address, the product you registered, and how you found us
            (e.g. a packing-insert QR code, our sign-up funnel, or a giveaway).
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[#0b1f3a]">Why we collect it</h2>
          <p>
            We use this information to confirm your product registration, provide warranty
            support, and contact you with updates related to the product you registered for.
            We do not use your data for any purpose you have not consented to.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[#0b1f3a]">How we store it</h2>
          <p>
            Your data is stored in a secured database with access restricted to authorised
            AktivSure personnel. We do not sell or share your data with third parties for
            marketing purposes. Every registration is logged with the timestamp and the
            version of this Privacy Policy you consented to.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[#0b1f3a]">Your rights</h2>
          <p>
            Under Malaysia&apos;s Personal Data Protection Act (PDPA), you have the right to:
          </p>
          <ul className="ml-5 list-disc space-y-1">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Withdraw consent for future contact at any time</li>
          </ul>
          <p className="mt-2">
            To exercise any of these rights, contact us at{" "}
            <a href="mailto:privacy@aktivsure.com" className="text-[#0b1f3a] underline">
              privacy@aktivsure.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[#0b1f3a]">Zero platform data</h2>
          <p>
            AktivSure does not import, scrape, or otherwise obtain your data from Shopee,
            Lazada, TikTok Shop, or any other marketplace. Every record in this system comes
            directly from you, with your explicit consent.
          </p>
        </section>
      </div>
    </div>
  );
}
