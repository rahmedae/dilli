// Initialize AOS
AOS.init({
    duration: 800,
    once: true
});

// Smooth scrolling for nav links with offset for fixed navbar
document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const offsetPosition = targetElement.offsetTop - navbarHeight;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.querySelector('.close-lightbox');

document.querySelectorAll('.food-img, .gallery-img, .menu-img').forEach(img => {
    img.addEventListener('click', () => {
        lightboxImg.src = img.getAttribute('data-src') || img.src;
        lightbox.style.display = 'flex';
    });
});

// Close lightbox on button click
closeLightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

// Close lightbox on clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});

// Carousel functionality
document.querySelectorAll('.carousel-arrow').forEach(button => {
    button.addEventListener('click', () => {
        const containerId = button.getAttribute('data-container');
        const container = document.getElementById(containerId);
        const direction = button.classList.contains('carousel-arrow-left') ? 'left' : 'right';
        const itemWidth = container.querySelector('.menu-item').offsetWidth + 15; // Item width + margin
        const scrollAmount = itemWidth; // Scroll by 1 item

        if (direction === 'left') {
            container.scrollLeft -= scrollAmount;
        } else {
            container.scrollLeft += scrollAmount;
        }
    });
});

// Auto-scroll every 30 seconds
setInterval(() => {
    const containers = ['nonVegItems', 'vegItems', 'appetizerItems', 'dessertItems', 'drinksItems'];
    containers.forEach(containerId => {
        const container = document.getElementById(containerId);
        const itemWidth = container.querySelector('.menu-item').offsetWidth + 15;
        const scrollAmount = itemWidth;

        // Check if we've reached the end
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
            container.scrollLeft = 0; // Reset to start
        } else {
            container.scrollLeft += scrollAmount; // Scroll by 1 item
        }
    });
}, 30 * 1000); // 30 seconds

// Show more functionality for gallery
document.getElementById('showMoreBtn').addEventListener('click', () => {
    const hiddenItems = document.querySelectorAll('.gallery-item.hidden');
    hiddenItems.forEach((item, index) => {
        if (index < 6) { // Show 6 more items
            item.classList.remove('hidden');
        }
    });
    if (document.querySelectorAll('.gallery-item.hidden').length === 0) {
        document.getElementById('showMoreBtn').style.display = 'none';
    }
});
