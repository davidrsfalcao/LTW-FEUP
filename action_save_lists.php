<?php
include_once('config/init.php');
include_once('database/list.php');
$user = $_GET['username'];
$list_name = $_GET['list_name'];
$reminder_date = $_GET['reminder_date'];
$type = $_GET['type'];
$content = $_GET['content'];
$listID = getLastId('List')+1;
$itemID = getLastId('Item')+1;

createList($listID, $user, $list_name, $reminder_date, $reminder_date, $type);

if($type == 2){
    include_once('config/init.php');
    rename('images/list/tmp/tmp.jpg', 'images/list/' . $itemID .'.jpg');
    createItem($itemID,$listID, $content);
}
else if($type == 0){
    createItem($itemID,$listID, $content);
}
echo "Sucess";
?>