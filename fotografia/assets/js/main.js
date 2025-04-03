// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Menu Mobile
const mobileMenu = document.getElementById('mobile-menu');
const nav = document.getElementById('nav');
const closeMenu = document.getElementById('close-menu');

mobileMenu.addEventListener('click', function() {
    nav.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeMenu.addEventListener('click', function() {
    nav.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Fechar menu ao clicar em um link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function() {
        nav.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Fechar menu ao redimensionar para desktop
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        nav.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Atualizar ano automaticamente no footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Carrossel
let currentSlide = 0;
const carousel = document.getElementById('carousel');
const items = document.querySelectorAll('.carousel-item');
const indicatorsContainer = document.getElementById('indicators');

// Criar indicadores
items.forEach((_, index) => {
    const indicator = document.createElement('div');
    indicator.classList.add('indicator');
    if(index === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => goToSlide(index));
    indicatorsContainer.appendChild(indicator);
});

function updateCarousel() {
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Atualizar indicadores
    document.querySelectorAll('.indicator').forEach((ind, index) => {
        ind.classList.toggle('active', index === currentSlide);
    });
}

function moveSlide(direction) {
    currentSlide = (currentSlide + direction + items.length) % items.length;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

// Auto-play (opcional)
let autoPlay = setInterval(() => moveSlide(1), 5000);

// Pausar auto-play quando interagir
document.querySelector('.carousel-container').addEventListener('mouseenter', () => {
    clearInterval(autoPlay);
});

document.querySelector('.carousel-container').addEventListener('mouseleave', () => {
    autoPlay = setInterval(() => moveSlide(1), 5000);
});