type Shape = "retangular" | "quadrado" | "redondo";

type Props = {
    shape: Shape;
    a: number; // mm — largura (retangular/quadrado) ou diâmetro (redondo)
    b?: number; // mm — altura (retangular/quadrado, ausente em redondo)
    e: number; // mm — espessura de parede
    maxA: number; // mm — maior "a" da família, referência de escala
    size?: number; // px — lado do viewBox quadrado
    detailed?: boolean; // mostra cotas (A/B/E ou Ø)
    className?: string;
};

function fmt(n: number) {
    return Number.isInteger(n) ? String(n) : n.toFixed(2).replace(/0$/, "").replace(/\.$/, "");
}

const STROKE = "#AEB4B2"; // hero-aluminum
const COTA = "#C9A961"; // hero-brass

export default function TuboDiagramSVG({ shape, a, b, e, maxA, size = 160, detailed = false, className }: Props) {
    const pad = detailed ? Math.max(size * 0.24, 52) : size * 0.1;
    const avail = size - pad * 2;
    const scale = maxA > 0 ? avail / maxA : 1;
    const wallPx = Math.min(Math.max(e * scale, 1.5), 10);

    let shapeEl: React.ReactNode;
    let cotaEls: React.ReactNode = null;

    if (shape === "redondo") {
        const diameter = a * scale;
        const r = diameter / 2;
        const cx = size / 2;
        const cy = size / 2;

        shapeEl = (
            <circle
                cx={cx}
                cy={cy}
                r={Math.max(r - wallPx / 2, 1)}
                fill="none"
                stroke={STROKE}
                strokeWidth={wallPx}
            />
        );

        if (detailed) {
            const y = cy + r + pad * 0.5;
            cotaEls = (
                <g stroke={COTA} strokeWidth={1}>
                    <line x1={cx - r} y1={y} x2={cx + r} y2={y} />
                    <line x1={cx - r} y1={y - 4} x2={cx - r} y2={y + 4} />
                    <line x1={cx + r} y1={y - 4} x2={cx + r} y2={y + 4} />
                    <text
                        x={cx}
                        y={y + 16}
                        textAnchor="middle"
                        fontSize={11}
                        fill={COTA}
                        stroke="none"
                        className="font-mono-hero"
                    >
                        Ø {fmt(a)} mm
                    </text>
                </g>
            );
        }
    } else {
        const w = a * scale;
        const h = (b ?? a) * scale;
        const x = (size - w) / 2;
        const y = (size - h) / 2;

        shapeEl = (
            <rect
                x={x + wallPx / 2}
                y={y + wallPx / 2}
                width={Math.max(w - wallPx, 1)}
                height={Math.max(h - wallPx, 1)}
                fill="none"
                stroke={STROKE}
                strokeWidth={wallPx}
                rx={1}
            />
        );

        if (detailed) {
            const lineYTop = y - pad * 0.45;
            const lineXLeft = x - pad * 0.3;

            cotaEls = (
                <g stroke={COTA} strokeWidth={1}>
                    {/* cota A — topo */}
                    <line x1={x} y1={lineYTop} x2={x + w} y2={lineYTop} />
                    <line x1={x} y1={lineYTop - 4} x2={x} y2={lineYTop + 4} />
                    <line x1={x + w} y1={lineYTop - 4} x2={x + w} y2={lineYTop + 4} />
                    <text
                        x={x + w / 2}
                        y={lineYTop - 8}
                        textAnchor="middle"
                        fontSize={11}
                        fill={COTA}
                        stroke="none"
                        className="font-mono-hero"
                    >
                        A {fmt(a)}
                    </text>

                    {/* cota B — esquerda */}
                    <line x1={lineXLeft} y1={y} x2={lineXLeft} y2={y + h} />
                    <line x1={lineXLeft - 4} y1={y} x2={lineXLeft + 4} y2={y} />
                    <line x1={lineXLeft - 4} y1={y + h} x2={lineXLeft + 4} y2={y + h} />
                    <text
                        x={Math.max(lineXLeft - 6, 2)}
                        y={y + h / 2}
                        textAnchor="start"
                        dominantBaseline="middle"
                        fontSize={10}
                        fill={COTA}
                        stroke="none"
                        className="font-mono-hero"
                        transform={`rotate(-90, ${Math.max(lineXLeft - 6, 2)}, ${y + h / 2})`}
                    >
                        B {fmt(b ?? a)}
                    </text>

                    {/* cota E — centro */}
                    <text
                        x={x + w / 2}
                        y={y + h / 2}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize={10}
                        fill={COTA}
                        stroke="none"
                        className="font-mono-hero"
                    >
                        e {fmt(e)}
                    </text>
                </g>
            );
        }
    }

    return (
        <svg
            viewBox={`0 0 ${size} ${size}`}
            width="100%"
            height="100%"
            role="img"
            aria-label={`Diagrama do tubo ${shape}, ${fmt(a)}${b ? `×${fmt(b)}` : ""}mm`}
            className={className}
        >
            {shapeEl}
            {cotaEls}
        </svg>
    );
}
