<?php
include_once(__DIR__ .'/../config/init.php');
include_once('../database/list.php');

$id = (int)$_GET['id'];
$visibility = (int)$_GET['visibility'];
$user = $_SESSION['username'];
$token = $_GET['validation'];

if(isset($_SESSION['token']) && ($token == $_SESSION['token']) && $token!= null){
    update_item($id, $visibility);
    echo "Success";
    exit();
}
else {
    echo "Access Denied";
    exit();
}
?>
