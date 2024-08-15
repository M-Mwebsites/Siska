<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pavol ŠIŠKA</title>

    <link rel="icon" type="image/png" href="assets/images/favicon.png" />

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">

    <link href="assets/css/fullpage.css" rel="stylesheet">
    <script src="assets/js/fullpage.js"></script>

    <script src="assets/js/three.r134.min.js"></script>
    <script src="assets/js/vanta.birds.min.js"></script>

    <link href="assets/css/style.css" rel="stylesheet">
</head>
<body>
    <div id="birds"></div>
    
    <div id="fullpage">
        <div class="section" id="about">
            <p class="text">Venujem sa premenou vášho sna o atypickom objekte na skutočný hmatateľný produkt vašich túžob.  Začínajúc rozhovorom, obhliadkou, nákresmi, projektom, statikou, cez voľby materiálov až po samotnú realizáciu.</p>
            <img src="assets/images/name.svg">
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
                            echo '<div id="' . strtolower($projectName) . '" data-images="' . htmlspecialchars($imagePaths, ENT_QUOTES, 'UTF-8') . '">';
                            echo '<div class="overlay"></div>';
                            echo '<p>' . strtoupper($projectName) . '</p>';
                            echo '<img src="' . $imageFiles[0] . '" alt="' . htmlspecialchars($projectName) . '">';
                            if (strtolower($projectName) === 'dubodom') {
                                echo '<a href="https://www.dubodom.sk/" class="project-link" target="_blank">dubodom.sk</a>';
                            }
                            echo '</div>';
                        }
                    }
                ?>
                </div>
            </div>
        </div>
        
        <div class="section" id="contact">
            <!-- Contact section content -->
        </div>
    </div>

    <div class="menu">
        <p onclick="scrollToSection('about')" id="aboutLink">O mne</p>
        <p onclick="scrollToSection('portfolio')" id="portfolioLink">Portfólio</p>
        <p onclick="scrollToSection('contact')" id="contactLink">Kontakt</p>
    </div>

    <script src="assets/js/script.js"></script>
</body>
</html>
