# Visão Geral da Arquitetura (Overview)

## O Projeto

O **MeuSite** é um projeto de frontend web moderno, projetado sob o padrão visual *Bento Grid*, operando primariamente no formato **Dark Theme**. O projeto não utiliza frameworks externos (como React ou Angular) ou bibliotecas pesadas de CSS (como Tailwind ou Bootstrap). Ele é estritamente construído com:

- **HTML5 Semântico**: Estrutura clara e acessível, favorecendo SEO e manutenção.
- **CSS3 Vanilla (Modular)**: Organizado seguindo princípios de arquitetura escalável e focado em propriedades customizadas (Variáveis CSS).
- **JavaScript Vanilla**: Usado pontualmente para pequenas interações de UI e manipulação do DOM.

## Estrutura do CSS (Arquitetura Modular)

A arquitetura de estilo adota uma separação rigorosa de responsabilidades dentro da pasta `assets/css/`:

1. **`01-base/`**:
   - Arquivos como `reset.css`, `variables.css` (tokens de design, paleta de cores Zinc/Violeta Moderno e tipografia) e estilos base para tags soltas.
2. **`02-layout/`**:
   - Classes estruturais que determinam o esqueleto da página (ex: containers, grid principal, header, footer).
3. **`03-components/`**:
   - Elementos isolados e reutilizáveis da interface, como `cards.css`, botões, modais e ícones SVG padronizados.
4. **`04-pages/`**:
   - Estilos altamente específicos atrelados unicamente a uma única página, como ajustes pontuais para a home ou para a tela `contact.html`.

Tudo é orquestrado de forma descentralizada e importado pelo HTML, resultando num site altamente performático sem necessidade de processadores em tempo de execução.

## Convenção de Código

- **Nomenclatura**: Todo o código (variáveis CSS, IDs, classes, atributos, manipulação de JS) é escrito **estritamente em Inglês**.
- **Documentação Interna**: Comentários explicativos, quando necessários no código, são mantidos em **Português do Brasil** para facilitar o entendimento de desenvolvedores locais.
