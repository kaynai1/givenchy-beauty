// ===== DOM Elements =====
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');

// ===== Navbar Scroll Effect =====
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===== Mobile Menu Toggle =====
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate hamburger
    const spans = menuToggle.querySelectorAll('span');
    if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close menu on overlay click
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// ===== Mobile Dropdown =====
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a');
    
    // Only prevent default on mobile
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        }
    });
});

// ===== Hero Slider =====
let currentSlide = 0;
let slideInterval;
const slideDuration = 5000; // 5 seconds

function goToSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (index + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    goToSlide(currentSlide + 1);
}

function prevSlide() {
    goToSlide(currentSlide - 1);
}

// Auto play
function startSlider() {
    slideInterval = setInterval(nextSlide, slideDuration);
}

function stopSlider() {
    clearInterval(slideInterval);
}

// Event listeners
nextBtn.addEventListener('click', () => {
    stopSlider();
    nextSlide();
    startSlider();
});

prevBtn.addEventListener('click', () => {
    stopSlider();
    prevSlide();
    startSlider();
});

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        stopSlider();
        goToSlide(parseInt(dot.dataset.index));
        startSlider();
    });
});

// Start slider
startSlider();

// Pause on hover
const slider = document.querySelector('.slider');
slider.addEventListener('mouseenter', stopSlider);
slider.addEventListener('mouseleave', startSlider);

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.category-card, .product-card, .section-title').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ===== Newsletter Form =====
const newsletterForm = document.querySelector('.newsletter-form');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input').value;
    
    // Simple animation feedback
    const button = newsletterForm.querySelector('button');
    const originalText = button.textContent;
    button.textContent = '感谢订阅！';
    button.style.background = 'var(--gold)';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
        newsletterForm.reset();
    }, 2000);
});

// ===== Add to Cart Animation =====
document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', function() {
        const originalText = this.textContent;
        this.textContent = '已添加 ✓';
        this.style.background = 'var(--gold)';
        this.style.borderColor = 'var(--gold)';
        
        // Update cart count
        const cartCount = document.querySelector('.cart-count');
        cartCount.textContent = parseInt(cartCount.textContent) + 1;
        
        setTimeout(() => {
            this.textContent = originalText;
            this.style.background = '';
            this.style.borderColor = '';
        }, 1500);
    });
});

// ===== Smooth Scroll for Navigation =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu
            navLinks.classList.remove('active');
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// ===== Parallax Effect for Story Section =====
const storyBg = document.querySelector('.story-bg');

window.addEventListener('scroll', () => {
    if (storyBg) {
        const scrolled = window.pageYOffset;
        const storySection = document.querySelector('.story');
        const storyTop = storySection.offsetTop;
        const storyHeight = storySection.offsetHeight;
        
        if (scrolled > storyTop - window.innerHeight && scrolled < storyTop + storyHeight) {
            const yPos = (scrolled - storyTop) * 0.3;
            storyBg.style.transform = `translateY(${yPos}px)`;
        }
    }
});

// ===== Search Toggle (Optional Enhancement) =====
const searchIcon = document.querySelector('.icon-search');

searchIcon.addEventListener('click', (e) => {
    e.preventDefault();
    // Create search overlay
    const existingOverlay = document.querySelector('.search-overlay');
    if (existingOverlay) {
        existingOverlay.remove();
        return;
    }
    
    const overlay = document.createElement('div');
    overlay.className = 'search-overlay';
    overlay.innerHTML = `
        <div class="search-container">
            <input type="text" placeholder="搜索产品..." autofocus>
            <button class="search-close">&times;</button>
        </div>
    `;
    
    // Style the overlay
    Object.assign(overlay.style, {
        position: 'fixed',
        inset: '0',
        background: 'rgba(0,0,0,0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '2000',
        opacity: '0',
        transition: 'opacity 0.3s ease'
    });
    
    document.body.appendChild(overlay);
    
    // Animate in
    requestAnimationFrame(() => {
        overlay.style.opacity = '1';
        overlay.querySelector('input').focus();
    });
    
    // Close functionality
    const closeSearch = () => {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 300);
    };
    
    overlay.querySelector('.search-close').addEventListener('click', closeSearch);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeSearch();
    });
    
    overlay.querySelector('input').addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeSearch();
    });
});

// ===== Dynamic Search Styles =====
const searchStyles = document.createElement('style');
searchStyles.textContent = `
    .search-container {
        width: 80%;
        max-width: 600px;
        display: flex;
        gap: 20px;
    }
    
    .search-container input {
        flex: 1;
        padding: 15px 0;
        background: transparent;
        border: none;
        border-bottom: 2px solid rgba(255,255,255,0.3);
        color: white;
        font-family: 'Noto Serif SC', serif;
        font-size: 1.5rem;
        letter-spacing: 2px;
        outline: none;
        transition: border-color 0.3s ease;
    }
    
    .search-container input:focus {
        border-bottom-color: var(--gold);
    }
    
    .search-container input::placeholder {
        color: rgba(255,255,255,0.4);
    }
    
    .search-close {
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        opacity: 0.5;
        transition: opacity 0.3s ease;
    }
    
    .search-close:hover {
        opacity: 1;
    }
`;
document.head.appendChild(searchStyles);

console.log('GIVENCHY BEAUTY website loaded successfully ✨');
