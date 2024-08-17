// fullpage scroll
new fullpage('#fullpage', {
    // options here
    autoScrolling: true,
    scrollHorizontally: true,
    touchSensitivity: 12,
    afterLoad: function(origin, destination, direction){
        updateMenuColor(destination);
    },
});

// Mouse movement for color and letter spacing
document.addEventListener('mousemove', (e) => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    // Horizontal color change
    const mouseY = e.clientY;
    const colorRatio = mouseY / screenHeight;
    const r = Math.round(255 - (colorRatio * (255 - 95)));
    const g = Math.round(175 - (colorRatio * 175));
    const b = Math.round(175 - (colorRatio * 175));
    const newColor = `rgb(${r}, ${g}, ${b})`;

    document.body.style.backgroundColor = newColor;

    // Vertical letter spacing change
    const mouseX = e.clientX;
    const spacingRatio = mouseX / screenWidth;
    let newLetterSpacing =  spacingRatio * 5;
    if (screenWidth < 600) newLetterSpacing -= 3;
    newLetterSpacing += 'vw';

    const aboutText = document.querySelector('#about .name');
    aboutText.style.letterSpacing = newLetterSpacing;
    aboutText.style.textIndent = newLetterSpacing;
});

// Detect if the device is touch-enabled
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Get carousel and its properties
const carouselInner = document.querySelector('#carousel-inner');
let isTouching = false;
let startX = 0;
let scrollX = 0;
let velocity = 0;
let lastTouchX = 0;
const momentumFactor = 10; // Adjust this factor for how far the momentum slide should continue
let momentumInterval;

const carouselWidth = carouselInner.scrollWidth - carouselInner.clientWidth;
const divWidth = carouselInner.querySelector('div').offsetWidth;

// Touch end handler (only for touch devices)
document.addEventListener('touchend', () => {
    if (isTouchDevice) {
        isTouching = false;
        carouselInner.style.transition = 'transform 0.5s ease'; // Re-enable smooth transition

        // Apply momentum slide in the same direction
        let momentumDistance = velocity * momentumFactor;

        const targetScrollX = Math.min(Math.max(scrollX - momentumDistance, 0), carouselWidth);

        // Smooth slide effect
        carouselInner.style.transform = `translateX(${-targetScrollX}px)`;
        scrollX = targetScrollX; // Update scroll position
    }
});



// scroll to menu
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

// menu colors
function updateMenuColor(destination) {
    const div = destination.item?.id || destination;
    const aboutLink = document.getElementById('aboutLink');
    const portfolioLink = document.getElementById('portfolioLink');
    const contactLink = document.getElementById('contactLink');

    if (div == "about") {
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


// onload animation
setTimeout(() => {
    const nameElement = document.querySelector("#about .name");
    nameElement.style.top = '50%';
    const txtElement = document.querySelector("#about p");
    txtElement.style.top = '50%';
}, 300);

// carousel images change
function updateCarouselImages() {
    document.querySelectorAll('#carousel-inner div').forEach(div => {
        let interval;
        let currentImageIndex = 0;

        const changeImage = () => {
            let imgElement = div.querySelector('img');
            let imagePaths = div.getAttribute('data-images').split(',');

            if (imagePaths.length > 1) {
                currentImageIndex = (currentImageIndex + 1) % imagePaths.length;
                imgElement.src = imagePaths[currentImageIndex];
            }
        };

        if (window.innerWidth > 600) {
            div.addEventListener('mouseenter', () => {
                clearInterval(interval);
                changeImage();
                interval = setInterval(changeImage, 800);
            });
            div.addEventListener('mouseleave', () => {
                clearInterval(interval);
                currentImageIndex = 0;
                let imgElement = div.querySelector('img');
                let imagePaths = div.getAttribute('data-images').split(',');
                imgElement.src = imagePaths[0];
            });
        }

        // Additional functionality for smaller screens
        if (window.innerWidth <= 600) {
            clearInterval(interval);
            interval = setInterval(changeImage, 1500); // Change images every 1.5 seconds
        }
    });
}

// Run the function on load and on resize
updateCarouselImages();
window.addEventListener('resize', updateCarouselImages);


// contact blur
document.querySelector('#mail').addEventListener('mouseenter', function() {
    document.querySelector('#mailBlur').classList.add('blur');
});

document.querySelector('#mail').addEventListener('mouseleave', function() {
    document.querySelector('#mailBlur').classList.remove('blur');
});




// Handle gallery icon click event
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('gallery-modal');
    const galleryImages = document.getElementById('gallery-images');
    const galleryProjectName = document.getElementById('gallery-project-name');
    const closeBtn = document.querySelector('.modal .close');
    const leftArrow = document.querySelector('.arrow.left');
    const rightArrow = document.querySelector('.arrow.right');
    const indicator = document.getElementById('gallery-indicator');

    let imageFiles = [];
    let projectName = "";
    let currentIndex = 0;
    let isModalOpen = false; // Track if the modal is open

    document.querySelectorAll('.galleryClick').forEach(function(icon) {
        icon.addEventListener('click', function(event) {
            event.stopPropagation();
            projectName = icon.dataset.projectPath;
            galleryProjectName.textContent = projectName; // Set the project name
            imageFiles = JSON.parse(icon.getAttribute('data-image-files'));
            currentIndex = 0;
            populateGallery();
            showModal();
        });
    });

    function populateGallery() {
        galleryImages.innerHTML = ''; // Clear existing images
        imageFiles.forEach(file => {
            const img = document.createElement('img');
            img.src = file;
            galleryImages.appendChild(img);
        });
        // Clone the first and last images to enable seamless scrolling
        const firstImg = galleryImages.children[0].cloneNode(true);
        const lastImg = galleryImages.children[galleryImages.children.length - 1].cloneNode(true);
        galleryImages.appendChild(firstImg);
        galleryImages.insertBefore(lastImg, galleryImages.children[0]);
        updateGalleryPosition();
        updateArrowVisibility();
        updateIndicator(); // Update indicator on gallery initialization
    }

    function showModal() {
        isModalOpen = true; // Set modal as open
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.style.opacity = '1'; // Fade-in effect
        }, 10); // Small delay for the opacity transition to work
        disableCarousel(); // Disable carousel when modal is open
    }

    function hideModal() {
        isModalOpen = false; // Set modal as closed
        modal.style.opacity = '0'; // Fade-out effect
        setTimeout(() => {
            modal.style.display = 'none';
        }, 500); // Match the CSS transition duration
        enableCarousel(); // Re-enable carousel when modal is closed
    }

    function updateGalleryPosition() {
        galleryImages.style.transform = `translateX(-${(currentIndex + 1) * 100}%)`;
        updateArrowVisibility();
        updateIndicator(); // Update indicator when position changes
    }

    function showNextImage() {
        if (currentIndex < imageFiles.length - 1) {
            currentIndex++;
            updateGalleryPosition();
        }
    }

    function showPrevImage() {
        if (currentIndex > 0) {
            currentIndex--;
            updateGalleryPosition();
        }
    }

    function updateArrowVisibility() {
        // Hide left arrow if on the first image
        if (currentIndex === 0) {
            leftArrow.style.display = 'none';
        } else {
            leftArrow.style.display = 'block';
        }
        
        // Hide right arrow if on the last image
        if (currentIndex === imageFiles.length - 1) {
            rightArrow.style.display = 'none';
        } else {
            rightArrow.style.display = 'block';
        }
    }

    function updateIndicator() {
        indicator.textContent = `${currentIndex + 1}/${imageFiles.length}`;
    }

    // Disable carousel functionality
    function disableCarousel() {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchmove', handleTouchMove);
    }

    // Enable carousel functionality
    function enableCarousel() {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('touchstart', handleTouchStart);
        document.addEventListener('touchmove', handleTouchMove);
    }

    // Mouse and touch event handlers
    function handleMouseMove(e) {
        if (!isTouchDevice) {
            document.addEventListener('mousemove', (e) => {
                const mouseX = e.clientX;
                scrollX = (mouseX / window.innerWidth) * carouselWidth;
                carouselInner.style.transform = `translateX(${-scrollX}px)`;
            });
        }
    }

    function handleTouchStart(e) {
        if (isTouchDevice) {
            isTouching = true;
            startX = e.touches[0].clientX;
            lastTouchX = startX;
            velocity = 0;
            carouselInner.style.transition = 'none'; // Disable transition during touch move
            clearInterval(momentumInterval); // Stop any ongoing momentum
        }
    }

    function handleTouchMove(e) {
        if (isTouching) {
            const touchX = e.touches[0].clientX;
            const deltaX = startX - touchX;
            startX = touchX;
            scrollX += deltaX;
    
            // Calculate velocity
            velocity = touchX - lastTouchX;
            lastTouchX = touchX;
    
            // Prevent scrolling beyond limits
            if (scrollX < 0) scrollX = 0;
            if (scrollX > carouselWidth) scrollX = carouselWidth;
    
            // Apply transformation
            carouselInner.style.transform = `translateX(${-scrollX}px)`;
        }
    }



    // Initial enable of carousel (on page load)
    enableCarousel();

    // Close button functionality
    closeBtn.addEventListener('click', hideModal);

    // Arrow click functionality
    leftArrow.addEventListener('click', showPrevImage);
    rightArrow.addEventListener('click', showNextImage);

    // Swipe functionality for touch devices
    let touchStartX = 0;

    galleryImages.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
    });

    galleryImages.addEventListener('touchend', function(e) {
        let touchEndX = e.changedTouches[0].clientX;
        if (touchStartX - touchEndX > 50) {
            showNextImage();
        } else if (touchEndX - touchStartX > 50) {
            showPrevImage();
        }
    });
});



//game
const phoneElement = document.getElementById('mobile');
const correctNumber = "902172705";
const anglePerNumber = 36;
let isDragging = false;
let initialAngle = 0;
let currentAngle = 0;
let guessedDigits = "";
let lastTime = 0;
let lastX = 0;
let lastY = 0;
let img; // Declare img here

// Function to initialize the knob
function createKnob() {
    if (img) img.remove(); // Ensure the previous knob is removed before creating a new one
    currentAngle = 0;

    img = document.createElement('img'); // Now create the knob
    img.src = 'assets/images/knob.svg';
    img.id = 'knob';
    if (window.innerWidth > 600) {
        img.style.width = '140px';
    } else {
        img.style.width = '160px';
    }
    img.style.userSelect = 'none';
    img.style.transform = 'rotate(0deg)';
    document.querySelector('.game').appendChild(img);

    img.addEventListener('dragstart', (event) => {
        event.preventDefault();
    });

    img.addEventListener('mousedown', startDragging);
    img.addEventListener('touchstart', startDragging);

    document.addEventListener('mousemove', rotateImage);
    document.addEventListener('touchmove', rotateImage);

    document.addEventListener('mouseup', stopDragging);
    document.addEventListener('touchend', stopDragging);
}

// Initial knob creation
createKnob();

function startDragging(event) {
    if (typeof fullpage_api !== 'undefined') {
        fullpage_api.setAllowScrolling(false);
    }
    if (guessedDigits.length === correctNumber.length) return; // Do nothing if the number is already guessed
    isDragging = true;
    const rect = img.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const clientY = event.touches ? event.touches[0].clientY : event.clientY;

    initialAngle = Math.atan2(clientY - centerY, clientX - centerX) - currentAngle;

    // Track the initial position and time for speed calculation
    lastTime = event.timeStamp;
    lastX = clientX;
    lastY = clientY;
}

function rotateImage(event) {
    if (!isDragging || guessedDigits.length === correctNumber.length) return; // Do nothing if the number is already guessed

    const rect = img.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const clientY = event.touches ? event.touches[0].clientY : event.clientY;

    const angle = Math.atan2(clientY - centerY, clientX - centerX);
    currentAngle = angle - initialAngle;

    // Calculate the speed
    const currentTime = event.timeStamp;
    const deltaX = clientX - lastX;
    const deltaY = clientY - lastY;
    const deltaTime = currentTime - lastTime;

    const speedX = Math.abs(deltaX / deltaTime) * 1000;
    const speedY = Math.abs(deltaY / deltaTime) * 1000;

    lastTime = currentTime;
    lastX = clientX;
    lastY = clientY;

    // If speed exceeds 1400 pixels per second, throw the knob away
    if (speedX > 1400 || speedY > 1400) {
        throwKnobAway();
        return;
    }

    // Convert currentAngle to degrees
    let currentDegrees = (currentAngle * (180 / Math.PI)) % 360;
    if (currentDegrees < 0) currentDegrees += 360;

    // Adjust the snapped angle to make 0 at the top and 1 at -36 degrees
    let snappedAngle = Math.round(currentDegrees / anglePerNumber) * anglePerNumber;

    // Determine the guessed number based on the snapped angle
    let guessedNumberIndex = (snappedAngle / anglePerNumber) % 10;
    let guessedNumber = (10 - guessedNumberIndex) % 10;

    // Check if the guessed number matches the next required digit in the correct number
    if (correctNumber[guessedDigits.length] == guessedNumber) {
        guessedDigits += guessedNumber;
        let updatedNumber = `+421${guessedDigits}${'_'.repeat(9 - guessedDigits.length)}`;
        
        // Remove span from the last guessed digit and add it to the next underscore
        updatedNumber = updatedNumber.replace('_', '<span>_</span>');
        phoneElement.innerHTML = updatedNumber;
    }

    img.style.transform = `rotate(${snappedAngle}deg)`;

    // If all digits are guessed, add href, remove span, and enable hover effect
    if (guessedDigits.length === correctNumber.length) {
        phoneElement.innerHTML = `+421${guessedDigits}`;
        phoneElement.href = "tel:+421902172705";
        phoneElement.classList.add('hover-enabled');
        const slowDownMessage = document.getElementById("slowDown");
        slowDownMessage.innerText = ":)";

        slowDownMessage.style.display = "block";
    }
}

function throwKnobAway() {
    isDragging = false;

    // Show the "Slow down!" message
    const slowDownMessage = document.getElementById("slowDown");
    slowDownMessage.style.display = "block";

    // Apply an animation to move the knob off the screen
    img.style.transition = "transform 1s ease-out";

    // Function to generate a random number between min and max (inclusive)
    function getRandomNumber(min, max, excludeMin, excludeMax) {
        let randomNum;
        do {
            randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (randomNum >= excludeMin && randomNum <= excludeMax);
        return randomNum;
    }
    
    // Generate random values for translateX and translateY
    const randomTranslateX = getRandomNumber(-200, 200, -99, 99);
    const randomTranslateY = getRandomNumber(-200, 200, -99, 99);
    const rotationDegrees = 720; // Fixed rotation value

    // Apply the transform property with random values
    img.style.transform = `translateX(${randomTranslateX}vw) translateY(${randomTranslateY}vh) rotate(${rotationDegrees}deg)`;


    // After 3 seconds, remove the knob and recreate it
    setTimeout(() => {
        if (img) img.remove(); // Ensure the knob is removed
        slowDownMessage.style.display = "none";

        // Recreate the knob after removing the message
        createKnob();
    }, 3000);
}

function stopDragging() {
    isDragging = false;

    if (typeof fullpage_api !== 'undefined') {
        fullpage_api.setAllowScrolling(true);
    }
}



