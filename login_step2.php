<?php
include_once('config/init.php');
include_once('templates/header_forms.php');
include_once('database/user.php');
$user = $_GET['username'];
$first_name = get_user_first_name($user);
$last_name = get_user_last_name($user);

?>

<body>
    <div class="loginBox">
        <?php
        if (file_exists ("images/avatars/". $user . ".jpg" )){
            echo ('<img src="images/avatars/' . $user. '.jpg?' . time() . '" class="user"/>');
        }
        else {
            echo '<img src="images/avatars/avatar.jpg" class="user"/>';
        }
        ?>
        <h2><?=$first_name?> <?=$last_name?></h2>
        <form action="action_login.php?username=<?=$user?>" method="post" id="login_form">
            <button type="button" id="eye">
                <img src="images/templates/eye.png" alt="eye" id="eye_visibility"/>
            </button>
            <input type="password" name="password" id="pwd" placeholder="password"/>
            <button class="form_button" type="button" onclick="verifyPassword('<?=$user?>')">Login</button>
        </form>
        <br />
        <p>
            This isn't your account? <a href="login_step1.php">Go Back</a>
        </p>
        <a href="index.php">Cancel</a>
    </div>

    <script src="js/show_password.js"></script>
    <script src="js/login.js"></script>
</body>
</html>
