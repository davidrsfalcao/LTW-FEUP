<?php
include_once('config/init.php');
include('templates/header.php');
?>

<body>
    <div class="login-page">
        <div class="form">
            <form class="login-form" action="action_login.php" method="post">
                <?php  if(isset($_SESSION["flag_username"])){
                    if($_SESSION["flag_username"] == "fail"){
                        echo '<input type="text" placeholder="Invalid User" name="username" id="wrong"/>';
                    }
                    else echo '<input type="text" placeholder="username" name="username"/>';

                }
                ?>
                <?php  if(isset($_SESSION["flag_password"])){
                    if($_SESSION["flag_password"] == "fail"){
                        echo '<input type="text" placeholder="Invalid password" name="password" id="wrong"/>';
                    }
                    else echo '<input type="password" placeholder="password" name="password"/>';
                }
                ?>
                <button>login</button>
                <p class="message">Not registered? <a href="sign_up.php">Create an account</a>
                    <br>
                    <br>
                    <a href="index.php">Cancel</a>
                </p>
            </form>
        </div>
    </div>
    <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>

    <script  src="js/sign_in_up.js"></script>

</body>
</html>
