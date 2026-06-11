function initAos() {
  if (typeof AOS === 'undefined') return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    AOS.init({ disable: true });
    return;
  }

  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80,
  });
}

function refreshAos() {
  if (typeof AOS !== 'undefined') {
    AOS.refreshHard();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAos);
} else {
  initAos();
}

if (Shopify.designMode) {
  document.addEventListener('shopify:section:load', refreshAos);
  document.addEventListener('shopify:section:reorder', refreshAos);
}
