<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SISKA</title>

    <meta name="description" content="Content goes here...">
    <meta name="keywords" content="HTML, CSS, JavaScript">
    <meta property="og:image" content="assets/images/favicon.png">
    <meta property="og:url" content="https://pavolsiska.com">
    <meta name="twitter:card" content="assets/images/favicon.png">

    <link rel="icon" type="image/png" href="assets/images/favicon.png" />

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Golos+Text:wght@400..900&family=Montagu+Slab:opsz,wght@16..144,100..700&family=Unkempt:wght@400;700&display=swap" rel="stylesheet">

    <link href="assets/css/fullpage.css" rel="stylesheet">
    <script src="assets/js/fullpage.js"></script>

    <link href="assets/css/style.css" rel="stylesheet">
</head>
<body>
    <img src="assets/images/loading.gif" style="display: none;">
    <img src="assets/images/pointer.svg" style="display: none;">
    <img src="assets/images/knob.svg" style="display: none;">
    
    <div id="loading"></div>

    <div id="fullpage">
        <div class="section" id="hero">
            <p class="text">I design. I build. I design & build</p>
            <p class="name">S<span>P</span>I<span>A</span>S<span>L</span>K<span>O</span>A</p>
        </div>

        <div class="section" id="about">
            <img id="meImage" src="assets/images/siska.gif">
            <p class="text">
                <span>Hi, I am Palo,</span>
                After graduation at TU in Vienna I am designing and of course sometimes also building my proposals for over 8 years for now.<br>
                With various domestic and international experiences I have already achieved skills in architecture, design, craftsmanship and building management as well.<br>
                My design philosophy is to achieve, through my designs, strong bonding and sensible adhesive between humans and their surroundings.<br>
                Let me help you as well.
            </p>
        </div>

        <div class="section" id="portfolio">
            <div class="carousel">
                <div id="carousel-inner">
                <?php
                    $portfolioDir = 'assets/portfolio';
                    $projects = array_filter(glob($portfolioDir . '/*'), 'is_dir');
                    foreach ($projects as $projectPath) {
                        $projectName = substr(basename($projectPath), 3);
                        $imageFiles = glob($projectPath . '/*.{jpg,jpeg,png,gif}', GLOB_BRACE);
                        sort($imageFiles);
                        $imagePaths = implode(',', $imageFiles);
                        if (!empty($imageFiles)) {
                            echo '<div class="galleryClick" id="' . strtolower($projectName) . '" data-images="' . htmlspecialchars($imagePaths, ENT_QUOTES, 'UTF-8') . '" data-project-path="' . htmlspecialchars($projectName, ENT_QUOTES, 'UTF-8') . '" data-image-files="' . htmlspecialchars(json_encode($imageFiles), ENT_QUOTES, 'UTF-8') . '">';
                            echo '<div class="overlay"></div>';
                            echo '<p>' . strtoupper($projectName) . '</p>';
                            echo '<img src="' . $imageFiles[0] . '" alt="' . htmlspecialchars($projectName) . '">';
                            $linkFilePath = $projectPath . '/link.txt';
                            if (file_exists($linkFilePath)) {
                                $linkLines = file($linkFilePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
                                if (count($linkLines) >= 2) {
                                    $href = htmlspecialchars($linkLines[0], ENT_QUOTES, 'UTF-8');
                                    $linkText = htmlspecialchars($linkLines[1], ENT_QUOTES, 'UTF-8');
                                    echo '<a href="' . $href . '" class="project-link" target="_blank">' . $linkText . '</a>';
                                }
                            }
                            echo '</div>';
                        }
                    }
                ?>
                </div>
            </div>
        </div>
        
        <div class="section" id="contact">
            <p id="mailBlur">Get in touch</p>
            <a href="mailto:pavol.siska@gmail.com" id="mail">pavol.siska@gmail.com</a>
            <div class="game">
                <a id="mobile">+421<span>_</span>________</a>
                <img src="assets/images/pointer.svg" class="pointer">
                <p id="slowDown">Slow down!</p>
                <p id="smile">:)</p>
            </div>
            <img src="assets/images/map.gif" class="giif">
            <!-- <p class="place">Marianka, Slovakia</p> -->
        </div>
    </div>

    <div class="menu">
        <p onclick="scrollToSection('about')" id="aboutLink">About</p>
        <p onclick="scrollToSection('portfolio')" id="portfolioLink">Portfolio</p>
        <p onclick="scrollToSection('contact')" id="contactLink">Contact</p>
    </div>

    <!-- Gallery Modal Structure -->
    <div id="gallery-modal" class="modal">
        <div id="gallery-project-name" class="project-name">asdf</div>
        <span class="close">&times;</span>
        <div class="gallery-container">
            <div id="gallery-images" class="gallery-images">
                <!-- Images will be inserted here dynamically -->
            </div>
            <div class="arrow left">&lt;</div>
            <div class="arrow right">&gt;</div>
        </div>
        <div id="gallery-indicator" class="gallery-indicator"></div>
    </div>

    <script src="assets/js/script.js"></script>
</body>
</html>
