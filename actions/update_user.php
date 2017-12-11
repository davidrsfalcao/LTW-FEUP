<?php
include_once(__DIR__ .'/../config/init.php');
include_once('../database/user.php');

$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$user = $_SESSION['username'];

update_user($user, $first_name, $last_name);

header('Location: ../profile.php?username=' . $user);
?>
