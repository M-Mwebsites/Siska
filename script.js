document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const container = document.querySelector('.carousel-container');

    container.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const containerWidth = container.offsetWidth;
        const carouselWidth = carousel.scrollWidth;

        // Calculate the max scrollable distance
        const maxScrollLeft = carouselWidth - containerWidth;

        // Calculate the scroll percentage
        const scrollPercentage = mouseX / containerWidth;

        // Calculate the new scroll position
        const newScrollLeft = maxScrollLeft * scrollPercentage;

        // Apply the transform to the carousel
        carousel.style.transform = `translateX(-${newScrollLeft}px)`;
    });
});
