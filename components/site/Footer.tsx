"use client";

import { heroDisplay, heroMono } from "@/lib/fonts";

const WHATSAPP = "5547992866123"; // ex: 5547999999999
const INSTAGRAM = "https://www.instagram.com/petry.distribuidora/";
const FACEBOOK = "https://facebook.com/";
const LINKEDIN = "https://linkedin.com/";
const X = "https://x.com/";

export default function Footer() {
  return (
    <footer
      id="site-footer"
      className={[heroDisplay.variable, heroMono.variable, "mt-14"].join(" ")}
    >
      <div className="relative overflow-hidden bg-hero-graphite ring-1 ring-hero-aluminum/10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_circle_at_50%_0%,rgba(201,169,97,.10),transparent_60%)]" />

        <div className="relative px-6 py-14 sm:px-10 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {/* coluna 1: marca */}
            <div>
              <div className="inline-flex items-center gap-3">
                <span className="h-10 w-10 rounded-2xl bg-hero-brass/15 ring-1 ring-hero-brass/25 grid place-items-center">
                  <span className="h-4 w-4 rounded-full bg-hero-brass shadow-[0_0_24px_rgba(201,169,97,.5)]" />
                </span>
                <div className="leading-tight">
                  <p className="font-display text-lg font-black tracking-tight text-hero-ivory">
                    PETRY DISTRIBUIDORA
                  </p>
                  <p className="text-xs font-semibold tracking-wide text-hero-aluminum">
                    Alumínios &amp; Acessórios
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm text-hero-aluminum leading-relaxed max-w-xs">
                Distribuição de alumínio e acessórios com padrão para Joinville e região.
              </p>
              <div className="mt-5 flex items-center gap-3">
                {/* <Social href={FACEBOOK} label="Facebook" icon={<IconFacebook />} /> */}
                {/* <Social href={X} label="X" icon={<IconX />} /> */}
                <Social href={INSTAGRAM} label="Instagram" icon={<IconInstagram />} />
                {/* <Social href={LINKEDIN} label="LinkedIn" icon={<IconLinkedIn />} /> */}
                <Social href={`https://wa.me/${WHATSAPP}`} label="WhatsApp" icon={<IconWhats />} />
              </div>
            </div>

            {/* coluna 2: navegação */}
            <div>
              <p className="font-mono-hero text-[11px] tracking-[0.15em] uppercase text-hero-brass mb-4">
                Navegação
              </p>
              <ul className="space-y-2.5 text-sm font-semibold text-hero-aluminum">
                <li>
                  <a className="hover:text-hero-ivory transition" href="/">
                    Início
                  </a>
                </li>
                <li>
                  <a className="hover:text-hero-ivory transition" href="/catalogos">
                    Catálogos
                  </a>
                </li>
                <li>
                  <a className="hover:text-hero-ivory transition" href="/produtos">
                    Produtos
                  </a>
                </li>
                <li>
                  <a className="hover:text-hero-ivory transition" href="/linhas">
                    Linhas
                  </a>
                </li>
                <li>
                  <a className="hover:text-hero-ivory transition" href="/servicos">
                    Serviços
                  </a>
                </li>
                <li>
                  <a className="hover:text-hero-ivory transition" href="/sobre">
                    Sobre
                  </a>
                </li>
                <li>
                  <a className="hover:text-hero-ivory transition" href="/contato">
                    Contato
                  </a>
                </li>
              </ul>
            </div>

            {/* coluna 3: contato */}
            <div>
              <p className="font-mono-hero text-[11px] tracking-[0.15em] uppercase text-hero-brass mb-4">
                Contato
              </p>
              <address className="not-italic text-sm text-hero-aluminum leading-relaxed">
                Rua Ronco Dágua, 2201
                <br />
                Itinga, Joinville - SC
                <br />
                89235-390
              </address>
              <a
                href="tel:+554738421734"
                className="mt-3 block text-sm text-hero-aluminum hover:text-hero-ivory transition"
              >
                (47) 3842-1734
              </a>
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noreferrer"
                className="block text-sm text-hero-aluminum hover:text-hero-ivory transition"
              >
                (47) 9 9286-6123
              </a>
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-bold text-neutral-950 hover:bg-emerald-400 transition"
              >
                Chamar no WhatsApp →
              </a>
            </div>
          </div>

          <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-hero-aluminum/15 to-transparent" />

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-hero-aluminum/70">
            <p>© {new Date().getFullYear()} PETRY — Todos os direitos reservados.</p>
            <div className="flex items-center gap-4">
              <a className="hover:text-hero-ivory transition" href="/contato">
                Suporte
              </a>
              <a className="hover:text-hero-ivory transition" href="/sobre">
                Empresa
              </a>
              <a
                className="hover:text-hero-ivory transition"
                href="https://atlaslabsbrasil.com.br"
                target="_blank"
                rel="noopener noreferrer"
              >
                Desenvolvido por Atlas Labs Brasil
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Social({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="h-10 w-10 rounded-2xl bg-white/5 ring-1 ring-hero-aluminum/15 grid place-items-center text-hero-aluminum hover:text-hero-ivory hover:bg-white/10 hover:ring-white/20 transition"
      title={label}
    >
      {icon}
    </a>
  );
}

/* Ícones (SVG) */
function IconFacebook() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.6 1.7-1.6h1.5V4.8c-.7-.1-1.6-.2-2.7-.2-2.7 0-4.5 1.6-4.5 4.6V11H7v3h2.5v8h4z" />
    </svg>
  );
}
function IconX() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.9 2H22l-6.8 7.8L23 22h-6.7l-5.2-6.7L5.3 22H2l7.3-8.4L1 2h6.8l4.7 6.1L18.9 2zm-1.2 18h1.7L7.2 3.9H5.4L17.7 20z" />
    </svg>
  );
}
function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm10 2H7a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3zm-5 4.2A3.8 3.8 0 1112 16a3.8 3.8 0 010-7.8zm0 2A1.8 1.8 0 1013.8 12 1.8 1.8 0 0012 10.2zM17.7 6.6a.9.9 0 11-.9.9.9.9 0 01.9-.9z" />
    </svg>
  );
}
function IconLinkedIn() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.9 6.7a2 2 0 11-2 2 2 2 0 012-2zM5.4 21H8.4V9.5H5.4V21zM10.2 9.5H13v1.6h.1a3.1 3.1 0 012.8-1.6c3 0 3.6 2 3.6 4.6V21h-3V15.4c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21h-3V9.5z" />
    </svg>
  );
}
function IconWhats() {
  return (
    <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M19.11 17.44c-.28-.14-1.66-.82-1.92-.91-.26-.1-.45-.14-.64.14-.19.28-.73.91-.9 1.1-.16.19-.33.21-.61.07-.28-.14-1.2-.44-2.28-1.4-.84-.75-1.4-1.68-1.56-1.96-.16-.28-.02-.43.12-.57.12-.12.28-.33.42-.49.14-.16.19-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.64-1.54-.88-2.11-.23-.55-.47-.47-.64-.48h-.55c-.19 0-.49.07-.75.35-.26.28-.99.97-.99 2.36s1.01 2.74 1.15 2.93c.14.19 2 3.05 4.84 4.27.68.29 1.21.46 1.62.59.68.22 1.31.19 1.8.12.55-.08 1.66-.68 1.9-1.34.23-.66.23-1.22.16-1.34-.07-.12-.26-.19-.54-.33zM16 3C8.83 3 3 8.83 3 16c0 2.28.61 4.51 1.77 6.48L3 29l6.7-1.74A12.94 12.94 0 0016 29c7.17 0 13-5.83 13-13S23.17 3 16 3zm0 23.5c-2.02 0-3.99-.54-5.7-1.57l-.41-.24-3.98 1.04 1.06-3.88-.27-.4A10.43 10.43 0 015.5 16C5.5 10.21 10.21 5.5 16 5.5S26.5 10.21 26.5 16 21.79 26.5 16 26.5z" />
    </svg>
  );
}
