<?php
include_once('config/init.php');
include('database/user.php');

$user = $_POST['username'];
$password = $_POST['password'];

if (verifyUser($user, $password)){
    echo true;
}
else echo false;
?>
