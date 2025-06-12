// Initialize AOS
AOS.init({
    duration: 800,
    once: true
});

// Lightbox functionality
document.querySelectorAll('.food-img, .gallery-img').forEach(img => {
    img.addEventListener('click', () => {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        lightboxImg.src = img.getAttribute('data-src') || img.src;
        lightbox.style.display = 'flex';
    });
});

document.querySelector('.close-lightbox').addEventListener('click', () => {
    document.getElementById('lightbox').style.display = 'none';
});

// Carousel functionality
document.querySelectorAll('.carousel-arrow').forEach(button => {
    button.addEventListener('click', () => {
        const containerId = button.getAttribute('data-container');
        const container = document.getElementById(containerId);
        const direction = button.classList.contains('carousel-arrow-left') ? 'left' : 'right';
        const itemWidth = container.querySelector('.menu-item').offsetWidth + 15; // Item width + margin
        const visibleItems = 4; // Number of items visible (4 columns)
        const scrollAmount = itemWidth * visibleItems; // Scroll by 4 items

        if (direction === 'left') {
            container.scrollLeft -= scrollAmount;
        } else {
            container.scrollLeft += scrollAmount;
        }
    });
});

// Auto-scroll every 20 minutes (1200 seconds)
setInterval(() => {
    const containers = ['nonVegItems', 'vegItems', 'appetizerItems', 'dessertItems', 'drinksItems'];
    containers.forEach(containerId => {
        const container = document.getElementById(containerId);
        const itemWidth = container.querySelector('.menu-item').offsetWidth + 15;
        const visibleItems = 4;
        const scrollAmount = itemWidth * visibleItems;
        container.scrollLeft += scrollAmount;
    });
}, 1200 * 1000); // 1200 seconds = 20 minutes

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
