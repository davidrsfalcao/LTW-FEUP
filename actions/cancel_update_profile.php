<?php
    include_once(__DIR__ . '/../config/init.php');
    $user = $_SESSION['username'];
    include_once('clean_tmp_folder.php');
    unlinkRecursive('../images/avatars/tmp/', false );
    $_SESSION['flag_upload'] = false;
    header('Location: ../profile.php?username=' . $user);
?>
