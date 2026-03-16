function getStatusLojaAgora() {
    // horário do Brasil (São Paulo) sem depender do fuso do PC do cliente
    const now = new Date();
    const sp = new Date(now.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));

    const day = sp.getDay(); // 0 dom .. 6 sáb
    const minutes = sp.getHours() * 60 + sp.getMinutes();

    // Seg–Qui: 07:00–17:45
    const segQui = minutes >= 7 * 60 && minutes <= (17 * 60 + 45);
    // Sex: 07:00–12:00
    const sex = minutes >= 7 * 60 && minutes <= 12 * 60;

    const aberto =
        (day >= 1 && day <= 4 && segQui) ||
        (day === 5 && sex);

    // Mensagem curta pro badge
    const label = aberto ? "Aberto agora" : "Fechado agora";
    // Subtexto opcional
    const hint =
        aberto ? "Atendimento em horário comercial" : "Fora do horário de atendimento";

    return { aberto, label, hint };
}
