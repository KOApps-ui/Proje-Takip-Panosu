// UI Components and Utilities
class ComponentManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupThemeManager();
        this.setupToastManager();
        this.setupModalManager();
        this.setupUtils();
    }

    // Theme Management
    setupThemeManager() {
        window.themeManager = {
            themes: {
                light: {
                    name: 'Açık',
                    icon: 'fa-sun',
                    colors: {
                        background: '0 0% 100%',
                        foreground: '222.2 84% 4.9%',
                        card: '0 0% 100%',
                        'card-foreground': '222.2 84% 4.9%',
                        popover: '0 0% 100%',
                        'popover-foreground': '222.2 84% 4.9%',
                        primary: '221.2 83.2% 53.3%',
                        'primary-foreground': '210 40% 98%',
                        secondary: '210 40% 96%',
                        'secondary-foreground': '222.2 84% 4.9%',
                        muted: '210 40% 96%',
                        'muted-foreground': '215.4 16.3% 46.9%',
                        accent: '210 40% 96%',
                        'accent-foreground': '222.2 84% 4.9%',
                        destructive: '0 84.2% 60.2%',
                        'destructive-foreground': '210 40% 98%',
                        border: '214.3 31.8% 91.4%',
                        input: '214.3 31.8% 91.4%',
                        ring: '221.2 83.2% 53.3%'
                    }
                },
                dark: {
                    name: 'Koyu',
                    icon: 'fa-moon',
                    colors: {
                        background: '222.2 84% 4.9%',
                        foreground: '210 40% 98%',
                        card: '222.2 84% 4.9%',
                        'card-foreground': '210 40% 98%',
                        popover: '222.2 84% 4.9%',
                        'popover-foreground': '210 40% 98%',
                        primary: '217.2 91.2% 59.8%',
                        'primary-foreground': '222.2 84% 4.9%',
                        secondary: '217.2 32.6% 17.5%',
                        'secondary-foreground': '210 40% 98%',
                        muted: '217.2 32.6% 17.5%',
                        'muted-foreground': '215 20.2% 65.1%',
                        accent: '217.2 32.6% 17.5%',
                        'accent-foreground': '210 40% 98%',
                        destructive: '0 62.8% 30.6%',
                        'destructive-foreground': '210 40% 98%',
                        border: '217.2 32.6% 17.5%',
                        input: '217.2 32.6% 17.5%',
                        ring: '224.3 76.3% 94.1%'
                    }
                },
                ocean: {
                    name: 'Okyanus',
                    icon: 'fa-water',
                    colors: {
                        background: '210 40% 98%',
                        foreground: '210 25% 11%',
                        card: '210 40% 96%',
                        'card-foreground': '210 25% 11%',
                        popover: '210 40% 96%',
                        'popover-foreground': '210 25% 11%',
                        primary: '211 70% 45%',
                        'primary-foreground': '210 40% 98%',
                        secondary: '211 32% 85%',
                        'secondary-foreground': '210 25% 11%',
                        muted: '211 32% 85%',
                        'muted-foreground': '210 16% 45%',
                        accent: '211 32% 85%',
                        'accent-foreground': '210 25% 11%',
                        destructive: '0 84% 60%',
                        'destructive-foreground': '210 40% 98%',
                        border: '211 32% 85%',
                        input: '211 32% 85%',
                        ring: '211 70% 45%'
                    }
                },
                forest: {
                    name: 'Orman',
                    icon: 'fa-tree',
                    colors: {
                        background: '120 30% 96%',
                        foreground: '120 20% 15%',
                        card: '120 30% 94%',
                        'card-foreground': '120 20% 15%',
                        popover: '120 30% 94%',
                        'popover-foreground': '120 20% 15%',
                        primary: '142 70% 35%',
                        'primary-foreground': '120 30% 96%',
                        secondary: '120 25% 85%',
                        'secondary-foreground': '120 20% 15%',
                        muted: '120 25% 85%',
                        'muted-foreground': '120 15% 45%',
                        accent: '120 25% 85%',
                        'accent-foreground': '120 20% 15%',
                        destructive: '0 84% 60%',
                        'destructive-foreground': '120 30% 96%',
                        border: '120 25% 85%',
                        input: '120 25% 85%',
                        ring: '142 70% 35%'
                    }
                },
                sunset: {
                    name: 'Gün Batımı',
                    icon: 'fa-sun',
                    colors: {
                        background: '25 80% 97%',
                        foreground: '25 60% 15%',
                        card: '25 80% 95%',
                        'card-foreground': '25 60% 15%',
                        popover: '25 80% 95%',
                        'popover-foreground': '25 60% 15%',
                        primary: '15 80% 50%',
                        'primary-foreground': '25 80% 97%',
                        secondary: '25 60% 85%',
                        'secondary-foreground': '25 60% 15%',
                        muted: '25 60% 85%',
                        'muted-foreground': '25 40% 45%',
                        accent: '25 60% 85%',
                        'accent-foreground': '25 60% 15%',
                        destructive: '0 84% 60%',
                        'destructive-foreground': '25 80% 97%',
                        border: '25 60% 85%',
                        input: '25 60% 85%',
                        ring: '15 80% 50%'
                    }
                },
                purple: {
                    name: 'Mor',
                    icon: 'fa-palette',
                    colors: {
                        background: '270 30% 96%',
                        foreground: '270 20% 15%',
                        card: '270 30% 94%',
                        'card-foreground': '270 20% 15%',
                        popover: '270 30% 94%',
                        'popover-foreground': '270 20% 15%',
                        primary: '280 60% 50%',
                        'primary-foreground': '270 30% 96%',
                        secondary: '270 25% 85%',
                        'secondary-foreground': '270 20% 15%',
                        muted: '270 25% 85%',
                        'muted-foreground': '270 15% 45%',
                        accent: '270 25% 85%',
                        'accent-foreground': '270 20% 15%',
                        destructive: '0 84% 60%',
                        'destructive-foreground': '270 30% 96%',
                        border: '270 25% 85%',
                        input: '270 25% 85%',
                        ring: '280 60% 50%'
                    }
                },
                rose: {
                    name: 'Gül',
                    icon: 'fa-spa',
                    colors: {
                        background: '330 30% 96%',
                        foreground: '330 20% 15%',
                        card: '330 30% 94%',
                        'card-foreground': '330 20% 15%',
                        popover: '330 30% 94%',
                        'popover-foreground': '330 20% 15%',
                        primary: '340 70% 50%',
                        'primary-foreground': '330 30% 96%',
                        secondary: '330 25% 85%',
                        'secondary-foreground': '330 20% 15%',
                        muted: '330 25% 85%',
                        'muted-foreground': '330 15% 45%',
                        accent: '330 25% 85%',
                        'accent-foreground': '330 20% 15%',
                        destructive: '0 84% 60%',
                        'destructive-foreground': '330 30% 96%',
                        border: '330 25% 85%',
                        input: '330 25% 85%',
                        ring: '340 70% 50%'
                    }
                },
                cyberpunk: {
                    name: 'Cyberpunk',
                    icon: 'fa-robot',
                    colors: {
                        background: '280 20% 10%',
                        foreground: '180 100% 90%',
                        card: '280 25% 12%',
                        'card-foreground': '180 100% 90%',
                        popover: '280 25% 12%',
                        'popover-foreground': '180 100% 90%',
                        primary: '180 100% 50%',
                        'primary-foreground': '280 20% 10%',
                        secondary: '280 30% 20%',
                        'secondary-foreground': '180 100% 90%',
                        muted: '280 30% 20%',
                        'muted-foreground': '180 80% 70%',
                        accent: '180 100% 30%',
                        'accent-foreground': '280 20% 10%',
                        destructive: '0 100% 70%',
                        'destructive-foreground': '280 20% 10%',
                        border: '180 100% 30%',
                        input: '280 30% 20%',
                        ring: '180 100% 50%'
                    }
                },
                minimal: {
                    name: 'Minimal',
                    icon: 'fa-circle',
                    colors: {
                        background: '0 0% 100%',
                        foreground: '0 0% 20%',
                        card: '0 0% 98%',
                        'card-foreground': '0 0% 20%',
                        popover: '0 0% 98%',
                        'popover-foreground': '0 0% 20%',
                        primary: '0 0% 40%',
                        'primary-foreground': '0 0% 100%',
                        secondary: '0 0% 95%',
                        'secondary-foreground': '0 0% 20%',
                        muted: '0 0% 95%',
                        'muted-foreground': '0 0% 50%',
                        accent: '0 0% 90%',
                        'accent-foreground': '0 0% 20%',
                        destructive: '0 100% 50%',
                        'destructive-foreground': '0 0% 100%',
                        border: '0 0% 90%',
                        input: '0 0% 95%',
                        ring: '0 0% 40%'
                    }
                },
                vintage: {
                    name: 'Antika',
                    icon: 'fa-hourglass-half',
                    colors: {
                        background: '45 40% 95%',
                        foreground: '30 30% 25%',
                        card: '45 40% 92%',
                        'card-foreground': '30 30% 25%',
                        popover: '45 40% 92%',
                        'popover-foreground': '30 30% 25%',
                        primary: '35 60% 45%',
                        'primary-foreground': '45 40% 95%',
                        secondary: '45 35% 85%',
                        'secondary-foreground': '30 30% 25%',
                        muted: '45 35% 85%',
                        'muted-foreground': '30 25% 45%',
                        accent: '45 35% 85%',
                        'accent-foreground': '30 30% 25%',
                        destructive: '0 84% 60%',
                        'destructive-foreground': '45 40% 95%',
                        border: '45 35% 85%',
                        input: '45 35% 85%',
                        ring: '35 60% 45%'
                    }
                },
                elegant: {
                    name: 'Zarif',
                    icon: 'fa-gem',
                    colors: {
                        background: '0 0% 98%',
                        foreground: '220 20% 15%',
                        card: '0 0% 96%',
                        'card-foreground': '220 20% 15%',
                        popover: '0 0% 96%',
                        'popover-foreground': '220 20% 15%',
                        primary: '220 30% 40%',
                        'primary-foreground': '0 0% 98%',
                        secondary: '220 15% 90%',
                        'secondary-foreground': '220 20% 15%',
                        muted: '220 15% 90%',
                        'muted-foreground': '220 10% 50%',
                        accent: '220 15% 90%',
                        'accent-foreground': '220 20% 15%',
                        destructive: '0 70% 50%',
                        'destructive-foreground': '0 0% 98%',
                        border: '220 15% 90%',
                        input: '220 15% 90%',
                        ring: '220 30% 40%'
                    }
                },
                midnight: {
                    name: 'Gece Yarısı',
                    icon: 'fa-moon',
                    colors: {
                        background: '240 10% 8%',
                        foreground: '0 0% 95%',
                        card: '240 10% 12%',
                        'card-foreground': '0 0% 95%',
                        popover: '240 10% 12%',
                        'popover-foreground': '0 0% 95%',
                        primary: '240 5% 65%',
                        'primary-foreground': '240 10% 8%',
                        secondary: '240 5% 20%',
                        'secondary-foreground': '0 0% 95%',
                        muted: '240 5% 20%',
                        'muted-foreground': '240 5% 60%',
                        accent: '240 5% 30%',
                        'accent-foreground': '0 0% 95%',
                        destructive: '0 60% 50%',
                        'destructive-foreground': '0 0% 95%',
                        border: '240 5% 25%',
                        input: '240 5% 20%',
                        ring: '240 5% 65%'
                    }
                },
                aurora: {
                    name: 'Kutup Işıkları',
                    icon: 'fa-star',
                    colors: {
                        background: '180 30% 95%',
                        foreground: '180 40% 20%',
                        card: '180 30% 92%',
                        'card-foreground': '180 40% 20%',
                        popover: '180 30% 92%',
                        'popover-foreground': '180 40% 20%',
                        primary: '180 50% 45%',
                        'primary-foreground': '180 30% 95%',
                        secondary: '180 25% 85%',
                        'secondary-foreground': '180 40% 20%',
                        muted: '180 25% 85%',
                        'muted-foreground': '180 20% 50%',
                        accent: '180 25% 85%',
                        'accent-foreground': '180 40% 20%',
                        destructive: '0 70% 50%',
                        'destructive-foreground': '180 30% 95%',
                        border: '180 25% 85%',
                        input: '180 25% 85%',
                        ring: '180 50% 45%'
                    }
                },
                royal: {
                    name: 'Kraliyet',
                    icon: 'fa-crown',
                    colors: {
                        background: '260 20% 96%',
                        foreground: '260 30% 20%',
                        card: '260 20% 94%',
                        'card-foreground': '260 30% 20%',
                        popover: '260 20% 94%',
                        'popover-foreground': '260 30% 20%',
                        primary: '280 40% 50%',
                        'primary-foreground': '260 20% 96%',
                        secondary: '260 15% 88%',
                        'secondary-foreground': '260 30% 20%',
                        muted: '260 15% 88%',
                        'muted-foreground': '260 10% 50%',
                        accent: '260 15% 88%',
                        'accent-foreground': '260 30% 20%',
                        destructive: '0 70% 50%',
                        'destructive-foreground': '260 20% 96%',
                        border: '260 15% 88%',
                        input: '260 15% 88%',
                        ring: '280 40% 50%'
                    }
                },
                emerald: {
                    name: 'Zümrüt',
                    icon: 'fa-leaf',
                    colors: {
                        background: '150 30% 96%',
                        foreground: '150 40% 20%',
                        card: '150 30% 94%',
                        'card-foreground': '150 40% 20%',
                        popover: '150 30% 94%',
                        'popover-foreground': '150 40% 20%',
                        primary: '160 50% 40%',
                        'primary-foreground': '150 30% 96%',
                        secondary: '150 25% 85%',
                        'secondary-foreground': '150 40% 20%',
                        muted: '150 25% 85%',
                        'muted-foreground': '150 20% 50%',
                        accent: '150 25% 85%',
                        'accent-foreground': '150 40% 20%',
                        destructive: '0 70% 50%',
                        'destructive-foreground': '150 30% 96%',
                        border: '150 25% 85%',
                        input: '150 25% 85%',
                        ring: '160 50% 40%'
                    }
                }
            },
            
            currentTheme: localStorage.getItem('theme') || 'light',
            
            getThemeNames() {
                return Object.keys(this.themes);
            },
            
            getTheme(themeName) {
                return this.themes[themeName] || this.themes.light;
            },
            
            setTheme(themeName) {
                if (this.themes[themeName]) {
                    this.currentTheme = themeName;
                    this.applyTheme();
                    localStorage.setItem('theme', themeName);
                }
            },
            
            toggleTheme() {
                const themeNames = this.getThemeNames();
                const currentIndex = themeNames.indexOf(this.currentTheme);
                const nextIndex = (currentIndex + 1) % themeNames.length;
                this.setTheme(themeNames[nextIndex]);
            },
            
            applyTheme() {
                const theme = this.getTheme(this.currentTheme);
                const html = document.documentElement;
                
                // Remove all theme classes
                html.className = '';
                
                // Apply CSS custom properties
                Object.entries(theme.colors).forEach(([key, value]) => {
                    const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
                    html.style.setProperty(cssVar, value);
                });
                
                // Update theme toggle icon
                const themeToggle = document.getElementById('theme-toggle');
                if (themeToggle) {
                    const icon = themeToggle.querySelector('i');
                    if (icon) {
                        icon.className = `fas ${theme.icon}`;
                    }
                    
                    // Add title with current theme name
                    themeToggle.title = `${theme.name} Tema (${this.getThemeNames().length} tema mevcut)`;
                }
            },
            
            init() {
                this.applyTheme();
            }
        };
        
        window.themeManager.init();
    }

    // Toast Notifications
    setupToastManager() {
        window.toastManager = {
            container: null,
            
            init() {
                this.container = document.createElement('div');
                this.container.className = 'fixed top-4 right-4 z-50 space-y-2';
                document.body.appendChild(this.container);
            },
            
            show(message, type = 'info') {
                if (!this.container) this.init();
                
                const toast = document.createElement('div');
                const bgColor = {
                    success: 'bg-green-500',
                    error: 'bg-red-500',
                    warning: 'bg-yellow-500',
                    info: 'bg-blue-500'
                }[type] || 'bg-blue-500';
                
                toast.className = `${bgColor} text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full`;
                toast.innerHTML = `
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : type === 'warning' ? 'exclamation' : 'info'}-circle"></i>
                        <span>${message}</span>
                    </div>
                `;
                
                this.container.appendChild(toast);
                
                // Animate in
                setTimeout(() => {
                    toast.classList.remove('translate-x-full');
                }, 100);
                
                // Remove after 3 seconds
                setTimeout(() => {
                    toast.classList.add('translate-x-full');
                    setTimeout(() => {
                        if (toast.parentNode) {
                            toast.parentNode.removeChild(toast);
                        }
                    }, 300);
                }, 3000);
            }
        };
    }

    // Modal Management
    setupModalManager() {
        window.modalManager = {
            currentModal: null,
            
            show(content, options = {}) {
                this.close();
                
                const submitButtonHTML = options.showSubmitButton ? `
                    <button onclick="modalManager.handleSubmit()" class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                        ${options.submitButtonText || 'Kaydet'}
                    </button>
                ` : '';
                
                const modal = document.createElement('div');
                modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
                modal.innerHTML = `
                    <div class="bg-card border rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <div class="flex justify-between items-center mb-4">
                            <h2 class="text-xl font-semibold">${options.title || 'Modal'}</h2>
                            <button onclick="modalManager.close()" class="text-muted-foreground hover:text-foreground">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div class="modal-content">
                            ${content}
                        </div>
                        ${submitButtonHTML ? `
                            <div class="flex justify-end gap-2 mt-4">
                                ${submitButtonHTML}
                                <button onclick="modalManager.close()" class="px-4 py-2 bg-muted hover:bg-muted/80 rounded-md">
                                    İptal
                                </button>
                            </div>
                        ` : ''}
                    </div>
                `;
                
                document.body.appendChild(modal);
                this.currentModal = modal;
                this.onSubmitCallback = options.onSubmit || null;
                
                // Close on background click
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        this.close();
                    }
                });
            },
            
            handleSubmit() {
                if (this.onSubmitCallback) {
                    this.onSubmitCallback();
                }
            },
            
            close() {
                if (this.currentModal) {
                    this.currentModal.remove();
                    this.currentModal = null;
                    this.onSubmitCallback = null;
                }
            }
        };
    }

    // Utility Functions
    setupUtils() {
        window.utils = {
            formatDate(date) {
                if (!date) return '';
                const d = new Date(date);
                return d.toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });
            },
            
            formatDateTime(date) {
                if (!date) return '';
                const d = new Date(date);
                return d.toLocaleString('tr-TR', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
            },
            
            generateId() {
                return Date.now().toString(36) + Math.random().toString(36).substr(2);
            },
            
            debounce(func, wait) {
                let timeout;
                return function executedFunction(...args) {
                    const later = () => {
                        clearTimeout(timeout);
                        func(...args);
                    };
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                };
            },
            
            throttle(func, limit) {
                let inThrottle;
                return function() {
                    const args = arguments;
                    const context = this;
                    if (!inThrottle) {
                        func.apply(context, args);
                        inThrottle = true;
                        setTimeout(() => inThrottle = false, limit);
                    }
                };
            }
        };
    }
}

// Form Components
class FormComponents {
    static createInput(type, placeholder, value = '', options = {}) {
        const input = document.createElement('input');
        input.type = type;
        input.placeholder = placeholder;
        input.value = value;
        input.className = 'w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring';
        
        if (options.required) input.required = true;
        if (options.id) input.id = options.id;
        if (options.className) input.className += ' ' + options.className;
        
        return input;
    }

    static createSelect(options, selectedValue = '', selectOptions = {}) {
        const select = document.createElement('select');
        select.className = 'w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring';
        
        if (selectOptions.id) select.id = selectOptions.id;
        
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.label;
            if (option.value === selectedValue) {
                optionElement.selected = true;
            }
            select.appendChild(optionElement);
        });
        
        return select;
    }

    static createButton(text, type = 'button', onClick = null, options = {}) {
        const button = document.createElement('button');
        button.type = type;
        button.textContent = text;
        button.className = options.className || 'px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors';
        
        if (onClick) button.onclick = onClick;
        if (options.id) button.id = options.id;
        
        return button;
    }

    static createForm(fields, onSubmit) {
        const form = document.createElement('form');
        form.className = 'space-y-4';
        
        fields.forEach(field => {
            const formGroup = document.createElement('div');
            
            if (field.label) {
                const label = document.createElement('label');
                label.textContent = field.label;
                label.className = 'block text-sm font-medium mb-1';
                formGroup.appendChild(label);
            }
            
            let input;
            if (field.type === 'select') {
                input = this.createSelect(field.options, field.value, field);
            } else {
                input = this.createInput(field.type || 'text', field.placeholder, field.value, field);
            }
            
            if (field.id) input.id = field.id;
            formGroup.appendChild(input);
            form.appendChild(formGroup);
        });
        
        const buttonGroup = document.createElement('div');
        buttonGroup.className = 'flex space-x-2 pt-4';
        
        const submitButton = this.createButton('Kaydet', 'submit');
        const cancelButton = this.createButton('İptal', 'button', () => {
            window.modalManager.close();
        }, { className: 'px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors' });
        
        buttonGroup.appendChild(submitButton);
        buttonGroup.appendChild(cancelButton);
        form.appendChild(buttonGroup);
        
        form.onsubmit = (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = {};
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            onSubmit(data);
        };
        
        return form;
    }
}

// Initialize components
window.componentManager = new ComponentManager();
window.FormComponents = FormComponents;