<?php
$user = $_SESSION['username'];
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
    <img src="images/profile_bottom.png" class="profile_img" id="profile_bottom"/>

    <form action="./action_upload.php?username=<?=$user?>" method="post" enctype="multipart/form-data" id="form">
        <input id="imageUpload" type="file"
        name="profile_photo" placeholder="Photo" required="required"capture>
    </form>

    <?php
    if ((isset($_SESSION['flag_upload'])) && ($_SESSION['flag_upload'] == true)){
        echo ('<form action="./action_update_profile_image.php"  method="get">
        <input type="submit" name="" value="Save" class="profile_button save" />
        </form>');
        echo ('<script type="text/javascript">document.getElementById("profile_bottom").style.visibility = "hidden";</script>');
    }
    if ((isset($_SESSION['flag_upload'])) && ($_SESSION['flag_upload'] == true)){
        echo ('<form action="./action_cancel_update_profile.php"  method="get">
        <input type="submit" name="" value="Cancel" class="profile_button cancel" />
        </form>');
    }
    ?>


</div>
<div class="right_box">
    <form action="action_update_user.php" method="post" id="edit_form" class="profile_form">
        <label for="name_1" class="bold_text profile_label">First Name: </label>
        <input type="text" name="first_name" value="<?=$first_name?>" id="name_1" readonly required/>
        <label for="name_2" class="bold_text profile_label">Last Name: </label>
        <input type="text" name="last_name" value="<?=$last_name?>" id="name_2" readonly required/>
        <label for="user_1" class="bold_text profile_label">Username: </label>
        <input type="text" name="username" value="<?=$user?>" id="user_1" readonly required/>
    </form>

    <div class="div_btns">
        <button id="btn_1" type="button" class="btn_profile" onclick="save_edit()"><span class="glyphicon glyphicon-ok"></span></button>
        <button id="btn_2" type="button" class="btn_profile" onclick="begin_edit()"><span class="glyphicon glyphicon-pencil"></span></button>
        <button id="btn_3" type="button" class="btn_profile" onclick="cancel_edit()"><span class="glyphicon glyphicon-remove"></span></button>
    </div>

    <span id="span_help1" class="glyphicon glyphicon-info-sign span_help"></span>
    <span id="span_help2" class="glyphicon glyphicon-info-sign span_help"></span>

</div>

<script src="js/jquery-1.11.3.min.js"></script>
<script src="js/upload_img_profile.js"></script>
<script src="js/edit_profile.js"></script>
