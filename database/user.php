<?php
function createUser($first_name , $last_name, $username, $password) {
    global $dbh;

    $options = ['cost' => 12];
    $hash = password_hash($password, PASSWORD_DEFAULT, $options);

    $stmt = $dbh->prepare('INSERT INTO User VALUES (?, ?, ?, ?)');
    $stmt->execute(array($username, $first_name , $last_name, $hash));
}

function verifyUser($username, $password) {
    global $dbh;
    $stmt = $dbh->prepare('SELECT * FROM User WHERE username = ?');
    $stmt->execute(array($username));
    $user = $stmt->fetch();
    return ($user !== false && password_verify($password, $user['password']));
}

function userExists($username){
    global $dbh;
    $stmt = $dbh->prepare('SELECT * FROM User WHERE Username = ?');
    $stmt->execute(array($username));
    $result = $stmt->fetchAll();
    if ($result){
        return true;
    }
    return false;

}

?>
