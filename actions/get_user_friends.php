<?php
include_once(__DIR__ . '/../config/init.php');
include_once('../database/friendship.php');

$user = $_SESSION['username'];

$friends= get_user_friends($user);
$number = count($friends);


for ($i=0; $i < $number; $i++) {
    display_friend($friends[$i]);
}

function display_friend($friend){
    echo '<div class="list" onclick="redirectProfile(this.childNodes[0])">';
    if (file_exists ("../images/avatars/". $friend['user2'] . ".jpg" )){
        $img='images/avatars/' . $friend['user2'] . '.jpg';
    }
    else {
        $img = 'images/avatars/avatar.jpg';
    }
    echo '<div class="list_friend" style="background: #f3f3f3 url('. $img .') no-repeat center center;';
    echo 'background-size: cover;">';
    echo '<h2 class="friend_name">'.$friend['user2'].'</h2>';
    echo '</div>';
    echo '</div>';
}

?>
