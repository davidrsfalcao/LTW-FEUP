<?php
function generate_random_token(){
    $token = md5(uniqid(rand(), true));
    $_SESSION['token'] = $token;
    return $token;
}
?>
