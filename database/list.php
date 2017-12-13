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
            $dtb1 = ">0";
            break;

        case 2:
            $dtbO =  $dtbO . ' creation_date';
            $dtb1 = ">0";
            break;

        case 3:
            $dtbO =  $dtbO . ' reminder_date';
            $dtb1 = ">0";
            break;

        case 4:
            $dtbO = '';
            if((int)$orderType == 1){
                $dtb1 = ">0";
            }
            else $dtb1 = "=0";
            break;

        default:
            $dtbO =  $dtbO . ' LOWER(title)';
            $dtb1 = ">0";

    }

    if($order == 5){
        $dtbO = ' AND title LIKE "' . $orderType . '%"';
    }
    else if($order != 4)
        switch ((int)$orderType) {
        case 1:
            $dtbO =  $dtbO . ' ASC';
            break;

        case 2:
            $dtbO =  $dtbO . ' DESC;';
            break;
    }
    $query = 'SELECT * FROM List AS list WHERE creator_ID = ? AND '
    . '(SELECT COUNT(*) FROM Item WHERE Item.list_ID = list.ID AND '
    . 'Item.visibility = 1) ' . $dtb1 . ' ' . $dtbO;

    if($order == 6){
        $query = 'SELECT * FROM List WHERE ID IN (SELECT list_ID FROM Share WHERE user = ? ) ' . $dtbO ;
    }

    $stmt = $dbh->prepare($query);
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

function update_item($id, $visibility){
    global $dbh;
    $stmt = $dbh->prepare("UPDATE Item SET visibility = ?  WHERE ID = ?");
    $stmt->execute(array($visibility, $id));
    return $id;
}

function delete_list($id){
    global $dbh;
    $stmt = $dbh->prepare('DELETE FROM Item WHERE list_ID = ?');
    $stmt->execute(array($id));

    $stmt1 = $dbh->prepare('DELETE FROM List WHERE ID = ?');
    $stmt1->execute(array($id));
}

function share_list_user($id, $user){
    global $dbh;

    $next_id = getLastId('Share') + 1;
    $stmt = $dbh->prepare('INSERT INTO Share VALUES (?, ?, ?)');
    $stmt->execute(array($next_id, $id, $user));
}
?>
