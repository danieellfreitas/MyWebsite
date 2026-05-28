# Guia de Deploy & CI/CD

O deploy do **MeuSite** é totalmente automatizado. Graças à natureza estática do frontend, a publicação em produção não requer servidores complexos ou pipelines demoradas. 

O projeto conta com um fluxo de **Integração Contínua e Deploy Contínuo (CI/CD)** via GitHub Actions, estruturado para publicar os arquivos da pasta `/dist` diretamente na hospedagem da Hostinger.

---

## 🚀 O Fluxo de Deploy Automatizado (CI/CD)

Toda vez que alterações são enviadas (através de um `git push` ou merge de Pull Request) para a branch **`main`**, uma rotina automatizada do GitHub Actions entra em ação para atualizar o site em produção.

O comportamento da pipeline está definido no arquivo de configuração do repositório:
👉 [`.github/workflows/deploy.yml`](../../.github/workflows/deploy.yml)

### Como funciona internamente:
1.  **Gatilho:** O GitHub detecta um novo commit na branch `main`.
2.  **Checkout:** A máquina virtual temporária do GitHub baixa a versão mais recente do código.
3.  **Sincronização FTP:** O runner utiliza a action de deploy FTP (`SamKirkland/FTP-Deploy-Action`) para sincronizar a pasta local `./dist/` com o diretório público `./public_html/` hospedado nos servidores da **Hostinger**.
4.  **Conclusão:** O site é atualizado instantaneamente para todos os usuários sem downtime.

---

## 🔐 Configuração das Credenciais (Secrets)

Para que a pipeline consiga se conectar com segurança ao servidor da Hostinger sem expor senhas no código, o repositório do GitHub precisa de três variáveis secretas configuradas:

1.  **Acesse seu repositório no GitHub.**
2.  Vá em **Settings** (Configurações) > **Secrets and variables** (Segredos e variáveis) > **Actions**.
3.  Adicione as seguintes **Repository Secrets**:

| Nome do Segredo | Tipo | Descrição |
| :--- | :--- | :--- |
| `FTP_SERVER` | Host/IP | Endereço do host FTP fornecido pelo painel da Hostinger (ex: `ftp.meusite.com.br`). |
| `FTP_USERNAME` | Usuário | O nome de usuário do FTP criado no painel da Hostinger. |
| `FTP_PASSWORD` | Senha | A senha correspondente à conta de usuário FTP. |

---

## ⚠️ Pontos de Atenção Profissionais

> [!WARNING]
> **Apenas a pasta `/dist` é publicada:** O workflow de deploy está configurado para sincronizar estritamente o conteúdo contido no diretório `./dist/` (conforme definido na propriedade `local-dir: ./dist/` do arquivo YAML). Arquivos da pasta `/src` (código de desenvolvimento), documentação (pasta `docs/`) ou arquivos da raiz **não** são enviados para o servidor de produção.

> [!IMPORTANT]
> **Necessidade de Build/Cópia Local:** Como o workflow do GitHub Actions não executa processos de build no servidor da nuvem, você deve se certificar de gerar ou copiar os arquivos de produção para a pasta `/dist/` localmente e enviar (commit/push) a pasta `/dist/` atualizada para a branch `main`. Caso contrário, as alterações feitas em `/src` não refletirão em produção.

> [!TIP]
> **Evite deploys manuais:** Sempre que possível, evite realizar o upload de arquivos via clientes FTP manuais (como FileZilla). Isso previne a dessincronização entre o repositório Git (onde reside a verdade do código) e o servidor de produção, evitando conflitos ou perda acidental de alterações.
