<?php
include_once(__DIR__ .'/../config/init.php');
include_once('../database/user.php');

$user = $_SESSION['username'];
$password = $_POST['password'];

update_password($user, $password);

echo "Success";
?>