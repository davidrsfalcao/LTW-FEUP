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

<li class="dropdown">
    <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><?=$first_name?> <?=$last_name?><span class="caret"></span></a>
    <ul class="dropdown-menu" aria-labelledby="about-us">
        <li><a href="profile.php?username=<?=$user?>" id="profile_form"><span class="glyphicon glyphicon-user"id="menu_icons"></span> Profile</a></li>
        <li>
        <form action="action_logout.php" id="form_logout">
          <a><span class="glyphicon glyphicon-off"id="menu_icons"><input type="submit" value="Logout" id="logout"></a>
        </form>
        </li>


    </ul>
</li>
