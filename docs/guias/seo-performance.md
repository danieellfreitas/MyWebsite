# Guia de SEO & Performance para Sites Estáticos

Como o **MeuSite** é uma aplicação puramente estática baseada em arquivos HTML, CSS e JavaScript puros, a velocidade de carregamento e a otimização para motores de busca (SEO) são os seus maiores diferenciais competitivos. 

Este guia cataloga as diretrizes de engenharia e boas práticas que devem ser mantidas ao estender ou modificar o código do site para garantir notas máximas em auditorias de qualidade (como o Google Lighthouse).

---

## 🔍 1. SEO (Search Engine Optimization) e Acessibilidade

Para garantir que o site seja facilmente indexado pelo Google e compartilhado de forma profissional em redes sociais, siga as regras abaixo nos cabeçalhos e estruturas HTML.

### A. Estrutura de Meta Tags Essenciais
Cada página HTML criada deve conter, obrigatoriamente, as seguintes tags dentro da seção `<head>`:
```html
<!-- Codificação e Responsividade -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Indexação e SEO Básico -->
<title>Título Único e Descritivo | Nome do Site</title>
<meta name="description" content="Uma descrição persuasiva e focada em palavras-chave de até 155 a 160 caracteres.">
<meta name="robots" content="index, follow">
```

### B. Protocolo Open Graph (Compartilhamento Social)
Garante que, ao compartilhar o link do site no WhatsApp, Slack, LinkedIn ou Twitter, um card visual com título, descrição e imagem de destaque seja gerado perfeitamente:
```html
<meta property="og:type" content="website">
<meta property="og:title" content="Título Altamente Atraente para Redes Sociais">
<meta property="og:description" content="Resumo rápido e chamativo do site.">
<meta property="og:image" content="https://seudominio.com.br/assets/img/brand/og-image.jpg">
<meta property="og:url" content="https://seudominio.com.br">
```

### C. Acessibilidade Semântica e Hierarquia de Conteúdo
-   **Uma Única Tag `<h1>` por Página:** Cada documento HTML deve possuir estritamente um único `<h1>` indicando o título principal. A hierarquia subsequente deve seguir sequencialmente (`<h2>`, `<h3>`, `<h4>`), sem pular níveis de cabeçalho.
-   **Atributo `alt` em Imagens:** Todas as tags `<img>` precisam conter o atributo `alt` com uma descrição curta da imagem para leitores de tela e robôs de busca. Se a imagem for puramente decorativa (ex: um ícone ou detalhe gráfico), use um atributo vazio `alt=""` ou declare-a como background-image no CSS.
-   **Elementos Semânticos HTML5:** Evite estruturar a página utilizando apenas divisões genéricas (`<div>`). Utilize elementos semânticos que informam o significado da área ao navegador:
    -   `<header>` para o cabeçalho superior e navegação principal.
    -   `<nav>` para blocos de links de navegação.
    -   `<main>` para o conteúdo principal da página.
    -   `<section>` para agrupar conteúdos relacionados tematicamente (ex: serviços, depoimentos).
    -   `<footer>` para o rodapé institucional.

---

## ⚡ 2. Otimização de Performance (Velocidade de Carregamento)

Um site rápido retém visitantes e é favorecido pelo algoritmo do Google. Siga estas diretrizes técnicas de otimização de performance.

### A. Otimização Avançada de Imagens
Imagens pesadas são a maior causa de lentidão em sites institucionais.
1.  **Formatos Modernos:** Utilize sempre arquivos no formato **`.webp`** ou **`.avif`** em vez de `.png` ou `.jpg`. Eles oferecem compressão sem perda perceptível de qualidade e chegam a ser até 80% mais leves.
2.  **Carregamento Preguiçoso (Lazy Loading):** Adicione o atributo `loading="lazy"` a todas as imagens que estão posicionadas abaixo da dobra inicial da página (a área que não é visível assim que o site carrega):
    ```html
    <img src="assets/img/portfolio/projeto-1.webp" alt="Demonstração do painel Bento Grid" loading="lazy">
    ```
3.  **Dimensões Explícitas:** Declare sempre as propriedades `width` e `height` diretamente nas tags `<img>` ou no CSS para evitar o efeito de CLS (Cumulative Layout Shift - elementos mudando de lugar conforme as mídias carregam).

### B. Carregamento Otimizado de Fontes (Poppins)
A fonte Poppins está integrada localmente no projeto. Para evitar o efeito de FOIT (Flash of Invisible Text) ou FOUT (Flash of Unstyled Text):
-   Certifique-se de que a regra `@font-face` no arquivo [`typography.css`](../../src/assets/css/01-base/typography.css) inclua a propriedade `font-display: swap;`. Isso instrui o navegador a exibir imediatamente uma fonte do sistema antes que o arquivo Poppins termine de baixar, garantindo que o texto seja legível de imediato.

### C. Scripts e Estilos Sem Bloqueio de Renderização
-   **CSS no `<head>`:** Mantenha os links de folhas de estilo estritamente no topo do documento para que o navegador renderize a página estilizada desde o primeiro instante.
-   **Javascript Não Bloqueante:** Scripts utilitários devem ser importados preferencialmente no final do arquivo HTML, antes do fechamento da tag `</body>`, ou no `<head>` com o atributo **`defer`** (que baixa o script em segundo plano e só o executa após a análise completa do HTML).
    ```html
    <script src="assets/js/main.js" defer></script>
    ```
