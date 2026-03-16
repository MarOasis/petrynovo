import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
    try {
        const apiKey = process.env.EXCHANGERATE_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: "Chave da ExchangeRate-API não configurada" },
                { status: 500 }
            );
        }

        const res = await fetch(
            `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`,
            {
                next: { revalidate: 3600 },
                headers: { Accept: "application/json" },
            }
        );

        const data = await res.json();

        if (!res.ok || data?.result !== "success") {
            return NextResponse.json(
                { error: "Falha ao buscar cotação", details: data },
                { status: 502 }
            );
        }

        const bid = Number(data?.conversion_rates?.BRL);

        if (!Number.isFinite(bid)) {
            return NextResponse.json(
                { error: "Resposta inválida da cotação" },
                { status: 502 }
            );
        }

        return NextResponse.json({
            bid,
            base: data?.base_code ?? "USD",
            timestamp: data?.time_last_update_unix ?? null,
            nextUpdate: data?.time_next_update_utc ?? null,
        });
    } catch (error) {
        console.error("Erro ao buscar cotação:", error);
        return NextResponse.json({ error: "Erro interno" }, { status: 500 });
    }
}