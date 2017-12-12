<?php
include_once(__DIR__ . '/../config/init.php');

generate_random_token();

function generate_random_token(){
    $token = md5(uniqid(rand(), true));
    $_SESSION['token'] = $token;
    echo $token;
}
?>
