"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const mosaicPool = [
  { src: "/banners/servicos/separacao-org.jpeg", label: "Separação organizada" },
  { src: "/banners/servicos/estoque.jpeg", label: "Pronta entrega & alto giro" },
  { src: "/banners/servicos/rota.jpeg", label: "Rotas & agilidade" },
  // { src: "/servicos/atendimento.jpg", label: "Atendimento direto" },
];

const services = [
  {
    tag: "OBRA RÁPIDA",
    title: "Separação por pedido",
    desc: "Identificação, conferência e cuidado para reduzir erro e ganhar tempo na instalação.",
    bullets: ["Etiquetado por item", "Conferência antes de sair", "Organização por pedido"],
    image: "/banners/servicos/1.jpeg",
  },
  {
    tag: "PADRÃO DE MERCADO",
    title: "Suporte na escolha da linha",
    desc: "Compatibilidade, vedação, roldanas e alternativas equivalentes quando precisa resolver.",
    bullets: ["Indicação técnica", "Equivalentes de estoque", "Evita retrabalho"],
    image: "/banners/servicos/25.jpeg",
  },
  {
    tag: "ALTO GIRO",
    title: "Reposição e recorrência",
    desc: "Você não fica na mão quando o cliente pede “mais 2 barras” consistência no fornecimento.",
    bullets: ["Itens-chave priorizados", "Reposição constante", "Consistência de padrão"],
    image: "/banners/servicos/23.jpeg",
  },
  {
    tag: "SEM BUROCRACIA",
    title: "Atendimento direto no WhatsApp",
    desc: "Do orçamento ao pedido: simples, rápido e objetivo com acompanhamento do que importa.",
    bullets: ["Resposta ágil", "Lista e medidas", "Status do pedido"],
    image: "/banners/servicos/24.png",
  },
];

function WhatsCTA() {
  return (
    <a
      href="https://wa.me/5547992866123?text=Ol%C3%A1!%20Quero%20or%C3%A7ar%20perfis%20e%20acess%C3%B3rios."
      target="_blank"
      rel="noopener"
      className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-black text-black hover:brightness-110 transition"
    >
      Orçar no WhatsApp →
    </a>
  );
}

function ShotCard({
  src,
  label,
  className,
  priority,
}: {
  src: string;
  label: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={["group relative overflow-hidden rounded-3xl ring-1 ring-white/10 bg-black/30", className].join(" ")}>
      <Image
        src={src}
        alt={label}
        fill
        sizes="(max-width: 1024px) 100vw, 520px"
        className="object-cover transition duration-700 ease-out group-hover:scale-[1.04] cl-xfade-in"
        priority={!!priority}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
      <div className="pointer-events-none absolute inset-0 cl-grain opacity-[0.10]" />
      <div className="absolute left-4 bottom-4 inline-flex items-center rounded-full bg-black/55 ring-1 ring-white/10 px-3 py-1 text-[11px] font-extrabold tracking-[0.24em] uppercase text-white/85">
        {label}
      </div>
    </div>
  );
}

export default function ServicosPage() {
  // === auto-troca no mosaico (3 cards) ===
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick((v) => v + 1), 4200);
    return () => clearInterval(t);
  }, []);

  // escolhe 3 imagens “rodando”
  const shots = useMemo(() => {
    const a = mosaicPool[(tick + 0) % mosaicPool.length];
    const b = mosaicPool[(tick + 1) % mosaicPool.length];
    const c = mosaicPool[(tick + 2) % mosaicPool.length];
    return [a, b, c];
  }, [tick]);

  return (
    <main className="mt-10">
      {/* HERO com mosaico rotativo */}
      <section className="relative overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10 p-7 sm:p-10">
        <div className="pointer-events-none absolute inset-0 cl-hero-glow opacity-70" />
        <div className="pointer-events-none absolute inset-0 cl-grain opacity-[0.08]" />

        <div className="relative grid gap-6 lg:grid-cols-[1.05fr_.95fr] items-start">
          {/* texto */}
          <div>
            <p className="text-xs font-extrabold tracking-[0.22em] uppercase text-emerald-200/70">
              Serviços & suporte
            </p>
            <h1 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight">
              Atendimento que acelera a obra com padrão e previsibilidade
            </h1>
            <p className="mt-3 max-w-2xl text-sm sm:text-base text-neutral-300">
              Distribuição não é só preço: é prazo, consistência, separação correta e suporte técnico
              para você comprar certo e entregar acabamento superior.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {[
                "Orçamento rápido com alternativas",
                "Separação organizada e conferida",
                "Reposição constante de itens-chave",
              ].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full bg-black/40 ring-1 ring-white/10 px-4 py-2 text-[11px] font-extrabold tracking-[0.26em] uppercase text-white/80"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <WhatsCTA />
              <a
                href="/contato"
                className="inline-flex items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15 px-5 py-3 text-sm font-black text-white hover:bg-white/15 transition"
              >
                Falar com atendimento →
              </a>
            </div>
          </div>

          {/* mosaico (troca sozinho) */}
          <div className="grid gap-4">
            <ShotCard src={shots[0].src} label={shots[0].label} className="h-[210px] sm:h-[260px]" priority />
            <div className="grid grid-cols-2 gap-4">
              <ShotCard src={shots[1].src} label={shots[1].label} className="h-[170px] sm:h-[210px]" />
              <ShotCard src={shots[2].src} label={shots[2].label} className="h-[170px] sm:h-[210px]" />
            </div>
          </div>
        </div>
      </section>

      {/* cards com foto + selo glow */}
      <section className="mt-10 grid gap-4 sm:grid-cols-2">
        {services.map((s) => (
          <article
            key={s.title}
            className="relative overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10 p-6"
          >
            <div className="group relative mb-5 h-40 overflow-hidden rounded-2xl ring-1 ring-white/10 bg-black/30">
              <Image
                src={s.image}
                alt={s.title}
                fill
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover transition duration-700 ease-out group-hover:scale-[1.04] cl-xfade-in"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="pointer-events-none absolute inset-0 cl-grain opacity-[0.10]" />

              <div className="absolute left-4 bottom-4 inline-flex items-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-300/20 px-3 py-1 text-[11px] font-extrabold tracking-[0.24em] uppercase text-emerald-200 cl-glow-pulse">
                {s.tag}
              </div>
            </div>

            <h3 className="text-xl font-black">{s.title}</h3>
            <p className="mt-2 text-sm text-neutral-300">{s.desc}</p>

            <ul className="mt-4 space-y-2 text-sm text-white/85">
              {s.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </main>
  );
}
