<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ŠIŠKA</title>

    <link rel="icon" type="image/png" href="assets/images/favicon.png" />

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">

    <link href="assets/css/fullpage.css" rel="stylesheet">
    <script src="assets/js/fullpage.js"></script>

    <link href="assets/css/style.css" rel="stylesheet">
</head>
<body>
    
    <div id="fullpage">
        <div class="section" id="about">
            <p class="text">I design, I build. <span>I design and build.</span></p>
            <p class="name">ŠIŠKA</p>
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
            </div>
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
