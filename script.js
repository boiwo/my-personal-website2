// Theme Management
class ThemeManager {
    constructor() {
        this.init();
    }
    
    init() {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            this.setDarkMode(true);
        }
        
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.setDarkMode(e.matches);
            }
        });
    }
    
    toggleTheme() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        this.setDarkMode(!isDark);
    }
    
    setDarkMode(isDark) {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.init();
    }
    
    init() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.className = mobileMenu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
            });
        }
        
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.className = 'fas fa-bars';
            });
        });
        
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
            });
        });
        
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.background = document.documentElement.getAttribute('data-theme') === 'dark' 
                    ? 'rgba(17, 24, 39, 0.95)' 
                    : 'rgba(255, 255, 255, 0.95)';
            } else {
                navbar.style.background = document.documentElement.getAttribute('data-theme') === 'dark' 
                    ? 'rgba(17, 24, 39, 0.8)' 
                    : 'rgba(255, 255, 255, 0.8)';
            }
        });
    }
    
    scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            const offsetTop = element.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

// Animation Manager
class AnimationManager {
    constructor() {
        this.init();
    }
    
    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);
        
        const animatedElements = document.querySelectorAll(
            '.skill-card, .project-card, .testimonial-card, .experience-item'
        );
        
        animatedElements.forEach(el => observer.observe(el));
        
        this.animateSkillBars();
    }
    
    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => observer.observe(bar));
    }
}

// Utility Functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Project Card Functionalities
function openProjectModal(event) {
    event.stopPropagation();
    const card = event.target.closest('.project-card');
    if (!card) return;
    document.getElementById('modal-title').textContent = card.dataset.title;
    document.getElementById('modal-description').textContent = card.dataset.description;
    document.getElementById('modal-links').innerHTML = `
        <a href="${card.dataset.github}" target="_blank" class="project-link"><i class="fab fa-github"></i> Code</a>
        <a href="${card.dataset.demo}" target="_blank" class="project-link"><i class="fas fa-external-link-alt"></i> Live Demo</a>
    `;
    document.getElementById('project-modal').style.display = 'block';
}

// Make project card clickable to open demo
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Prevent if clicking on action buttons or links
            if (
                e.target.closest('.project-action-btn') ||
                e.target.closest('a')
            ) return;
            const demo = card.dataset.demo;
            if (demo) {
                window.open(demo, '_blank');
            }
        });
    });
});

function closeProjectModal() {
    document.getElementById('project-modal').style.display = 'none';
}

function copyProjectLink(event) {
    event.stopPropagation();
    const card = event.target.closest('.project-card');
    if (!card) return;
    const link = card.dataset.demo;
    if (navigator.clipboard) {
        navigator.clipboard.writeText(link).then(() => {
            alert('Project link copied to clipboard!');
        });
    } else {
        // fallback
        const temp = document.createElement('input');
        document.body.appendChild(temp);
        temp.value = link;
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        alert('Project link copied to clipboard!');
    }
}

function shareProject(event) {
    event.stopPropagation();
    const card = event.target.closest('.project-card');
    if (!card) return;
    const shareData = {
        title: card.dataset.title,
        text: card.dataset.description,
        url: card.dataset.demo
    };
    if (navigator.share) {
        navigator.share(shareData).catch(() => {});
    } else {
        alert('Sharing is not supported in this browser.');
    }
}

// Close modal on outside click
window.addEventListener('click', function(e) {
    const modal = document.getElementById('project-modal');
    if (modal && modal.style.display === 'block' && !modal.contains(e.target) && !e.target.closest('.project-card')) {
        closeProjectModal();
    }
});

// Contact Form Handler
class ContactManager {
    constructor() {
        this.init();
    }
    
    init() {
        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        emailLinks.forEach(link => {
            link.addEventListener('click', () => {
                console.log('Email link clicked');
            });
        });
    }
}

// Performance Optimization
class PerformanceManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.lazyLoadImages();
        this.debounceScrollEvents();
    }
    
    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    debounceScrollEvents() {
        let ticking = false;
        
        function updateScrollEffects() {
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick);
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new NavigationManager();
    new AnimationManager();
    new ContactManager();
    new PerformanceManager();
    
    document.body.classList.add('loaded');
    
    console.log('🚀 Portfolio loaded successfully!');
    console.log('💼 Check out the GitHub repository!');
});

// Handle visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Page hidden - optimizing performance');
    } else {
        console.log('Page visible - resuming normal operation');
    }
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('Portfolio error:', e.error);
});

// Service Worker registration (optional PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(() => console.log('SW registered'))
        //     .catch(() => console.log('SW registration failed'));
    });
}
