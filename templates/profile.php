<?php
if (isset($_GET['username'])){
    $user = $_GET['username'];

    if($user != $_SESSION['username']){
        $view_mode = true;
    }
    else $view_mode = false;


}
else{
    $user = $_SESSION['username'];
}


$first_name = get_user_first_name($user);
$last_name = get_user_last_name($user);
?>

<div class="left_box">
    <?php
    if (file_exists ("images/avatars/tmp/". $user . ".jpg" )){
        echo ('<img src="images/avatars/tmp/' . $user. '.jpg?' . time() . '" class="profile_img" id="profileImage"/>');
    }
    else if (file_exists ("images/avatars/". $user . ".jpg" )){
        echo ('<img src="images/avatars/' . $user. '.jpg?' . time() . '" class="profile_img" id="profileImage"/>');
    }
    else {
        echo '<img src="images/avatars/avatar.jpg" class="profile_img" id="profileImage"/>';
    }
    ?>

    <?php
    if(!$view_mode){
        echo('<form action="actions/upload.php?username='. $user .'" method="post" enctype="multipart/form-data" id="form">
        <input id="imageUpload" type="file"
        name="profile_photo" placeholder="Photo" required="required"capture>
        </form>
        <img src="images/templates/profile_bottom.png" class="profile_img" id="profile_bottom"/>');
    }
    ?>

    <?php
    if ((isset($_SESSION['flag_upload'])) && ($_SESSION['flag_upload'] == true && !$view_mode)){
        echo ('<form action="actions/update_profile_image.php"  method="get">
        <input type="submit" name="" value="Save" class="profile_button save" />
        </form>');
        echo ('<script type="text/javascript">document.getElementById("profile_bottom").style.visibility = "hidden";</script>');
    }
    if ((isset($_SESSION['flag_upload'])) && ($_SESSION['flag_upload'] == true && !$view_mode)){
        echo ('<form action="actions/cancel_update_profile.php"  method="get">
        <input type="submit" name="" value="Cancel" class="profile_button cancel" />
        </form>');
    }
    ?>

</div>
<div class="right_box">
    <form action="actions/update_user.php" method="post" id="edit_form" class="profile_form">
        <label for="name_1" class="bold_text profile_label">First Name: </label>
        <input type="text" name="first_name" value="<?=$first_name?>" id="name_1" readonly required/>
        <label for="name_2" class="bold_text profile_label">Last Name: </label>
        <input type="text" name="last_name" value="<?=$last_name?>" id="name_2" readonly required/>
        <label for="user_1" class="bold_text profile_label">Username: </label>
        <input type="text" name="username" value="<?=$user?>" id="user_1" readonly required/>
    </form>

    <div class="div_btns" id="div_btns_profile">
        <?php

        if(!$view_mode){
            echo (' <button id="btn_1" type="button" class="btn_profile" onclick="save_edit()"><span class="icon checkmark"></span></button>
            <button id="btn_2" type="button" class="btn_profile" onclick="begin_edit()"><span class="icon pencil2"></span></button>
            <button id="btn_3" type="button" class="btn_profile" onclick="cancel_edit()"><span class="icon cross"></span></button>');
        }
        else {
            echo '<button id="btn_4" type="button" class="btn_profile btn_green" onclick="handlerFriendships(0)"><span class="icon user-plus"></span></button>';
            echo '<button id="btn_6" type="button" class="btn_profile btn_green" onclick="handlerFriendships(2)"><span class="icon hour-glass"></span></button>';
            echo '<button id="btn_5" type="button" class="btn_profile btn_green" onclick="handlerFriendships(1)"><span class="icon user-minus"></span></button>';

        }
        ?>

    </div>
</div>

<?php
if(!$view_mode){
    echo ('<script src="js/upload_img_profile.js"></script><script src="js/edit_profile.js"></script>');
}
else echo ('<script src="js/friendship_manager.js"></script><script>get_friendship_status("'. $user .'")</script>');
?>
