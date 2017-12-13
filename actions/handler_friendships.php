<?php
include_once(__DIR__ . '/../config/init.php');
include_once('../database/friendship.php');

$user2 = $_POST['user2'];
$user = $_SESSION['username'];
$type = (int) $_POST['type'];

if($type == 0){
    send_friendship_request($user, $user2);
}
else if($type == 1){
    delete_friendship($user, $user2);
}
else if($type == 2){
    delete_friendship_request($user, $user2);
}
?>
