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




// fullpage scroll
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

// Mouse movement handler
document.addEventListener('mousemove', (e) => {
    if (!isTouching) {
        const mouseX = e.clientX;
        scrollX = (mouseX / window.innerWidth) * carouselWidth;
        carouselInner.style.transform = `translateX(${-scrollX}px)`;
    }
});

// Touch start handler
document.addEventListener('touchstart', (e) => {
    isTouching = true;
    startX = e.touches[0].clientX;
});

// Touch move handler
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

// Touch end handler
document.addEventListener('touchend', () => {
    isTouching = false;
    const nearestDivIndex = Math.round(scrollX / divWidth);
    scrollX = nearestDivIndex * divWidth;
    if (scrollX > carouselWidth) scrollX = carouselWidth;
    carouselInner.style.transform = `translateX(${-scrollX}px)`;
});


// scroll to menu
function scrollToSection(section) {
    var elmntToView = document.getElementById(section);
    elmntToView.scrollIntoView();
}


document.addEventListener("DOMContentLoaded", function() {
    const imgElement = document.querySelector("#about img");

    imgElement.addEventListener("mouseenter", function() {
        imgElement.src = "assets/images/name.gif";
    });

    imgElement.addEventListener("mouseleave", function() {
        imgElement.src = "assets/images/name.svg";
    });
});