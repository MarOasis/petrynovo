import { NextResponse } from "next/server";

export async function GET() {
    try {
        const url = "https://economia.awesomeapi.com.br/json/last/USD-BRL";

        const res = await fetch(url, {
            // atualiza “quase em tempo real” (na prática 1 min de cache sem key)
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            return NextResponse.json({ error: "Falha ao buscar cotação" }, { status: 502 });
        }

        const data = await res.json();
        const it = data?.USDBRL;

        const bid = Number(it?.bid);
        const pctChange = Number(it?.pctChange);
        const varBid = Number(it?.varBid);
        const high = Number(it?.high);
        const low = Number(it?.low);
        const timestamp = Number(it?.timestamp);

        if (!Number.isFinite(bid)) {
            return NextResponse.json({ error: "Resposta inválida da cotação" }, { status: 502 });
        }

        return NextResponse.json(
            { bid, pctChange, varBid, high, low, timestamp },
            {
                headers: {
                    "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
                },
            }
        );
    } catch {
        return NextResponse.json({ error: "Erro interno" }, { status: 500 });
    }
}
