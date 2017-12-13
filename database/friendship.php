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
    $stmt->execute(array($id+1, $user2, $user1));
}

function get_user_friends($user){
    global $dbh;
    $stmt = $dbh->prepare('SELECT * FROM Friendship WHERE user1 = ?');
    $stmt->execute(array($user));
    $friends = $stmt->fetchAll();

    return $friends;
}

function are_friends($user1, $user2){
    global $dbh;
    $stmt = $dbh->prepare('SELECT COUNT(*) FROM Friendship WHERE user1 = ? AND user2 = ?');
    $stmt->execute(array($user1, $user2));
    $friends = $stmt->fetch();

    return $friends;
}
?>
