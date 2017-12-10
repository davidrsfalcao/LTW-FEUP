<?php
include_once('config/init.php');
include_once('database/friendship.php');

$user1 = $_GET['user1'];
echo $user1;
$user2 = $_GET['user2'];
echo $user2;
$id = getLastID('Friendship')+1;

add_friendship($id, $user1, $user2);

echo "Success";
?>
