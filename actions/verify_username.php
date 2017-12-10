<?php
include_once(__DIR__ . '/../config/init.php');
include('../database/user.php');

$user = $_GET['username'];
if (userExists($user)){
    echo true;
}
else echo false;
?>
