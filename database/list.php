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
?>
