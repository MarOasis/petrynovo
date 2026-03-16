"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { nav } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const items = useMemo(
    () => nav.map((n) => ({ ...n, active: pathname === n.href })),
    [pathname]
  );

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/70 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8] py-4 flex items-center gap-4">
        <Link href="/" className="flex flex-col items-center">
          <img className="w-24 h-12 md:w-32 md:h-14" src="./banners/logo/logozin.png" alt="" />
          <div className="leading-tight">
            <p className="text-[14px] md:text-xl font-light text-center -mt-1 tracking-tight">DISTRIBUIDORA</p>
            <p className="text-[8px] md:text-xs text-[#FDFDFD] bg-[#01693A] lg:mb-1 -mt-0.2 p-1">Alumínios & Acessórios</p>
          </div>
        </Link>

        {/* desktop */}
        <nav className="ml-auto hidden lg:flex items-center gap-1">
          {items.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={[
                "px-3 py-2  text-sm font-semibold transition",
                n.active
                  ? "bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-500/25"
                  : "text-neutral-300 hover:text-white hover:bg-white/5",
              ].join(" ")}
            >
              {n.label}
            </Link>
          ))}
          <a
            className="ml-2 px-4 py-2  text-sm font-extrabold bg-[#01693A] text-[#FDFDFD] hover:bg-emerald-400 transition"
            href="https://wa.me/5547992866123"
            target="_blank"
            rel="noopener"
          >
            Orçar no WhatsApp
          </a>
        </nav>

        {/* mobile button */}
        <button
          className="ml-auto lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl bg-white/5 hover:bg-white/10 transition"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
        >
          <span className="text-xl">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-white/10 bg-neutral-950">
          <div className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-1">
            {items.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className={[
                  "px-3 py-3 rounded-xl text-sm font-semibold transition",
                  n.active ? "bg-emerald-500/15 text-emerald-200" : "text-neutral-200 hover:bg-white/5",
                ].join(" ")}
              >
                {n.label}
              </Link>
            ))}
            <a
              className="mt-2 px-4 py-3 rounded-xl text-sm font-extrabold bg-emerald-500 text-neutral-950 text-center"
              href="https://wa.me/55SEUNUMERO"
              target="_blank"
              rel="noopener"
            >
              Orçar no WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
