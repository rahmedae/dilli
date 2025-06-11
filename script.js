// Initialize AOS
AOS.init({
    duration: 1000,
    once: true
});

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close the navbar on mobile after clicking a link
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarToggler && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        }
    });
});

// Specialties Carousel
function scrollSpecialties(direction) {
    const container = document.querySelector('.specialties-items');
    const isMobile = window.innerWidth <= 768;
    const scrollAmount = isMobile ? container.clientWidth : 300; // Full width on mobile, 300px on desktop
    if (direction === 'left') {
        container.scrollLeft -= scrollAmount;
    } else {
        container.scrollLeft += scrollAmount;
    }
}

// Menu Carousels
function scrollMenu(category, direction) {
    const container = document.getElementById(`${category}Items`);
    const isMobile = window.innerWidth <= 576;
    const isTablet = window.innerWidth <= 768 && window.innerWidth > 576;
    const itemWidth = 300; // Width of each menu item
    const padding = 20; // Total padding between items (10px each side)
    const scrollAmount = isMobile ? container.clientWidth : (isTablet ? (itemWidth * 2 + padding) : (itemWidth * 4 + padding * 3)); // 1260px for desktop (4 items), 620px for tablet (2 items), full width for mobile (1 item)
    
    if (direction === 'left') {
        container.scrollLeft -= scrollAmount;
    } else {
        container.scrollLeft += scrollAmount;
    }
    // Reset auto-scroll timer on manual scroll
    clearInterval(container.autoScroll);
    container.autoScroll = setInterval(() => autoScrollMenu(category), 25000);
}

// Auto-scroll for Menu Carousels
function autoScrollMenu(category) {
    const container = document.getElementById(`${category}Items`);
    const isMobile = window.innerWidth <= 576;
    const isTablet = window.innerWidth <= 768 && window.innerWidth > 576;
    const itemWidth = 300;
    const padding = 20;
    const scrollAmount = isMobile ? container.clientWidth : (isTablet ? (itemWidth * 2 + padding) : (itemWidth * 4 + padding * 3));
    const maxScroll = container.scrollWidth - container.clientWidth;

    if (container.scrollLeft >= maxScroll) {
        container.scrollLeft = 0; // Reset to start
    } else {
        container.scrollLeft += scrollAmount;
    }
}

// Initialize auto-scroll for all menu carousels
const categories = ['nonVeg', 'veg', 'sides', 'desserts', 'beverages'];
categories.forEach(category => {
    const container = document.getElementById(`${category}Items`);
    container.autoScroll = setInterval(() => autoScrollMenu(category), 25000);

    // Pause auto-scroll on hover
    container.addEventListener('mouseenter', () => clearInterval(container.autoScroll));
    container.addEventListener('mouseleave', () => {
        container.autoScroll = setInterval(() => autoScrollMenu(category), 25000);
    });

    // Enable touch swipe for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    container.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe(category);
    });

    function handleSwipe(category) {
        const swipeThreshold = 50; // Minimum swipe distance to trigger
        if (touchStartX - touchEndX > swipeThreshold) {
            // Swipe left
            scrollMenu(category, 'right');
        }
        if (touchEndX - touchStartX > swipeThreshold) {
            // Swipe right
            scrollMenu(category, 'left');
        }
    }
});

// Gallery Lightbox
const galleryImages = document.querySelectorAll('.gallery-img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.querySelector('.close-lightbox');

galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.style.display = 'flex';
    });
});

closeLightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});

// Show More Button for Gallery
const showMoreBtn = document.getElementById('showMoreBtn');
const hiddenItems = document.querySelectorAll('.gallery-item.hidden');

showMoreBtn.addEventListener('click', () => {
    hiddenItems.forEach((item, index) => {
        item.classList.remove('hidden');
        item.setAttribute('data-aos-delay', (200 + index * 100).toString());
        AOS.refresh();
    });
    showMoreBtn.style.display = 'none';
});

// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
