<?php
include_once('config/init.php');
include('templates/header_forms.php');

    include_once('database/user.php');
    $user = $_GET['username'];
    $first_name = get_user_first_name($user);
    $last_name = get_user_last_name($user);

?>

    <body>
        <div class="loginBox">
            <img src="images/avatar.png" class="user"/>
            <h2><?=$first_name?> <?=$last_name?></h2>
            <form action="action_login.php?username=<?=$user?>" method="post">
                <input type="password" name="password" placeholder="password" required="required" />
                <?php
                    if($_SESSION["flag_error"]){
                        echo '<p id="error">
                        *
                        </p>';
                    }
                ?>
                <input type="submit" name="" value="Enter" />
            </form>
            <br />
            <br />
            <a href="index.php">Cancel</a>
        </div>

    </body>
</html>
