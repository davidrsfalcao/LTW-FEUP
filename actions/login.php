<?php
session_start();
$username = $_GET['username'];
$token = $_POST['validation'];

if(isset($_SESSION['token']) && ($token == $_SESSION['token']) && $token!= null){
    $_SESSION['username'] = $username;
    header('Location: ../index.php?username=' . $username);
    exit();
}
else {
    echo "Access Denied";
    exit();
}
?>
