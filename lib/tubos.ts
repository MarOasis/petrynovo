export type TuboRetangular = {
    codigo: string;
    a_mm: number; // lado maior
    b_mm: number; // lado menor
    e_mm: number; // espessura de parede
    a_pol?: string;
    b_pol?: string;
    e_pol?: string;
    kgPorBarra: number; // barra de 6m
    kgPorMetro: number;
};

export type TuboRedondo = {
    codigo: string;
    diametro_mm: number;
    e_mm: number;
    diametro_pol?: string;
    e_pol?: string;
    kgPorBarra: number;
    kgPorMetro: number;
};

export type TuboQuadrado = {
    codigo: string;
    lado_mm: number;
    e_mm: number;
    lado_pol?: string;
    e_pol?: string;
    kgPorBarra: number;
    kgPorMetro: number;
};

export const BARRA_METROS = 6;

export const TUBOS_RETANGULARES: TuboRetangular[] = [
    { codigo: "TG-074L", a_mm: 25.40, b_mm: 12.70, e_mm: 0.70, a_pol: "1", b_pol: "1/2", kgPorBarra: 0.834, kgPorMetro: 0.139 },
    { codigo: "TG-073F", a_mm: 50.80, b_mm: 25.40, e_mm: 0.70, a_pol: "2", b_pol: "1", e_pol: "1/32", kgPorBarra: 1.657, kgPorMetro: 0.276 },
    { codigo: "TG-015", a_mm: 50.80, b_mm: 12.70, e_mm: 0.90, a_pol: "2", b_pol: "1/2", kgPorBarra: 1.806, kgPorMetro: 0.301 },
    { codigo: "TG-020L", a_mm: 76.20, b_mm: 38.10, e_mm: 1.10, a_pol: "3", b_pol: "1.1/2", kgPorBarra: 4.008, kgPorMetro: 0.668 },
    { codigo: "TG-020P", a_mm: 76.20, b_mm: 38.10, e_mm: 3.05, a_pol: "3", b_pol: "1.1/2", kgPorBarra: 10.734, kgPorMetro: 1.789 },
    { codigo: "TUB-500", a_mm: 101.60, b_mm: 50.80, e_mm: 1.20, kgPorBarra: 5.868, kgPorMetro: 0.978 },
    { codigo: "TUB-512", a_mm: 101.60, b_mm: 50.80, e_mm: 2.00, kgPorBarra: 9.648, kgPorMetro: 1.608 },
    { codigo: "TG-155", a_mm: 150.00, b_mm: 50.00, e_mm: 2.20, kgPorBarra: 13.992, kgPorMetro: 2.332 },
    { codigo: "TG-156", a_mm: 150.00, b_mm: 50.00, e_mm: 1.50, kgPorBarra: 9.606, kgPorMetro: 1.601 },
    { codigo: "TG-175", a_mm: 150.00, b_mm: 75.00, e_mm: 1.80, kgPorBarra: 12.954, kgPorMetro: 2.159 },
    { codigo: "TG-200", a_mm: 150.00, b_mm: 100.00, e_mm: 2.00, kgPorBarra: 15.996, kgPorMetro: 2.666 },
    { codigo: "TG-210", a_mm: 200.00, b_mm: 100.00, e_mm: 3.00, kgPorBarra: 30.995, kgPorMetro: 5.165 },
    { codigo: "TG-250", a_mm: 200.00, b_mm: 50.00, e_mm: 2.00, kgPorBarra: 15.996, kgPorMetro: 2.666 },
    { codigo: "TG-285", a_mm: 280.00, b_mm: 50.00, e_mm: 3.18, kgPorBarra: 33.414, kgPorMetro: 5.569 },
    { codigo: "TG-280", a_mm: 280.00, b_mm: 140.00, e_mm: 3.50, kgPorBarra: 46.900, kgPorMetro: 7.816 },
    { codigo: "TG-350", a_mm: 350.00, b_mm: 50.00, e_mm: 3.18, kgPorBarra: 40.650, kgPorMetro: 6.775 },
];

export const TUBOS_REDONDOS: TuboRedondo[] = [
    { codigo: "TR-018", diametro_mm: 19.05, e_mm: 0.80, diametro_pol: "3/4", e_pol: "1/32", kgPorBarra: 0.738, kgPorMetro: 0.123 },
    { codigo: "TR-025", diametro_mm: 25.40, e_mm: 1.00, diametro_pol: "1", kgPorBarra: 1.248, kgPorMetro: 0.208 },
    { codigo: "TR-070", diametro_mm: 38.10, e_mm: 1.30, diametro_pol: "1.1/2", kgPorBarra: 2.442, kgPorMetro: 0.407 },
    { codigo: "TR-050", diametro_mm: 50.70, e_mm: 1.20, kgPorBarra: 3.042, kgPorMetro: 0.507 },
    { codigo: "TR-060", diametro_mm: 63.50, e_mm: 1.59, diametro_pol: "2.1/2", e_pol: "1/16", kgPorBarra: 5.004, kgPorMetro: 0.834 },
    { codigo: "TR-076", diametro_mm: 76.20, e_mm: 1.27, diametro_pol: "3", kgPorBarra: 4.860, kgPorMetro: 0.810 },
    { codigo: "TR-100", diametro_mm: 101.60, e_mm: 1.50, diametro_pol: "4", kgPorBarra: 7.656, kgPorMetro: 1.276 },
];

export const TUBOS_QUADRADOS: TuboQuadrado[] = [
    { codigo: "TQ-019", lado_mm: 19.05, e_mm: 1.59, lado_pol: "3/4", e_pol: "1/16", kgPorBarra: 2.010, kgPorMetro: 0.335 },
    { codigo: "TQ-009", lado_mm: 25.40, e_mm: 0.85, lado_pol: "1", e_pol: "1/32", kgPorBarra: 1.356, kgPorMetro: 0.226 },
    { codigo: "TQ-013", lado_mm: 38.10, e_mm: 0.80, lado_pol: "1.1/2", e_pol: "1/32", kgPorBarra: 1.932, kgPorMetro: 0.322 },
    { codigo: "TQ-055L", lado_mm: 50.80, e_mm: 1.30, lado_pol: "2", kgPorBarra: 4.182, kgPorMetro: 0.697 },
    { codigo: "TQ-076", lado_mm: 76.20, e_mm: 1.59, lado_pol: "3", e_pol: "1/16", kgPorBarra: 7.362, kgPorMetro: 1.227 },
    { codigo: "TQ-100", lado_mm: 100.00, e_mm: 2.00, kgPorBarra: 12.750, kgPorMetro: 2.125 },
    { codigo: "TQ-102", lado_mm: 100.00, e_mm: 1.50, e_pol: "1/16", kgPorBarra: 9.648, kgPorMetro: 1.608 },
];
