export type Categoria =
    | "Esquadrias & Portas"
    | "Estrutural & Acabamento"
    | "Vidro & Temperados"
    | "Fachada & Externo"
    | "Diversos";

export type Linha = {
    nome: string;
    categoria: Categoria;
};

export const CATEGORIAS: { id: Categoria; label: string }[] = [
    { id: "Esquadrias & Portas", label: "Esquadrias" },
    { id: "Estrutural & Acabamento", label: "Estrutural" },
    { id: "Vidro & Temperados", label: "Vidro" },
    { id: "Fachada & Externo", label: "Fachada" },
    { id: "Diversos", label: "Outros" },
];

export const LINHAS: Linha[] = [
    // Esquadrias & Portas
    { nome: "Perfetta 35", categoria: "Esquadrias & Portas" },
    { nome: "Perfetta 40 - Porta Camarão", categoria: "Esquadrias & Portas" },
    { nome: "Perfetta 45", categoria: "Esquadrias & Portas" },
    { nome: "Perfetta 45 - Bicolor", categoria: "Esquadrias & Portas" },
    { nome: "Perfetta 45 - Oscilo Batente", categoria: "Esquadrias & Portas" },
    { nome: "Perfetta 45 - Maxim-ar e Fixo", categoria: "Esquadrias & Portas" },
    { nome: "Perfetta 45 - Porta de Giro", categoria: "Esquadrias & Portas" },
    { nome: "Perfetta 45 - Pivotante", categoria: "Esquadrias & Portas" },
    { nome: "Perfetta 55", categoria: "Esquadrias & Portas" },
    { nome: "Perfetta 75", categoria: "Esquadrias & Portas" },
    { nome: "Perfetta - Integrada", categoria: "Esquadrias & Portas" },
    { nome: "Perfetta - Complementos", categoria: "Esquadrias & Portas" },
    { nome: "Perfetta Minimalista", categoria: "Esquadrias & Portas" },
    { nome: "Linha 25", categoria: "Esquadrias & Portas" },
    { nome: "Linha Portas 25/32/42", categoria: "Esquadrias & Portas" },
    { nome: "Linha Basculante PETRY 25", categoria: "Esquadrias & Portas" },
    { nome: "Linha Suprema", categoria: "Esquadrias & Portas" },
    { nome: "Linha Suprema / Maxim-ar", categoria: "Esquadrias & Portas" },
    { nome: "Linha Gold", categoria: "Esquadrias & Portas" },
    { nome: "Linha Gold / Maxim-ar", categoria: "Esquadrias & Portas" },
    { nome: "Trilho Modular / Gold", categoria: "Esquadrias & Portas" },
    { nome: "Trilhos Únicos", categoria: "Esquadrias & Portas" },

    // Estrutural & Acabamento
    { nome: "Perfis 'U'", categoria: "Estrutural & Acabamento" },
    { nome: "Cantoneiras", categoria: "Estrutural & Acabamento" },
    { nome: "Barras Chatas", categoria: "Estrutural & Acabamento" },
    { nome: "Tubos Redondos", categoria: "Estrutural & Acabamento" },
    { nome: "Tubos Quadrados", categoria: "Estrutural & Acabamento" },
    { nome: "Tubos Retangulares", categoria: "Estrutural & Acabamento" },
    { nome: "Contramarcos e Conexões", categoria: "Estrutural & Acabamento" },
    { nome: "Arremates", categoria: "Estrutural & Acabamento" },

    // Vidro & Temperados
    { nome: "Vidro | Baguete | Gaxeta", categoria: "Vidro & Temperados" },
    { nome: "Box Temperado", categoria: "Vidro & Temperados" },
    { nome: "Temperados 8mm", categoria: "Vidro & Temperados" },
    { nome: "Temperados 10mm", categoria: "Vidro & Temperados" },
    { nome: "Pele de Vidro", categoria: "Vidro & Temperados" },
    { nome: "Pele de Vidro PVII", categoria: "Vidro & Temperados" },

    // Fachada & Externo
    { nome: "Brises", categoria: "Fachada & Externo" },
    { nome: "Cercas e Portões", categoria: "Fachada & Externo" },
    { nome: "Lambris", categoria: "Fachada & Externo" },
    { nome: "Ripados", categoria: "Fachada & Externo" },
    { nome: "Venezianas", categoria: "Fachada & Externo" },
    { nome: "Policarbonato", categoria: "Fachada & Externo" },
    { nome: "Gradil", categoria: "Fachada & Externo" },
    { nome: "Fachada Cortina", categoria: "Fachada & Externo" },

    // Diversos
    { nome: "Conexões", categoria: "Diversos" },
    { nome: "Diversos", categoria: "Diversos" },
];
