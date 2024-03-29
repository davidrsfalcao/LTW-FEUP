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

function get_user_first_name($username){
    global $dbh;
    $stmt = $dbh->prepare('SELECT first_name FROM User WHERE username = ?');
    $stmt->execute(array($username));
    $first_name = $stmt->fetch();

    return reset($first_name);
}

function get_user_last_name($username){
    global $dbh;
    $stmt = $dbh->prepare('SELECT last_name FROM User WHERE username = ?');
    $stmt->execute(array($username));
    $last_name = $stmt->fetch();

    return reset($last_name);
}

function update_user($user, $first_name, $last_name){
    global $dbh;

    $stmt = $dbh->prepare("UPDATE User SET first_name = :first_name , last_name = :last_name WHERE username = :username");
    $stmt->bindValue(':first_name', $first_name);
    $stmt->bindValue(':last_name', $last_name);
    $stmt->bindValue(':username', $user);
    $stmt->execute();
}

function update_password($user, $password){
    global $dbh;

	$options = ['cost' => 12];
    $stmt = $dbh->prepare("UPDATE User SET password = :password WHERE username = :username");
    $stmt->bindValue(':username', $user);
	$hash = password_hash($password, PASSWORD_DEFAULT, $options);
	$stmt->bindValue(':password', $hash );
    $stmt->execute();
}

function delete_user($user){
    global $dbh;

    $stmt = $dbh->prepare("DELETE FROM User WHERE username = :username");
    $stmt->bindValue(':username', $user);
    $stmt->execute();
}

function get_sugestions_user($input, $user){
    global $dbh;
    $stmt = $dbh->prepare('SELECT * FROM User WHERE NOT username = ? AND username LIKE "'. $input .'%"');
    $stmt->execute(array($user));
    $sugest = $stmt->fetchAll();

    return $sugest;
}
?>
