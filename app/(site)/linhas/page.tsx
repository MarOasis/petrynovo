import LinhasPage from "@/components/site/linhas/LinhasPage";

export const metadata = {
    title: "Linhas | Petry Distribuidora",
    description:
        "Conheça as linhas e perfis que trabalhamos: Gold, Suprema, Fachada, Linha 25, cantoneiras, tubos, trilhos e muito mais.",
    alternates: { canonical: "/linhas" },
};

export default function Page() {
    return <LinhasPage />;
}
