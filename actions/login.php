<?php
session_start();
$username = $_GET['username'];
$_SESSION['username'] = $username;
header('Location: ../index.php?username=' . $username);
exit();
?>
