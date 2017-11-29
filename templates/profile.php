<?php
$user = $_SESSION['username'];
$first_name = get_user_first_name($user);
$last_name = get_user_last_name($user);
?>

<div class="left_box">
    <?php
        if (file_exists ("images/". $user . ".png" )){
            echo ('<img src="images/' . $user. '.png" class="profile_img"/>');
        }
        else {
            echo '<img src="images/avatar.png" class="profile_img"/>';
        }
    ?>

</div>
<div class="right_box">
    <p class="profile_p">
        <span class="bold_text">First Name:  </span><?=$first_name?>
    </p>
    <p class="profile_p">
        <span class="bold_text">Last Name:  </span><?=$last_name?>
    </p>
    <p class="profile_p">
        <span class="bold_text">Username:  </span><?=$user?>
    </p>
    <p class="profile_p">
        <span class="bold_text">Birthday:  </span> not defined
    </p>


</div>
<div class="bottom_box"></div>

<input type="button" value="Refresh Page" onClick="window.location.reload()">
