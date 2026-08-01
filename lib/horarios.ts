export type StatusLoja = {
    aberto: boolean;
    label: string;
    hint: string;
};

export function getStatusLojaAgora(): StatusLoja {
    // horário do Brasil (São Paulo) sem depender do fuso do PC do cliente
    const now = new Date();
    const sp = new Date(now.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));

    const day = sp.getDay(); // 0 dom .. 6 sáb
    const minutes = sp.getHours() * 60 + sp.getMinutes();

    // Seg–Qui: 07:00–12:00 e 13:00–17:45 (fechado para almoço das 12:00 às 13:00)
    const manha = minutes >= 7 * 60 && minutes < 12 * 60;
    const almoco = minutes >= 12 * 60 && minutes < 13 * 60;
    const tarde = minutes >= 13 * 60 && minutes <= 17 * 60 + 45;
    // Sex: 07:00–12:00 (sem expediente à tarde)
    const sex = minutes >= 7 * 60 && minutes <= 12 * 60;

    const aberto =
        (day >= 1 && day <= 4 && (manha || tarde)) ||
        (day === 5 && sex);

    const label = aberto ? "Aberto agora" : "Fechado agora";

    let hint: string;
    if (aberto) {
        if (day === 5) {
            hint = "Aberto até 12:00";
        } else {
            hint = manha ? "Aberto até 12:00" : "Aberto até 17:45";
        }
    } else if (day >= 1 && day <= 4 && almoco) {
        hint = "Fechado para almoço • retorna às 13:00";
    } else if (minutes < 7 * 60 && day >= 1 && day <= 5) {
        hint = "Abre às 07:00";
    } else if (day >= 1 && day <= 3) {
        hint = "Retorna amanhã às 07:00";
    } else if (day === 4) {
        hint = "Retorna sexta às 07:00";
    } else {
        hint = "Retorna segunda às 07:00";
    }

    return { aberto, label, hint };
}
