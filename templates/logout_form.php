<?php
    include_once('database/user.php');
    $user = $_SESSION['username'];
    $first_name = get_user_first_name($user);
    $last_name = get_user_last_name($user);
?>


<li>
    <img class="img-circle" src="images/avatar.png" alt="" style="width:40px;height:40px;margin-top:5px;">
</li>

<li class="dropdown">
    <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><?=$first_name?> <?=$last_name?><span class="caret"></span></a>
    <ul class="dropdown-menu" aria-labelledby="about-us">
        <li><a href="#" id="profile_form">Profile</a></li>
        <li>
        <form action="action_logout.php" id="form_logout">
          <a><input type="submit" value="Logout" id="logout"></a>
        </form>
        </li>


    </ul>
</li>
