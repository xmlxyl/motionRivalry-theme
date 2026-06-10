class LandingPageTabs extends HTMLElement {
  connectedCallback() {
    this.tabs = this.querySelectorAll('[data-tab]');
    this.panels = document.querySelectorAll('[data-tab-panel]');
    this.tabs.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const target = tab.dataset.tab;
        this.tabs.forEach((t) => t.classList.remove('is-active'));
        tab.classList.add('is-active');
        this.panels.forEach((panel) => {
          panel.hidden = panel.dataset.tabPanel !== target;
        });
        const section = document.getElementById(target);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }
}

customElements.define('landing-page-tabs', LandingPageTabs);
