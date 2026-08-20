"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/capture", label: "Capture Form" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/disclaimer", label: "Disclaimer" },
];

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="space-y-1">
      {NAV_ITEMS.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`block rounded-md px-3 py-2 text-sm font-medium transition ${
              active
                ? "bg-[#c9a24b] text-[#0b1f3a]"
                : "text-white/80 hover:bg-white/10 hover:text-white"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between bg-[#0b1f3a] px-4 py-3 md:hidden">
        <Link href="/" className="text-sm font-bold text-white">
          AktivSure <span className="text-[#c9a24b]">Connect</span>
        </Link>
        <button
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 text-white hover:bg-white/10"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </header>
      {open && (
        <div className="bg-[#0b1f3a] px-4 pb-4 md:hidden">
          <NavLinks pathname={pathname} onNavigate={() => setOpen(false)} />
        </div>
      )}

      <aside className="hidden w-56 shrink-0 bg-[#0b1f3a] px-4 py-6 md:block">
        <Link href="/" className="mb-6 block text-lg font-bold text-white">
          AktivSure <span className="text-[#c9a24b]">Connect</span>
        </Link>
        <NavLinks pathname={pathname} />
      </aside>
    </>
  );
}
