<?php
include_once(__DIR__ . '/../config/init.php');
include_once('../database/user.php');

$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$username = trim(strip_tags($_POST['username']));
$password = $_POST['password'];
createUser($first_name, $last_name, $username, $password);
$_SESSION['username'] = $username;
header('Location: ../index.php?username=' . $username);
?>
