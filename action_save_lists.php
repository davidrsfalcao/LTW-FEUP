<?php
include_once('config/init.php');
$user = $_GET['username'];
$list_name = $_GET['list_name'];
$reminder_date = $_GET['reminder_date'];
$type = $_GET['type'];
$content = $_GET['content'];
echo $content;
echo $type;

function uploadPhoto(){
    include_once('config/init.php');
    rename('images/list/tmp/tmp.jpg', 'images/list/' . $idlist .'.jpg');
    $_SESSION['flag_upload'] = false;
    header('Location: profile.php?username=' . $user);
}


?>
