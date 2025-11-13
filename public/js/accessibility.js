class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.themeToggle?.addEventListener('click', () => this.toggleTheme());
        this.updateToggleButton();
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
        this.updateToggleButton();
    }

    updateToggleButton() {
        if (this.themeToggle) {
            const label = this.currentTheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode';
            this.themeToggle.textContent = this.currentTheme === 'light' ? 'Dark' : 'Light';
            this.themeToggle.setAttribute('aria-label', label);
        }
    }
}

class AccessibilityManager {
    constructor() {
        this.init();
    }

    init() {
        this.handleSkipLink();
        this.manageFocus();
    }

    handleSkipLink() {
        const skipLink = document.querySelector('.skip-link');
        skipLink?.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(skipLink.getAttribute('href'));
            target?.setAttribute('tabindex', '-1');
            target?.focus();
        });
    }

    manageFocus() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new AccessibilityManager();
});
