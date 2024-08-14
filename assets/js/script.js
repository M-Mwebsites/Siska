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
	scrollHorizontally: true,
    afterLoad: function(origin, destination, direction){
        updateMenuColor(destination);
    },
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
    const active = fullpage_api.getActiveSection();
    const current = active.item.id;
    if (current == 'about' && section == 'portfolio') {
        fullpage_api.moveSectionDown();
    } else if (current == 'about' && section == 'contact') {
        fullpage_api.moveSectionDown();
        fullpage_api.moveSectionDown();
    } else if (current == 'portfolio' && section == 'about') {
        fullpage_api.moveSectionUp();
    } else if (current == 'portfolio' && section == 'contact') {
        fullpage_api.moveSectionDown();
    } else if (current == 'contact' && section == 'about') {
        fullpage_api.moveSectionUp();
        fullpage_api.moveSectionUp();
    } else if (current == 'contact' && section == 'portfolio') {
        fullpage_api.moveSectionUp();
    }
    setTimeout(() => {
        updateMenuColor(section);
    }, 1400);
}

//menu colors
function updateMenuColor(destination) {
    const div = destination.item?.id || destination;
    const aboutLink = document.getElementById('aboutLink');
    const portfolioLink = document.getElementById('portfolioLink');
    const contactLink = document.getElementById('contactLink');

    if(div == "about") {
        aboutLink.style.color = '#8a4536';
        portfolioLink.style.color = 'white';
        contactLink.style.color = 'white';
    } else if (div == "portfolio") {
        aboutLink.style.color = 'black';
        portfolioLink.style.color = '#8a4536';
        contactLink.style.color = 'black';
    } else if (div == "contact") {
        aboutLink.style.color = 'white';
        portfolioLink.style.color = 'white';
        contactLink.style.color = '#8a4536';
    }
}



//tree animation
document.addEventListener("DOMContentLoaded", function() {
    const imgElement = document.querySelector("#about img");
    const txtElement = document.querySelector("#about p");
    let currentImageIndex = 1;
    let interval;
    let isCountingDown = false;

    txtElement.addEventListener("mouseenter", function() {
        clearInterval(interval);
        isCountingDown = false;
        currentImageIndex = Math.max(currentImageIndex, 1);
        
        interval = setInterval(function() {
            if (currentImageIndex < 17) {
                currentImageIndex++;
                imgElement.src = `assets/images/tree/${String(currentImageIndex).padStart(2, '0')}.svg`;
            } else {
                clearInterval(interval);
            }
        }, 50);
    });

    imgElement.addEventListener("mouseenter", function() {
        clearInterval(interval);
        isCountingDown = false;
        currentImageIndex = Math.max(currentImageIndex, 1);
        
        interval = setInterval(function() {
            if (currentImageIndex < 17) {
                currentImageIndex++;
                imgElement.src = `assets/images/tree/${String(currentImageIndex).padStart(2, '0')}.svg`;
            } else {
                clearInterval(interval);
            }
        }, 50);
    });

    imgElement.addEventListener("mouseleave", function() {
        clearInterval(interval);
        isCountingDown = true;

        interval = setInterval(function() {
            if (currentImageIndex > 1) {
                currentImageIndex--;
                imgElement.src = `assets/images/tree/${String(currentImageIndex).padStart(2, '0')}.svg`;
            } else {
                clearInterval(interval);
                imgElement.src = "assets/images/name.svg";
                isCountingDown = false;
            }
        }, 30);
    });
});



setTimeout(() => {
    const imgElement = document.querySelector("#about img");
    imgElement.style.top = '20vh';
    const txtElement = document.querySelector("#about p");
    txtElement.style.top = '37vh';
}, 300);