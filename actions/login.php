<?php
session_start();
$username = $_GET['username'];
$password = $_POST['password'];
$token = $_POST['validation'];

if(isset($_SESSION['token']) && ($token == $_SESSION['token']) && $token!= null){
    $_SESSION['username'] = $username;
    header('Location: ../index.php?username=' . $username);
    exit();
}
else {
    echo ('<script>alert("Access Denied")</script><script>window.location.replace("../index.php")</script>');
    exit();
}
?>
