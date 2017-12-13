<?php
include_once(__DIR__ . '/../config/init.php');
include_once('../database/friendship.php');

$user = $_SESSION['username'];
$requests = get_user_friend_requests($user);

$number = count($requests);

for ($i=0; $i < $number; $i++) {
    echo $requests[$i]['ID'] . "##" .  $requests[$i]['user_from'] . "$$";
}
?>
