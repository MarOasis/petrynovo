import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
    try {
        const apiKey = process.env.CURRENCYAPI_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: "Chave da currencyapi não configurada" },
                { status: 500 }
            );
        }

        const res = await fetch(
            "https://api.currencyapi.com/v3/latest?base_currency=USD&currencies=BRL",
            {
                headers: {
                    apikey: apiKey,
                    Accept: "application/json",
                },
                next: { revalidate: 60 },
            }
        );

        const data = await res.json();

        if (!res.ok) {
            console.error("currencyapi error:", data);

            return NextResponse.json(
                {
                    error: "Falha ao buscar cotação",
                    details: data,
                },
                { status: 502 }
            );
        }

        const bid = Number(data?.data?.BRL?.value);

        if (!Number.isFinite(bid)) {
            return NextResponse.json(
                {
                    error: "Resposta inválida da cotação",
                    raw: data,
                },
                { status: 502 }
            );
        }

        return NextResponse.json(
            {
                bid,
                code: "BRL",
                source: "currencyapi",
                lastUpdatedAt: data?.meta?.last_updated_at ?? null,
            },
            {
                headers: {
                    "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
                },
            }
        );
    } catch (error) {
        console.error("Erro ao buscar cotação:", error);

        return NextResponse.json(
            { error: "Erro interno" },
            { status: 500 }
        );
    }
}