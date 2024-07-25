window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('transitionDiv').style.width = '0';
    }, 100);
});

//fullpage scroll
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    let currentSection = 0;
    let isScrolling = false;
    let touchStartY = 0;

    function scrollToSection(index) {
        if (index < 0 || index >= sections.length) return;
        isScrolling = true;
        sections[index].scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => { isScrolling = false; }, 1000); // Adjust timeout based on scroll duration
        currentSection = index;
    }

    window.addEventListener('wheel', (event) => {
        if (isScrolling) return;

        if (event.deltaY > 0) {
            // Scroll down
            scrollToSection(currentSection + 1);
        } else if (event.deltaY < 0) {
            // Scroll up
            scrollToSection(currentSection - 1);
        }
    });

    window.addEventListener('touchstart', (event) => {
        touchStartY = event.touches[0].clientY;
    });

    window.addEventListener('touchmove', (event) => {
        if (isScrolling) return;

        const touchEndY = event.touches[0].clientY;
        const touchDiff = touchStartY - touchEndY;

        if (Math.abs(touchDiff) > 50) { // Adjust sensitivity threshold as needed
            if (touchDiff > 0) {
                // Scroll down
                scrollToSection(currentSection + 1);
            } else {
                // Scroll up
                scrollToSection(currentSection - 1);
            }
            touchStartY = touchEndY; // Reset starting touch position for continuous swiping
        }
    });
});

//birds
VANTA.BIRDS({
    el: "#birds",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    backgroundColor: 0xffffff,
    backgroundAlpha: 0,
    color1: 0x436a2b,
    color2: 0x9f7f53,
    colorMode: "lerp",
    birdSize: 1.00,
    wingSpan: 18.00,
    speedLimit: 3.00,
    separation: 80.00,
    alignment: 55.00,
    cohesion: 35.00,
    quantity: 3.00
})