# Distribuidora de Alumínio — Next.js + Tailwind (Menu dinâmico)

## Como rodar
1. Abra a pasta no VS Code
2. No terminal:
   ```bash
   npm install
   npm run dev
   ```
3. Acesse: http://localhost:3000

## Personalizar rápido
- WhatsApp: `components/site/Header.tsx` e `app/(site)/contato/page.tsx` (troque `55SEUNUMERO`)
- Cores: `tailwind.config.ts`
- Textos/banners: `lib/site.ts`
- Páginas (itens do menu): `app/(site)/*`

## O que tem
- Header fixo + menu desktop e mobile
- Navegação sem recarregar (rotas do Next)
- Item ativo no menu
- Troca com animação (template)
- Hero com banners rotativos
