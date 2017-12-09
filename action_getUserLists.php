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
    echo $list['ID'] . "#SPACE#";
    echo $list['creator_ID'] . "#SPACE#";
    echo $list['title'] . "#SPACE#";
    echo $list['creation_date'] . "#SPACE#";
    echo $list['reminder_date'] . "#SPACE#";
    echo $list['type'];

    $itens = getItensOfList($list['ID']);
    $number = count($itens);
    for ($i=0; $i <$number ; $i++) {
        echo "#ITEM#";
        sendItem($itens[$i]);
    }
}

function sendItem($item){
    echo $item['ID'] . "#SPACE#";
    echo $item['list_ID'] . "#SPACE#";
    echo $item['content'] . "#SPACE#";
    echo $item['visibility'];
}
?>
