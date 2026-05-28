

const activeClass = 'active';

const navBtnSelector = '.nav-btn';

const filterBtnSelector = '.filter-btn';

const serviceSectionSelector = '.service-section';

const serviceItemSelector = '.service-item';

function removeActiveFromAll(selector) {
    document.querySelectorAll(selector).forEach(element => {
        element.classList.remove(activeClass);
    });
}

function hideAllSections() {
    document.querySelectorAll(serviceSectionSelector).forEach(section => {
        section.classList.remove(activeClass);
    });
}

function showSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add(activeClass);
    }
}

function filterServices(filterValue) {
    document.querySelectorAll(serviceItemSelector).forEach(item => {
        const itemCategory = item.getAttribute('data-category');

        
        
        if (filterValue === 'all' || itemCategory === filterValue) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function initNavigation() {
    document.querySelectorAll(navBtnSelector).forEach(button => {
        button.addEventListener('click', (e) => {
            
            const tabName = button.getAttribute('data-tab');

            
            removeActiveFromAll(navBtnSelector);
            button.classList.add(activeClass);

            
            hideAllSections();
            showSection(tabName);
        });
    });
}

function initFilters() {
    document.querySelectorAll(filterBtnSelector).forEach(button => {
        button.addEventListener('click', (e) => {
            
            const filterValue = e.target.getAttribute('data-filter');

            
            removeActiveFromAll(filterBtnSelector);
            e.target.classList.add(activeClass);

            
            filterServices(filterValue);
        });
    });
}

function handleHashNavigation() {
    const hash = window.location.hash;
    if (hash) {
        
        const tabName = hash.substring(1);

        
        const targetBtn = document.querySelector(`.nav-btn[data-tab="${tabName}"]`);
        if (targetBtn) {
            
            targetBtn.click();

            
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);
        }
    }
}

function init() {
    
    initNavigation();

    
    initFilters();

    
    handleHashNavigation();

    
    
    
    document.querySelectorAll('a[href^="services.html#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            
            e.preventDefault();

            
            const hash = this.getAttribute('href').split('#')[1];
            window.history.pushState(null, null, '#' + hash);

            
            handleHashNavigation();
        });
    });
}

window.addEventListener('hashchange', handleHashNavigation);

document.addEventListener('DOMContentLoaded', init);
