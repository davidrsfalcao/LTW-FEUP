<?php
function getLastId($type){
    global $dbh;

    $stmt = $dbh->prepare('SELECT MAX(ID) FROM ' .$type);
    $stmt->execute();
    $max = $stmt->fetch();

    if($max === false){
        return 0;
    }
    else return reset($max);
}

function createList($ID, $creator_ID, $title, $creation_date, $reminder_date, $type){
    global $dbh;
    $stmt = $dbh->prepare('INSERT INTO List VALUES (?, ?, ?, ?, ?, ?)');
    $stmt->execute(array($ID, $creator_ID, $title, $creation_date, $reminder_date, $type));
}

function createItem($ID,$list_ID, $content){
    global $dbh;
    $stmt = $dbh->prepare('INSERT INTO Item VALUES (?, ?, ?, 1)');
    $stmt->execute(array($ID,$list_ID, $content));
}

function getListsOfUser($user, $order, $orderType){
    global $dbh;
    $dtbO = ' ORDER BY ';

    switch ($order) {
        case 1:
            $dtbO =  $dtbO . ' LOWER(title)';
            break;

        case 2:
            $dtbO =  $dtbO . ' creation_date';
            break;

        case 3:
            $dtbO =  $dtbO . ' reminder_date';
            break;
    }

    if($order == 4){
        $dtbO = ' AND title LIKE "' . $orderType . '%"';
    }
    else switch ((int)$orderType) {
        case 1:
            $dtbO =  $dtbO . ' ASC';
            break;

        case 2:
            $dtbO =  $dtbO . ' DESC;';
            break;
    }

    $stmt = $dbh->prepare('SELECT * FROM List WHERE creator_ID = ?' . $dtbO);
    $stmt->execute(array($user));
    $lists = $stmt->fetchAll();
    return $lists;
}

function getItensOfList($list_id){
    global $dbh;
    $stmt = $dbh->prepare('SELECT * FROM Item WHERE list_ID = ?');
    $stmt->execute(array($list_id));
    $itens = $stmt->fetchAll();
    return $itens;
}
?>
