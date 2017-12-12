<?php
include_once(__DIR__ .'/../config/init.php');
include_once('../database/list.php');

$id = (int)$_POST['id'];
$token = $_POST['validation'];

if(isset($_SESSION['token']) && ($token == $_SESSION['token']) && $token!= null){
    echo delete_list($id);
    echo "Success";
    exit();
}
else {
    echo "Access Denied";
    exit();
}

?>
