# Guia de Setup Local

Este guia descreve como configurar e rodar o **MeuSite** localmente em sua máquina para fins de desenvolvimento e manutenção.

---

## 🛠️ Pré-requisitos

Como se trata de um projeto frontend estático puro (sem frameworks pesados ou pré-processadores em tempo de execução), o ambiente local é extremamente leve e rápido de inicializar.

Você precisará de:
1.  **Editor de Código:** Recomendamos o [VS Code](https://code.visualstudio.com/).
2.  **Servidor Local (Recomendado):** A extensão **Live Server** (por Ritwick Dey) para o VS Code, ou qualquer servidor estático local (como o pacote `live-server` via npm). Isso garante o recarregamento automático (live reload) a cada alteração de código.

---

## 🚀 Passo a Passo

### 1. Clonar o Repositório
Abra o terminal e execute o comando abaixo para clonar o repositório para a sua máquina:
```bash
git clone <URL_DO_REPOSITORIO>
cd MyWebsite
```

### 2. Abrir no VS Code
Abra a pasta do projeto no seu editor:
```bash
code .
```

### 3. Iniciar o Servidor de Desenvolvimento
Para visualizar o site com recarregamento em tempo real:
1.  No VS Code, navegue até a pasta `src/` no explorador de arquivos.
2.  Clique com o botão direito sobre o arquivo [`src/index.html`](../../src/index.html).
3.  Selecione a opção **"Open with Live Server"**.
4.  O navegador abrirá automaticamente o endereço local (geralmente `http://127.0.0.1:5500/src/index.html`).

---

## 📂 Desenvolvimento e Boas Práticas

-   **Alterações de Código:** Todo o desenvolvimento ativo de novos layouts, componentes ou scripts deve ser feito dentro da pasta `/src/`.
-   **Estrutura CSS Modular:** Ao editar ou adicionar novos estilos, certifique-se de seguir a divisão em `/src/assets/css/` descrita no [Visão Geral da Arquitetura](../arquitetura/overview.md).
-   **Nomenclatura:** Lembre-se de criar classes, variáveis e IDs em inglês. Comentários explicativos devem ser em português do Brasil.
-   **Geração de Produção (`/dist`):** Após testar e validar o código dentro da pasta `/src/`, certifique-se de compilar ou copiar os arquivos atualizados para a pasta `/dist/` antes de comitar e fazer push para a branch `main` (consulte o [Guia de Deploy](deploy.md) para mais detalhes).
