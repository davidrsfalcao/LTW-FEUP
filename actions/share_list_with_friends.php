<?php
include_once(__DIR__ .'/../config/init.php');
include_once('../database/list.php');

$id= $_GET['id'];
$tmp = $_GET['friends'];
$friends = explode("/", $tmp);

$number = count($friends);
for ($i=0; $i < $number; $i++) {
    share_list_user($id, $friends[$i]);
}
?>
