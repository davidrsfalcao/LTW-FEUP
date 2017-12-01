<?php
    include_once('config/init.php');
    $user = $_SESSION['username'];
    include_once('templates/clean_tmp_folder.php');
    unlinkRecursive('images/avatars/tmp/', false );
    $_SESSION['flag_upload'] = false;
    header('Location: profile.php?username=' . $user);
?>
