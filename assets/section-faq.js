if (!customElements.get('landing-faq-list')) {
  customElements.define(
    'landing-faq-list',
    class LandingFaqList extends HTMLElement {
      connectedCallback() {
        this.items = this.querySelectorAll('.landing-faq__item');
        this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        this.items.forEach((details) => {
          const summary = details.querySelector('summary');
          const content = details.querySelector('.landing-faq__answer');

          if (!summary || !content) return;

          if (details.hasAttribute('open')) {
            content.style.height = 'auto';
          }

          summary.addEventListener('click', (event) => {
            event.preventDefault();
            if (details.classList.contains('is-animating')) return;

            if (details.hasAttribute('open')) {
              this.close(details, content);
            } else {
              this.open(details, content);
            }
          });
        });
      }

      open(details, content) {
        if (this.reducedMotion) {
          details.setAttribute('open', '');
          content.style.height = 'auto';
          return;
        }

        details.setAttribute('open', '');
        details.classList.add('is-animating');

        content.style.overflow = 'hidden';
        content.style.height = '0px';

        window.requestAnimationFrame(() => {
          content.style.height = `${content.scrollHeight}px`;
        });

        content.addEventListener(
          'transitionend',
          (event) => {
            if (event.propertyName !== 'height') return;

            content.style.height = 'auto';
            content.style.overflow = '';
            details.classList.remove('is-animating');
          },
          { once: true }
        );
      }

      close(details, content) {
        if (this.reducedMotion) {
          details.removeAttribute('open');
          content.style.height = '';
          content.style.overflow = '';
          return;
        }

        details.classList.add('is-animating');

        content.style.overflow = 'hidden';
        content.style.height = `${content.scrollHeight}px`;

        window.requestAnimationFrame(() => {
          content.style.height = '0px';
        });

        content.addEventListener(
          'transitionend',
          (event) => {
            if (event.propertyName !== 'height') return;

            details.removeAttribute('open');
            content.style.height = '';
            content.style.overflow = '';
            details.classList.remove('is-animating');
          },
          { once: true }
        );
      }
    }
  );
}
