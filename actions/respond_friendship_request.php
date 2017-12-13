<?php
include_once(__DIR__ . '/../config/init.php');
include_once('../database/friendship.php');

$res = $_GET['response'];
$user1 = $_GET['user'];
$user2 = $_SESSION['username'];
$id = (int)$_GET['id'];


if($res == "true"){
    delete_friendship_request($user1, $user2);
    $next_id = getLastId('Friendship') + 1;
    add_friendship($next_id, $user1, $user2);
}
else {
    delete_friendship_request($user1, $user2);
}

?>
