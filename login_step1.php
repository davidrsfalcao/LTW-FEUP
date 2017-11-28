<?php
    include_once('config/init.php');
    include('templates/header_forms.php');
    if(isset($_GET["username"])){
        include_once('database/user.php');
        if(userExists($_GET["username"])){
            $_SESSION["flag_error"] = false;
            $var = $_GET['username'];
            header('Location: login_step2.php?username=' . $var);
        }
        else $_SESSION["flag_error"] = true;
    }

?>

    <body>
        <div class="loginBox">
            <img src="images/avatar.png" class="user"/>
            <h2>Login</h2>
            <form method="get">
                <input type="text" name="username" placeholder="username" required="required" />
                <?php
                    if($_SESSION["flag_error"]){
                        echo '<p id="error1">
                        *
                        </p>';
                    }
                ?>
                <input type="submit" name="" value="Next" />
            </form>
            <br />
            <p>
                Not registered? <a href="register.php">Create an account</a>
            </p>
            <a href="index.php">Cancel</a>
        </div>

    </body>
</html>
