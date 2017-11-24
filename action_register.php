<?php

include_once('config/init.php');
include_once('database/user.php');


$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$username = trim(strip_tags($_POST['username']));
$password = $_POST['password'];

createUser($first_name, $last_name, $username, $password);

header('Location: ' . $_SERVER['HTTP_REFERER']);
?>
