/**
 * =============================================================
 * Gerenciador de Navegação e Filtros — Página de Serviços
 * =============================================================
 *
 * Este arquivo JavaScript controla duas funcionalidades
 * principais da página de Serviços:
 *
 * 1. NAVEGAÇÃO POR ABAS: Permite alternar entre as seções
 *    (Galeria de Sites, Serviços, Ferramentas, Consultoria)
 *    clicando nos botões da barra de navegação.
 *
 * 2. FILTROS DE CATEGORIA: Dentro da aba "Serviços de Software",
 *    permite filtrar os cards por tipo: "Todos", "Próprios"
 *    ou "Parceiros".
 *
 * Também gerencia a navegação por URL (hash), permitindo que
 * links diretos como "services.html#tools" abram a aba correta.
 */

// =============================================================
// Constantes Globais
// -------------------------------------------------------------
// Seletores CSS e nomes de classes usados em todo o código.
// Ficam aqui centralizados para facilitar a manutenção:
// se um nome de classe mudar, basta alterar em um único lugar.
// =============================================================

/** Nome da classe CSS que indica um elemento ativo/selecionado */
const activeClass = 'active';

/** Seletor CSS para os botões de navegação entre abas */
const navBtnSelector = '.nav-btn';

/** Seletor CSS para os botões de filtro de categoria */
const filterBtnSelector = '.filter-btn';

/** Seletor CSS para as seções de conteúdo (uma por aba) */
const serviceSectionSelector = '.service-section';

/** Seletor CSS para os cards de serviço filtráveis */
const serviceItemSelector = '.service-item';

// =============================================================
// Funções Auxiliares
// -------------------------------------------------------------
// Funções pequenas e reutilizáveis que são usadas pelas
// funções principais. Cada uma faz uma única tarefa simples.
// =============================================================

/**
 * Remove a classe "active" de todos os elementos que
 * correspondem ao seletor informado.
 *
 * Por exemplo: ao clicar em uma nova aba, precisamos
 * "desativar" todas as abas antes de ativar a nova.
 *
 * @param {string} selector - Seletor CSS dos elementos
 *                             (ex: '.nav-btn')
 */
function removeActiveFromAll(selector) {
    document.querySelectorAll(selector).forEach(element => {
        element.classList.remove(activeClass);
    });
}

/**
 * Esconde todas as seções de conteúdo da página.
 * Isso é feito antes de mostrar a seção selecionada,
 * garantindo que apenas uma seção fique visível por vez.
 */
function hideAllSections() {
    document.querySelectorAll(serviceSectionSelector).forEach(section => {
        section.classList.remove(activeClass);
    });
}

/**
 * Mostra uma seção específica, adicionando a classe "active".
 * No CSS, a classe "active" muda o display de "none" para
 * "block", tornando a seção visível.
 *
 * @param {string} sectionId - O ID da seção a ser exibida
 *                              (ex: 'gallery', 'tools')
 */
function showSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add(activeClass);
    }
}

/**
 * Filtra os cards de serviço pela categoria selecionada.
 *
 * Cada card de serviço possui um atributo "data-category"
 * no HTML (ex: data-category="own" ou data-category="partners").
 * Esta função compara o valor do filtro clicado com o
 * atributo de cada card e mostra/esconde conforme o resultado.
 *
 * @param {string} filterValue - Valor do filtro clicado
 *                                ('all', 'own' ou 'partners')
 */
function filterServices(filterValue) {
    document.querySelectorAll(serviceItemSelector).forEach(item => {
        const itemCategory = item.getAttribute('data-category');

        // Se o filtro for "all" (todos), mostra tudo.
        // Caso contrário, mostra apenas os que combinam com a categoria.
        if (filterValue === 'all' || itemCategory === filterValue) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// =============================================================
// Inicializadores de Funcionalidades
// -------------------------------------------------------------
// Funções que conectam os elementos do HTML aos comportamentos
// interativos (clique, filtro, etc.). São chamadas uma única
// vez quando a página termina de carregar.
// =============================================================

/**
 * Inicializa a navegação por abas.
 *
 * Para cada botão de aba (.nav-btn), adiciona um "ouvinte"
 * de clique que:
 * 1. Remove o destaque de todos os botões
 * 2. Destaca o botão clicado
 * 3. Esconde todas as seções
 * 4. Mostra a seção correspondente ao botão clicado
 */
function initNavigation() {
    document.querySelectorAll(navBtnSelector).forEach(button => {
        button.addEventListener('click', (e) => {
            // Lê o nome da aba a partir do atributo "data-tab" do botão
            const tabName = button.getAttribute('data-tab');

            // Desativa todos os botões e ativa apenas o clicado
            removeActiveFromAll(navBtnSelector);
            button.classList.add(activeClass);

            // Esconde todas as seções e mostra apenas a selecionada
            hideAllSections();
            showSection(tabName);
        });
    });
}

/**
 * Inicializa os filtros de categoria de serviços.
 *
 * Para cada botão de filtro (.filter-btn), adiciona um
 * "ouvinte" de clique que:
 * 1. Remove o destaque de todos os filtros
 * 2. Destaca o filtro clicado
 * 3. Filtra os cards mostrando apenas a categoria selecionada
 */
function initFilters() {
    document.querySelectorAll(filterBtnSelector).forEach(button => {
        button.addEventListener('click', (e) => {
            // Lê a categoria do atributo "data-filter" do botão
            const filterValue = e.target.getAttribute('data-filter');

            // Desativa todos os botões de filtro e ativa o clicado
            removeActiveFromAll(filterBtnSelector);
            e.target.classList.add(activeClass);

            // Aplica o filtro nos cards de serviço
            filterServices(filterValue);
        });
    });
}

// =============================================================
// Navegação por URL (Hash)
// -------------------------------------------------------------
// Permite que links como "services.html#tools" abram
// diretamente a aba correta. O "hash" é a parte da URL
// que vem depois do símbolo # (ex: #gallery, #consulting).
//
// Isso é usado pelos links do menu suspenso (dropdown) na
// página inicial, que apontam para abas específicas.
// =============================================================

/**
 * Verifica se a URL possui um hash e, se sim, abre a aba
 * correspondente automaticamente.
 *
 * Exemplo: se a URL for "services.html#tools", esta função
 * encontra o botão com data-tab="tools" e clica nele.
 * Depois, rola a página suavemente para o topo.
 */
function handleHashNavigation() {
    const hash = window.location.hash;
    if (hash) {
        // Remove o "#" do hash para obter o nome da aba
        const tabName = hash.substring(1);

        // Procura o botão de navegação que corresponde à aba
        const targetBtn = document.querySelector(`.nav-btn[data-tab="${tabName}"]`);
        if (targetBtn) {
            // Simula um clique no botão encontrado
            targetBtn.click();

            // Aguarda 100ms e rola suavemente para o topo da página
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);
        }
    }
}

/**
 * Função principal de inicialização.
 *
 * Chamada uma única vez quando o DOM (estrutura HTML) está
 * completamente carregado. Ativa todas as funcionalidades
 * interativas da página.
 */
function init() {
    // Ativa a navegação por abas
    initNavigation();

    // Ativa os filtros de categoria
    initFilters();

    // Verifica se a URL tem um hash e abre a aba correspondente
    handleHashNavigation();

    // Intercepta cliques em links do dropdown que apontam para
    // abas desta mesma página (ex: "services.html#gallery").
    // Em vez de recarregar a página, apenas troca a aba visível.
    document.querySelectorAll('a[href^="services.html#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // Impede o comportamento padrão (recarregar a página)
            e.preventDefault();

            // Extrai o hash do link e atualiza a URL sem recarregar
            const hash = this.getAttribute('href').split('#')[1];
            window.history.pushState(null, null, '#' + hash);

            // Navega para a aba correspondente
            handleHashNavigation();
        });
    });
}

// Escuta mudanças de hash na URL (ex: quando o usuário clica
// no botão "voltar" do navegador após trocar de aba)
window.addEventListener('hashchange', handleHashNavigation);

// Executa a função init() assim que a estrutura HTML estiver
// completamente carregada pelo navegador
document.addEventListener('DOMContentLoaded', init);
