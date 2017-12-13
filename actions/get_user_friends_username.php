<?php
include_once(__DIR__ . '/../config/init.php');
include_once('../database/friendship.php');

$user = $_SESSION['username'];

$friends= get_user_friends($user);
$number = count($friends);

for ($i=0; $i < $number; $i++) {
    echo $friends[$i]['user2']."##";
}
?>
