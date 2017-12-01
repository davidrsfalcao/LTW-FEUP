<?php
$user = $_SESSION['username'];
$first_name = get_user_first_name($user);
$last_name = get_user_last_name($user);
?>

<div class="left_box">
    <?php
    if (file_exists ("images/avatars/". $user . ".jpg" )){
        echo ('<img src="images/avatars/' . $user. '.jpg?' . time() . '" class="profile_img" id="profileImage"/>');
    }
    else {
        echo '<img src="images/avatars/avatar.jpg" class="profile_img" id="profileImage"/>';
    }
    ?>
    <img src="images/profile_bottom.png" class="profile_img" id="profile_bottom"/>

    <form action="./action_upload.php?username=<?=$user?>" method="post" enctype="multipart/form-data">
        <input id="imageUpload" type="file"
        name="profile_photo" placeholder="Photo" required="required"capture>
        <input type="submit" value="Upload">
    </form>


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

<div class="bottom_box">
</div>

<script src="js/jquery-1.11.3.min.js"></script>
<script src="js/upload_img_profile.js"></script>

<input type="button" value="Refresh Page" onClick="window.location.reload()">
