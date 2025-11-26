// ===== GERENCIAMENTO DE CARREGAMENTO - CORRIGIDO =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Carregado - Iniciando site...');
    
    // Remove a tela de carregamento IMEDIATAMENTE
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                console.log('Loading screen removida');
            }, 500);
        }, 1000);
    }

    // Inicializa todas as funcionalidades
    initializeThemeToggle();
    initializeNavigation();
    initializeScrollAnimations();
    initializeCounters();
    initializeContactForm();
    
    // Inicializa partículas APÓS o carregamento
    setTimeout(initializeParticles, 2000);
});

// ===== TOGGLE DE TEMA =====
function initializeThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;
    
    const themeIcon = themeToggle.querySelector('i');
    
    // Verifica o tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(themeIcon, savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(themeIcon, newTheme);
    });
}

function updateThemeIcon(icon, theme) {
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// ===== PARTÍCULAS BACKGROUND - CORRIGIDO =====
function initializeParticles() {
    console.log('Inicializando partículas...');
    
    if (typeof particlesJS !== 'undefined') {
        try {
            particlesJS('particles-js', {
                particles: {
                    number: { 
                        value: 60, 
                        density: { 
                            enable: true, 
                            value_area: 800 
                        } 
                    },
                    color: { 
                        value: "#e94560" 
                    },
                    shape: { 
                        type: "circle" 
                    },
                    opacity: { 
                        value: 0.3, 
                        random: true 
                    },
                    size: { 
                        value: 3, 
                        random: true 
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#e94560",
                        opacity: 0.2,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 1,
                        direction: "none",
                        random: true,
                        straight: false,
                        out_mode: "out",
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: { 
                            enable: true, 
                            mode: "repulse" 
                        },
                        onclick: { 
                            enable: true, 
                            mode: "push" 
                        },
                        resize: true
                    }
                },
                retina_detect: true
            });
            console.log('Partículas inicializadas com sucesso!');
        } catch (error) {
            console.error('Erro ao inicializar partículas:', error);
        }
    } else {
        console.warn('ParticlesJS não carregado - continuando sem partículas');
    }
}

// ===== NAVEGAÇÃO MOBILE - CORRIGIDA =====
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Previne scroll quando menu está aberto
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Fecha menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Fecha menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (navMenu && hamburger && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target) &&
            navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                
                if (document.documentElement.getAttribute('data-theme') === 'dark') {
                    header.style.background = 'rgba(15, 20, 25, 0.98)';
                }
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
                
                if (document.documentElement.getAttribute('data-theme') === 'dark') {
                    header.style.background = 'rgba(15, 20, 25, 0.95)';
                }
            }
        }
    });
}

// ===== ANIMAÇÕES DE SCROLL =====
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    const animateElements = document.querySelectorAll('.service-card, .about-content, .contact-content, .timeline-item, .feature-item');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// ===== CONTADORES ANIMADOS =====
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target, 2000);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.getAttribute('data-count') === '98' ? '%' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.getAttribute('data-count') === '98' ? '%' : '+');
        }
    }, 16);
}

// ===== FORMULÁRIO DE CONTATO =====
function initializeContactForm() {
    const form = document.getElementById('consultationForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            // Simulação de envio
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// ===== FUNÇÃO DE FALLBACK - GARANTIA =====
window.addEventListener('load', function() {
    console.log('Página totalmente carregada - Garantindo que loading seja removido');
    
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }
});

// Fallback final - remove loading após 5 segundos NO MÁXIMO
setTimeout(() => {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
        console.log('Fallback: Loading screen removida por timeout');
    }
}, 5000);
