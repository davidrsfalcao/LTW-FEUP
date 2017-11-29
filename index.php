<?php
    include_once('config/init.php');
    include('templates/nav_bar.php');
    if (!isset($_SESSION['username'])){
        include('templates/main_page.php');
        include('templates/footer.php');
    }
    else {
        include('templates/footer_logged.php');
    }
    $_SESSION["flag_error"] = false;
?>
