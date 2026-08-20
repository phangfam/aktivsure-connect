import LeadsTable from "@/components/LeadsTable";
import { getContacts } from "@/lib/data/contacts";
import { logout } from "@/lib/actions/auth";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const contacts = await getContacts();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:py-16">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
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
        <form action={logout} className="flex items-center gap-3">
          {user?.email && <span className="text-sm text-neutral-500">{user.email}</span>}
          <button
            type="submit"
            className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
          >
            Sign out
          </button>
        </form>
      </div>

      <LeadsTable contacts={contacts} />
    </div>
  );
}
