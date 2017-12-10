<?php
    include_once('config/init.php');
    include_once('actions/clean_tmp_folder.php');
    unlinkRecursive('images/avatars/tmp/', false );
    include('templates/nav_bar.php');
    if (!isset($_SESSION['username'])){
        include('templates/main_page.php');
        include('templates/footer.php');
    }
    else {
        include('templates/lists_page.php');
        include('templates/footer_logged.php');
    }
    $_SESSION['flag_upload'] = false;
?>
