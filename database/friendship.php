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

function add_friendship($id, $user1, $user2){
    global $dbh;
    $stmt = $dbh->prepare('INSERT INTO Friendship VALUES (?, ?, ?)');
    $stmt->execute(array($id, $user1, $user2));
}
?>
