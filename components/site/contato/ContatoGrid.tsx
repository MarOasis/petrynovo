"use client";

function Card({
    label,
    title,
    text,
    headerRight,
    actionHref,
    actionText,
}: {
    label: string;
    title: string;
    text: React.ReactNode;        // <<< mudou aqui
    headerRight?: React.ReactNode; // <<< novo
    actionHref?: string;
    actionText?: string;
}) {
    return (
        <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-6 sm:p-7 shadow-[0_18px_60px_rgba(0,0,0,.35)] hover:bg-white/[0.07] transition">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-[11px] font-extrabold tracking-[0.26em] uppercase text-emerald-200/70">{label}</p>
                    <h3 className="mt-3 text-xl font-black tracking-tight">{title}</h3>
                </div>

                {headerRight ? <div className="pt-1">{headerRight}</div> : null}
            </div>

            <div className="mt-2 text-neutral-300 leading-relaxed">{text}</div>

            {actionHref && actionText && (
                <a
                    href={actionHref}
                    target={actionHref.startsWith("http") ? "_blank" : undefined}
                    rel={actionHref.startsWith("http") ? "noreferrer" : undefined}
                    className="mt-5 inline-flex rounded-2xl bg-black/30 ring-1 ring-white/10 px-4 py-2 text-sm font-extrabold text-white/85 hover:bg-black/40 transition"
                >
                    {actionText} →
                </a>
            )}
        </div>
    );
}

import { useEffect, useState } from "react";

type Status = { aberto: boolean; label: string; hint: string };

function getStatusLojaAgora(): Status {
    const now = new Date();
    const sp = new Date(now.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));

    const day = sp.getDay(); // 0 dom .. 6 sáb
    const minutes = sp.getHours() * 60 + sp.getMinutes();

    const segQui = minutes >= 7 * 60 && minutes <= (17 * 60 + 45);
    const sex = minutes >= 7 * 60 && minutes <= 12 * 60;

    const aberto =
        (day >= 1 && day <= 4 && segQui) ||
        (day === 5 && sex);

    return {
        aberto,
        label: aberto ? "Aberto agora" : "Fechado agora",
        hint: aberto ? "Atendimento em andamento" : "Fora do horário",
    };
}

function HorariosCard() {
    const [status, setStatus] = useState<Status | null>(null);

    useEffect(() => {
        const update = () => setStatus(getStatusLojaAgora());
        update();
        const id = window.setInterval(update, 30_000);
        return () => window.clearInterval(id);
    }, []);

    const badge = status ? (
        <span
            className={[
                "shrink-0 rounded-full px-3 py-1 text-[11px] font-extrabold tracking-[0.18em] uppercase",
                status.aberto
                    ? "bg-emerald-400/15 text-emerald-200 ring-1 ring-emerald-400/25"
                    : "bg-white/10 text-white/70 ring-1 ring-white/15",
            ].join(" ")}
        >
            {status.label}
        </span>
    ) : null;

    return (
        <Card
            label="Horários"
            title="Atendimento"
            headerRight={badge}
            text={
                <>
                    <p className="text-sm leading-relaxed">
                        <span className="inline-block whitespace-nowrap">Seg–Qui: 07:00–17:45</span>
                        <span className="mx-2 text-white/35">•</span>
                        <span className="inline-block whitespace-nowrap">Sex: 07:00–12:00</span>
                        <span className="mx-2 text-white/35">•</span>
                        <span className="inline-block whitespace-nowrap">Sáb/Dom: Fechado</span>
                    </p>

                    {status && <p className="mt-2 text-xs text-white/50">{status.hint}</p>}
                </>
            }
        />
    );
}

export default function ContatoGrid() {
    return (
        <section className="mt-10">
            <div className="grid gap-4 lg:grid-cols-3">
                <Card
                    label="WhatsApp"
                    title="Orçamento rápido"
                    text="Envie sua lista (linha + medidas) e retornamos com orientação e valores."
                    actionHref="https://wa.me/5547992866123"
                    actionText="Chamar no WhatsApp"
                />
                <Card
                    label="Endereço"
                    title="Visite a distribuidora"
                    text="Rua Ronco Dágua, 2201 Itinga, Joinville - SC, 89235-390"
                    actionHref="https://www.google.com/maps?q=Rua%20Ronco%20D%C3%A1gua%202201%20Itinga%20Joinville%20SC%2089235-390"
                    actionText="Abrir no Maps"
                />
                <HorariosCard />
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <Card
                    label="Telefones"
                    title="Fixo / Comercial"
                    text="(47) 38421-1734 • (47) 9 9286-6123"
                    actionHref="tel:+554738421734"
                    actionText="Ligar agora"
                />
                <Card
                    label="E-mail"
                    title="Atendimento / Financeiro"
                    text="Petry@petrydistribuidora.com.br"
                    actionHref="mailto:Petry@petrydistribuidora.com.br"
                    actionText="Enviar e-mail"
                />
            </div>
        </section>
    );
}
