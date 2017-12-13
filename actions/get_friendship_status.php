<?php
include_once(__DIR__ . '/../config/init.php');
include_once('../database/user.php');

$user2 = $_POST['user2'];
$user = $_SESSION['username'];

$sugest = get_sugestions_user($input, $user);
$number =  count($sugest);

for ($i=0; $i < $number ; $i++) {
    $user = $sugest[$i];
    echo $user['username'] . "#";
}
?>
