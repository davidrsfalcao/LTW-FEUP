<?php
include_once('config/init.php');
include_once('database/user.php');
if(isset($_SESSION['username'])){
    header('Location: index.php?username=' . $_SESSION['username']);
    exit();
}
if(!isset($_GET['username'])){
    header('Location: login_step1.php');
    exit();
}
else {
    $user = $_GET['username'];
    $first_name = get_user_first_name($user);
    $last_name = get_user_last_name($user);
}
include_once('templates/header_forms.php');

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
        <form action="actions/login.php?username=<?=$user?>" method="post" id="login_form">
            <button type="button" id="eye">
                <img src="images/templates/eye.png" alt="eye" id="eye_visibility"/>
            </button>
            <input type="password" name="password" id="pwd" placeholder="password"/>
            <input type="hidden" id="validation" name="validation" value="" />
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
    <script>
        initializeUser('<?=$user?>');
    </script>
</body>
</html>
