# Sistema de Design

Este documento descreve as especificações visuais, tokens de design e convenções estéticas do **MeuSite**. Ele serve como fonte de verdade para manter a consistência visual de toda a interface.

---

## 🎨 Paleta de Cores

O projeto opera estritamente sob um tema escuro e moderno, com foco na paleta de cores **Zinc** (tons de cinza profundos para fundos) e **Violeta** (destaques elegantes).

As variáveis CSS de cores estão declaradas em [`variables.css`](../../src/assets/css/01-base/variables.css).

### 1. Cores de Fundo
Usadas para criar profundidade e estrutura visual no layout Bento Grid.

| Token CSS | Hexadecimal | Exemplo Visual | Aplicação Recomendada |
| :--- | :--- | :--- | :--- |
| `--color-bg` | `#161619` | ◼ `#161619` | Fundo principal da página (mais escuro). |
| `--color-surface` | `#18181b` | ◼ `#18181b` | Fundo de cards, containers e blocos elevados. |
| `--color-surface-hover` | `#27272a` | ◼ `#27272a` | Destaque sutil ao passar o mouse (hover) sobre elementos de superfície. |
| `--color-surface-elevated` | `#27272a` | ◼ `#27272a` | Fundo de componentes sobrepostos como menus suspensos e modais. |

### 2. Cores de Destaque
Usadas para atrair a atenção do usuário, indicar interatividade (links, botões ativos) e dar o tom moderno da marca.

| Token CSS | Hexadecimal | Exemplo Visual | Aplicação Recomendada |
| :--- | :--- | :--- | :--- |
| `--color-primary` | `#8b5cf6` | 🟪 `#8b5cf6` | Cor roxa primária, aplicada em botões, links ativos e elementos principais. |
| `--color-secondary` | `#7c3aed` | 🟪 `#7c3aed` | Tom roxo mais escuro, usado em estados de hover ativos ou como parte de gradientes. |
| `--color-accent` | `#a78bfa` | 🟪 `#a78bfa` | Tom roxo mais claro, usado para efeitos de brilho, focos e destaques suaves. |

### 3. Cores de Texto
Garantem contraste adequado e excelente legibilidade sob o fundo escuro.

| Token CSS | Hexadecimal | Exemplo Visual | Aplicação Recomendada |
| :--- | :--- | :--- | :--- |
| `--color-text` | `#fafafa` | ⬜ `#fafafa` | Branco suave, reduz a fadiga ocular em leituras longas. Texto principal. |
| `--color-text-muted` | `#a1a1aa` | ◼ `#a1a1aa` | Cinza médio, ideal para descrições secundárias, metadados e legendas. |

### 4. Cores de Bordas
Utilizadas de forma extremamente sutil para delimitar os cards e botões.

| Token CSS | Valor | Aplicação Recomendada |
| :--- | :--- | :--- |
| `--color-border` | `rgba(255, 255, 255, 0.08)` | Borda padrão sutil e semi-transparente para cards. |
| `--color-border-hover` | `rgba(255, 255, 255, 0.15)` | Feedback visual mais visível em estados de interação. |

---

## 🔠 Tipografia

O site utiliza a fonte **Poppins** como sua fonte principal, integrada localmente para otimização de performance.

As regras de importação e estilização global estão definidas em [`typography.css`](../../src/assets/css/01-base/typography.css).

### Pesos de Fonte Disponíveis
- **300 (Light)**: Utilizado em elementos de design finos específicos.
- **400 (Regular / Normal)**: Corpo de texto geral, parágrafos e descrições.
- **500 (Medium)**: Itens de menu, pequenos títulos e botões secundários.
- **600 (SemiBold)**: Títulos de seção secundários e cards do Bento Grid.
- **700 (Bold)**: Títulos principais de páginas (`h1`, `h2`).
- **800 (ExtraBold)**: Grandiosos títulos de impacto e chamadas de destaque.

### Efeitos Especiais de Texto
- **Text Gradient**: Classe `.text-gradient` cria um gradiente fluído usando as cores de destaque do sistema (mistura de `--color-primary`, `--color-secondary` e `--color-accent`). Ideal para termos chave e cabeçalhos principais.

---

## 📐 Layout e Animações (Bento Grid)

Valores de dimensionamento que estruturam a interface limpa e harmônica do Bento Grid.

| Token CSS | Valor | Descrição |
| :--- | :--- | :--- |
| `--bento-gap` | `1.25rem` | Espaçamento uniforme padrão entre cada card do grid. |
| `--bento-radius` | `18px` | Arredondamento característico e moderno para cantos de cards e botões grandes. |
| `--transition-default` | `0.3s cubic-bezier(0.4, 0, 0.2, 1)` | Transição de tempo com suavização de aceleração física natural para todos os efeitos hover. |
