# Conecta ONG — Projeto Front-end

Projeto acadêmico de Desenvolvimento Front-end para uma plataforma web de organizações do terceiro setor.

## Como executar

1. Extraia o arquivo ZIP.
2. Abra `index.html` no navegador.
3. Não é necessário servidor ou banco de dados para visualizar a interface.

## Estrutura

- `index.html` — estrutura semântica da página.
- `css/style.css` — Design System + estilos responsivos.
- `js/script.js` — menu mobile, dropdown acessível, formulário demonstrativo, toast e modal (com trap de foco).

## Design System

### Cores

**Primárias**
- `--color-primary-900: #164E3B`
- `--color-primary-700: #1F6B50`
- `--color-primary-500: #2F8F6B`
- `--color-primary-100: #E8F5EF`

**Secundárias**
- `--color-secondary-700: #B45309`
- `--color-secondary-500: #D97706`
- `--color-secondary-100: #FFF4E5`

**Acento**
- `--color-accent-500: #2563EB`
- `--color-accent-100: #EAF2FF`

**Feedback**
- `--color-success`, `--color-success-100`, `--color-success-500`
- `--color-danger`, `--color-danger-100`, `--color-danger-500`
- `--color-secondary-900` (hover do botão secundário e alerta de atenção)

**Neutras**
- `--color-neutral-950: #17201C`
- `--color-neutral-800: #34413B`
- `--color-neutral-600: #66736D`
- `--color-neutral-400: #A9B2AE`
- `--color-neutral-200: #DDE3E0`
- `--color-neutral-100: #F3F6F4`
- `--color-white: #FFFFFF`

### Tipografia

A interface utiliza a família Inter e uma escala hierárquica:
- XS: 12px
- SM: 14px
- MD: 16px
- LG: 20px
- XL: 28px
- 2XL: 40px
- 3XL: fluido com `clamp()` para o destaque principal

### Espaçamento

A escala modular parte de 4px:
`4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96px`.

Isso permite que margens, paddings e gaps sejam previsíveis e consistentes.

## Acessibilidade

- HTML semântico (`header`, `nav`, `main`, `section`, `article`, `footer`).
- Link "Pular para o conteúdo".
- Estados `:focus-visible` destacados.
- Botões e textos com contraste mínimo AA (botões usam `primary-700` e `secondary-700` com texto branco).
- Barras de progresso com `role="progressbar"` e valores acessíveis.
- Modal com foco inicial, trap de Tab, fechamento por Esc e retorno do foco ao botão de origem.
- Toast anunciado por `aria-live`, com o texto inserido apenas ao exibir.
- Dropdown controlado só por clique/teclado, com `aria-expanded` sempre fiel ao estado; fecha com Esc ou clique fora.
- Campos de formulário com `label`.
- Menu mobile com `aria-expanded` e `aria-controls`.
- Suporte a `prefers-reduced-motion`.
- Layout responsivo com Grid de 12 colunas e breakpoints em 480px, 576px, 768px, 1024px e 1440px.
- Menu mobile a partir de 768px, com dropdown, navegação por teclado e transições respeitando `prefers-reduced-motion`.

## Observação

Os projetos, números, organizações e formulário são dados fictícios para fins acadêmicos.

Links como "Apoiar projeto", "Sobre nós" e "Privacidade" apontam para âncoras da própria página e devem ser trocados pelas páginas reais quando existirem.