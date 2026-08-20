import LeadsTable from "@/components/LeadsTable";
import { getContacts } from "@/lib/data/contacts";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const contacts = await getContacts();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:py-16">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#c9a24b]">
          AktivSure Connect
        </p>
        <h1 className="mt-2 text-2xl font-bold text-[#0b1f3a] sm:text-3xl">
          Leads dashboard
        </h1>
        <p className="mt-2 text-sm text-neutral-600">
          {contacts.length} contact{contacts.length === 1 ? "" : "s"} captured.
        </p>
      </div>

      <LeadsTable contacts={contacts} />
    </div>
  );
}
