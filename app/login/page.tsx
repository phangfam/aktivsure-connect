import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-sm px-4 py-16 sm:py-24">
      <div className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#c9a24b]">
          AktivSure Connect
        </p>
        <h1 className="mt-2 text-2xl font-bold text-[#0b1f3a]">Sign in</h1>
        <p className="mt-2 text-sm text-neutral-600">Dashboard access for AktivSure admins.</p>
      </div>

      <LoginForm />
    </div>
  );
}
