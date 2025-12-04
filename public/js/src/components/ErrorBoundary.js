import ErrorView from '../views/ErrorView.js';

export default class ErrorBoundary {
  constructor(rootSelector = '#app-root') {
    this.root = typeof rootSelector === 'string' ? document.querySelector(rootSelector) : rootSelector;
  }

  async wrap(fn) {
    try {
      // Support async or sync fn
      await fn();
    } catch (err) {
      this.renderFallback(err);
      console.error('Caught an error during initialization:', err);
    }
  }

  renderSafe(fn) {
    try {
      fn();
    } catch (err) {
      this.renderFallback(err);
      console.error('Render error caught by ErrorBoundary:', err);
    }
  }

  renderFallback(error) {
    if (this.root) {
      this.root.innerHTML = ErrorView.render(error ? String(error.message || error) : 'An unexpected error occurred');
      // Attach reload handler if present
      const btn = this.root.querySelector('#reloadAppBtn');
      if (btn) {
        btn.addEventListener('click', () => {
          try { location.reload(); } catch (e) { window.location.href = window.location.href; }
        });
      }
    }
  }
}
