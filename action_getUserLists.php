<?php
include_once('config/init.php');
include_once('database/list.php');
$user = $_SESSION['username'];
$lists = getListsOfUser($user);

$number = count($lists);
for ($i=0; $i <$number ; $i++) {
    sendList($lists[$i]);

    if($i != $number -1){
        echo "#END_LIST#";
    }
}

function sendList($list){
    echo $list['ID'] . " ";
    echo $list['creator_ID'] . " ";
    echo $list['title'] . " ";
    echo $list['creation_date'] . " ";
    echo $list['reminder_date'] . " ";
    echo $list['type'];

    $itens = getItensOfList($list['ID']);
    $number = count($itens);
    for ($i=0; $i <$number ; $i++) {
        echo "#ITEM#";
        sendItem($itens[$i]);

    }
}

function sendItem($item){
    echo $item['ID'] . " ";
    echo $item['list_ID'] . " ";
    echo $item['content'] . " ";
    echo $item['visibility'];
}
?>
