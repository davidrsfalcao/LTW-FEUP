<?php
include_once('config/init.php');
include_once('database/user.php');

$username = trim(strip_tags($_POST['username']));
$password = $_POST['password'];

if (verifyUser($username, $password)) {
    $_SESSION['username'] = $username;
    $_SESSION['first_name'] = get_user_first_name($username);
    $_SESSION['last_name'] = get_user_last_name($username);
    $_SESSION["flag_password"] = "correct";
    $_SESSION["flag_username"] = "correct";
    header('Location: index.php');


}
else {
    if(userExists($username)){
        $_SESSION["flag_username"] = $username;
        $_SESSION["flag_password"] = "fail";
    }
    else {
        $_SESSION["flag_username"] = "fail";
    }
     header('Location: ' . $_SERVER['HTTP_REFERER']);
}
?>
