<?php
    include_once('database/user.php');
    $user = $_SESSION['username'];
    $first_name = get_user_first_name($user);
    $last_name = get_user_last_name($user);

    if (file_exists ("images/avatars/". $user . ".jpg" )){
        echo('<li>
            <img  src="images/avatars/' . $user .'.jpg?' . time() . '" alt="" id="avatar">
        </li>');
    }
    else {
        echo ('<li>
            <img src="images/avatars/avatar.jpg" alt="" id="avatar">
        </li>');
    }
?>

<li onmousemove="onFocus()" onmouseleave="onLeave()">
    <a class="selectable" href="#"><?=$first_name?> <?=$last_name?><span class="icon plus" id="arrow_down"></a>
    <ul>
        <li><a class="selectable" href="profile.php?username<?=$user?>">Profile</a></li>
        <li><a class="selectable" href="#">Settings</a></li>
        <li><a class="selectable" href="action_logout.php">Logout</a></li>
    </ul>
</li>
