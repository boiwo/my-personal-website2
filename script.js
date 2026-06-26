/*=============== MENU SHOW Y HIDDEN ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.querySelector('.nav__close')

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () =>{
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SMOOTH SCROLLING ===============*/
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Smooth scrolling for buttons with data-scroll attribute
document.querySelectorAll('[data-scroll]').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('data-scroll');
        const target = document.getElementById(targetId);
        
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/*=============== ACTIVE NAVIGATION LINK ===============*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 150;
        const sectionId = current.getAttribute('id');
        const sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');
        
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            sectionsClass?.classList.add('active');
        } else {
            sectionsClass?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', scrollActive);

/*=============== SCROLL REVEAL ANIMATION ===============*/
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate skill progress bars when skills section is visible
            if (entry.target.classList.contains('skills')) {
                animateSkillBars();
            }
        }
    });
}, observerOptions);

// Observe all sections for fade-in animation
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

/*=============== SKILL PROGRESS BARS ANIMATION ===============*/
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill__progress');
    
    skillBars.forEach(bar => {
        if (!bar.classList.contains('animated')) {
            const width = bar.getAttribute('data-width');
            bar.style.setProperty('--progress-width', width + '%');
            bar.style.width = width + '%';
            bar.classList.add('animated');
        }
    });
}

/*=============== CONTACT FORM ===============*/
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const contactData = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
        timestamp: new Date().toISOString()
    };
    
    // Log the data to console (for demonstration)
    console.log('=== CONTACT FORM SUBMISSION ===');
    console.log('Name:', contactData.name);
    console.log('Email:', contactData.email);
    console.log('Message:', contactData.message);
    console.log('Submitted at:', contactData.timestamp);
    console.log('================================');
    
    // Show success message
    showNotification('Thank you! Your message has been logged to the console. Check the browser developer tools to see the submitted data.', 'success');
    
    // Reset form
    contactForm.reset();
});

/*=============== NOTIFICATION SYSTEM ===============*/
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'} notification__icon"></i>
            <span class="notification__text">${message}</span>
            <button class="notification__close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles for notification
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 2rem;
                right: 2rem;
                background: white;
                padding: 1rem;
                border-radius: 0.5rem;
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
                transform: translateX(400px);
                transition: transform 0.3s ease;
                z-index: 1000;
                max-width: 400px;
                border-left: 4px solid #4010b9ff;
            }
            
            .notification--success {
                border-left-color: #10b981;
            }
            
            .notification--error {
                border-left-color: #ef4444;
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            .notification__content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }
            
            .notification__icon {
                color: #10b981;
                font-size: 1.2rem;
                flex-shrink: 0;
            }
            
            .notification__text {
                flex: 1;
                font-size: 0.9rem;
                line-height: 1.4;
            }
            
            .notification__close {
                background: none;
                border: none;
                cursor: pointer;
                padding: 0.25rem;
                color: #666;
                flex-shrink: 0;
            }
            
            @media screen and (max-width: 768px) {
                .notification {
                    top: 1rem;
                    right: 1rem;
                    left: 1rem;
                    max-width: none;
                    transform: translateY(-100px);
                }
                
                .notification.show {
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(styles);
    }
    

    document.body.appendChild(notification);
    

    setTimeout(() => notification.classList.add('show'), 100);
    
    
    const autoRemove = setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    

    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoRemove);
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}
const backToTopBtn = document.getElementById('back-to-top');

const scrollTop = () => {
    if(this.scrollY >= 560) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
}

window.addEventListener('scroll', scrollTop);

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    typing();
}
/*=============== PERFORMANCE OPTIMIZATIONS ===============*/
// Throttle function for scroll events

const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const heroName = document.querySelector('.hero__name');
            if (heroName && !heroName.hasAttribute('data-typed')) {
                heroName.setAttribute('data-typed', 'true');
                typeWriter(heroName, 'John Smith', 150);
            }
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}


document.addEventListener('DOMContentLoaded', function() {
    const currentYear = new Date().getFullYear();
    const copyrightText = document.querySelector('.footer__copy p');
    if (copyrightText) {
        copyrightText.textContent = copyrightText.textContent.replace('2025', currentYear);
    }
});


function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}


window.addEventListener('scroll', throttle(scrollHeader, 10));
window.addEventListener('scroll', throttle(scrollActive, 10));
window.addEventListener('scroll', throttle(scrollTop, 10));


document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});


window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});


let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 
    'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        showNotification('🎉 Konami Code activated! You found the easter egg!', 'success');
        konamiCode = [];
        
        
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});


const rainbowStyles = `
@keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = rainbowStyles;
document.head.appendChild(styleSheet);