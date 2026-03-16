"use client";

import { useEffect, useMemo, useState } from "react";

const WHATSAPP = "5547992866123"; // ex: 5547999999999

export default function FloatingWhatsApp() {
    const [show, setShow] = useState(false);
    const [nearFooter, setNearFooter] = useState(false);

    const msg = useMemo(
        () =>
            encodeURIComponent(
                "Quero orçamento. Linha/Item: ____ | Medidas: ____ | Quantidade: ____ | Cidade: ____"
            ),
        []
    );

    // aparece após rolar um pouco
    useEffect(() => {
        const onScroll = () => setShow(window.scrollY > 160);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // some perto do rodapé
    useEffect(() => {
        const footer =
            document.getElementById("site-footer") || document.querySelector("footer");
        if (!footer) return;

        const io = new IntersectionObserver(
            ([entry]) => setNearFooter(entry.isIntersecting),
            { threshold: 0.01, rootMargin: "0px 0px -30% 0px" }
        );

        io.observe(footer);
        return () => io.disconnect();
    }, []);

    const visible = show && !nearFooter;

    return (
        <a
            href={`https://wa.me/${WHATSAPP}?text=${msg}`}
            target="_blank"
            rel="noreferrer"
            aria-label="Chamar no WhatsApp"
            className={[
                "fixed z-[60] bottom-5 right-5 lg:bottom-7 lg:right-7",
                "transition-all duration-300 ease-out",
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none",
            ].join(" ")}
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
            <div
                className={[
                    "h-14 w-14 rounded-2xl",
                    "bg-emerald-500 text-neutral-950",
                    "ring-1 ring-emerald-200/20",
                    "shadow-[0_18px_60px_rgba(16,185,129,.22)]",
                    "backdrop-blur",
                    "grid place-items-center",
                    "hover:bg-emerald-400 active:scale-[0.98] transition",
                ].join(" ")}
            >
                {/* Ícone WhatsApp (SVG) */}
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 32 32"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path d="M19.11 17.44c-.28-.14-1.66-.82-1.92-.91-.26-.1-.45-.14-.64.14-.19.28-.73.91-.9 1.1-.16.19-.33.21-.61.07-.28-.14-1.2-.44-2.28-1.4-.84-.75-1.4-1.68-1.56-1.96-.16-.28-.02-.43.12-.57.12-.12.28-.33.42-.49.14-.16.19-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.64-1.54-.88-2.11-.23-.55-.47-.47-.64-.48h-.55c-.19 0-.49.07-.75.35-.26.28-.99.97-.99 2.36s1.01 2.74 1.15 2.93c.14.19 2 3.05 4.84 4.27.68.29 1.21.46 1.62.59.68.22 1.31.19 1.8.12.55-.08 1.66-.68 1.9-1.34.23-.66.23-1.22.16-1.34-.07-.12-.26-.19-.54-.33zM16 3C8.83 3 3 8.83 3 16c0 2.28.61 4.51 1.77 6.48L3 29l6.7-1.74A12.94 12.94 0 0016 29c7.17 0 13-5.83 13-13S23.17 3 16 3zm0 23.5c-2.02 0-3.99-.54-5.7-1.57l-.41-.24-3.98 1.04 1.06-3.88-.27-.4A10.43 10.43 0 015.5 16C5.5 10.21 10.21 5.5 16 5.5S26.5 10.21 26.5 16 21.79 26.5 16 26.5z" />
                </svg>
            </div>
        </a>
    );
}
