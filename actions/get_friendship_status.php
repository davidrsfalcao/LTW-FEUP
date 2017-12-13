<?php
include_once(__DIR__ . '/../config/init.php');
include_once('../database/friendship.php');

$user2 = $_POST['user2'];
$user = $_SESSION['username'];

$friends = are_friends($user, $user2);

if($friends > 0){
    echo 1;
}
else {
    $request = sent_request($user, $user2);
    if($request > 0){
        echo 2;
    }
    else echo 0;
}
?>
