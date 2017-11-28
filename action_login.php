<?php
include_once('config/init.php');
include_once('database/user.php');

$username = $_GET['username'];
$password = $_POST['password'];

if (verifyUser($username, $password)) {
    $_SESSION['username'] = $username;
    $_SESSION['flag_error'] = false;
    header('Location: index.php?username=' . $username);


}
else {
    $_SESSION['flag_error'] = true;
    header('Location: login_step2.php?username=' . $username);
}
?>
