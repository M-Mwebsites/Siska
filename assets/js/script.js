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
    color1: 0x8a2715,
    color2: 0x5f1c00,
    colorMode: "lerp",
    birdSize: 1.00,
    wingSpan: 18.00,
    speedLimit: 3.00,
    separation: 80.00,
    alignment: 55.00,
    cohesion: 35.00,
    quantity: 3.00
})




//fullpage scroll
new fullpage('#fullpage', {
	//options here
	autoScrolling:true,
	scrollHorizontally: true
});




//carousel
const carouselInner = document.querySelector('.carousel-inner');
let isTouching = false;
let startX = 0;
let scrollX = 0;

const divWidth = carouselInner.querySelector('div').offsetWidth;
const carouselWidth = carouselInner.scrollWidth - carouselInner.clientWidth;

//mouse movement handler
document.addEventListener('mousemove', (e) => {
    if (!isTouching) {
        const mouseX = e.clientX;
        scrollX = (mouseX / window.innerWidth) * carouselWidth;
        carouselInner.style.transform = `translateX(${-scrollX}px)`;
    }
});

//touch start handler
document.addEventListener('touchstart', (e) => {
    isTouching = true;
    startX = e.touches[0].clientX;
});

//touch move handler
document.addEventListener('touchmove', (e) => {
    if (isTouching) {
        const touchX = e.touches[0].clientX;
        const deltaX = startX - touchX;
        startX = touchX;
        scrollX += deltaX;
        if (scrollX < 0) scrollX = 0;
        if (scrollX > carouselWidth) scrollX = carouselWidth;
        carouselInner.style.transform = `translateX(${-scrollX}px)`;
    }
});

//touch end handler
document.addEventListener('touchend', () => {
    isTouching = false;
    const nearestDivIndex = Math.round(scrollX / divWidth);
    scrollX = nearestDivIndex * divWidth;
    if (scrollX > carouselWidth) scrollX = carouselWidth;
    carouselInner.style.transform = `translateX(${-scrollX}px)`;
});



//scroll to menu
function scrollToSection(section) {
    var elmntToView = document.getElementById(section);
    elmntToView.scrollIntoView();
}



//tree animation
document.addEventListener("DOMContentLoaded", function() {
    const imgElement = document.querySelector("#about img");
    let currentImageIndex = 1;
    let interval;
    let isCountingDown = false;

    imgElement.addEventListener("mouseenter", function() {
        clearInterval(interval); // Clear any existing intervals to avoid conflicts
        isCountingDown = false; // Reset the countdown flag
        currentImageIndex = Math.max(currentImageIndex, 1); // Ensure starting from the correct index
        
        interval = setInterval(function() {
            if (currentImageIndex < 17) {
                currentImageIndex++;
                imgElement.src = `assets/images/tree/${String(currentImageIndex).padStart(2, '0')}.svg`;
            } else {
                clearInterval(interval); // Stop the interval when it reaches 17
            }
        }, 50);
    });

    imgElement.addEventListener("mouseleave", function() {
        clearInterval(interval); // Clear any existing intervals to avoid conflicts
        isCountingDown = true; // Set the countdown flag

        interval = setInterval(function() {
            if (currentImageIndex > 1) {
                currentImageIndex--;
                imgElement.src = `assets/images/tree/${String(currentImageIndex).padStart(2, '0')}.svg`;
            } else {
                clearInterval(interval); // Stop the interval when it reaches 1
                imgElement.src = "assets/images/name.svg"; // Set to name.svg
                isCountingDown = false; // Reset the countdown flag
            }
        }, 30);
    });
});

