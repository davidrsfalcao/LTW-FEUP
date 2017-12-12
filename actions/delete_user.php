<?php
include_once(__DIR__ .'/../config/init.php');
include_once('../database/user.php');

$user = $_SESSION['username'];

delete_user($user);

echo "Success";
?>