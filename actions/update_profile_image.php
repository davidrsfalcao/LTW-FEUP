<?php
    include_once(__DIR__ . '/../config/init.php');
    $user = $_SESSION['username'];
    rename('../images/avatars/tmp/' . $user .'.jpg', '../images/avatars/' . $user .'.jpg');
    $_SESSION['flag_upload'] = false;
    header('Location: ../profile.php?username=' . $user);
?>
