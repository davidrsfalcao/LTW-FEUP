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
    <?php
        if ((isset($_SESSION['flag_upload'])) && ($_SESSION['flag_upload'] == true)){
            echo ('<form action="./action_update_profile_image.php"  method="get">
                    <input type="submit" name="" value="Save" id="teste1" />
                </form>');
        }
        else {
            echo ('<form>
                    <input type="submit" name="" value="Save" id="teste" />
                </form>');
        }

        if ((isset($_SESSION['flag_upload'])) && ($_SESSION['flag_upload'] == true)){
            echo ('<form action="./action_cancel_update_profile.php"  method="get">
                    <input type="submit" name="" value="Cancel" id="teste1" />
                </form>');
        }
        else {
            echo ('<form>
                    <input type="submit" name="" value="Cancel" id="teste" />
                </form>');
        }
    ?>

</div>

<script src="js/jquery-1.11.3.min.js"></script>
<script src="js/upload_img_profile.js"></script>

<input type="button" value="Refresh Page" onClick="window.location.reload()">
