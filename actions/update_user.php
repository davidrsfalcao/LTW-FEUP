<?php
include_once(__DIR__ .'/../config/init.php');
include_once('../database/user.php');

$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$user = $_SESSION['username'];

global $dbh;

$stmt = $dbh->prepare("UPDATE User SET first_name = :first_name , last_name = :last_name WHERE username = :username");

$stmt->bindValue(':first_name', $first_name);
$stmt->bindValue(':last_name', $last_name);
$stmt->bindValue(':username', $user);
$stmt->execute();

header('Location: ../profile.php?username=' . $user);
?>
