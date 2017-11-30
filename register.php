<?php
include_once('config/init.php');
include('templates/header_forms.php');
?>

<body>
    <div class="registerBox">
        <h2>Registration</h2>
        <form action="action_register.php" method="post">
            <input type="text" name="first_name" placeholder="first name" required="required" autocomplete="off"/>
            <input type="text" name="last_name" placeholder="last name" required="required" autocomplete="off"/>
            <input type="text" name="username" placeholder="username" required="required" autocomplete="off"/>
            <button type="button" id="eye">
                <img src="images/eye.png" alt="eye" />
            </button>
            <input type="password" name="password" id="pwd" placeholder="password" required="required" />
            <?php
                if ($_SESSION['flag_error']){
                    echo '<p id= "error">
                    *
                    </p>';
                }
            ?>
            <input type="submit" name="" value="Enter" />
        </form>
        <br />
        <p>
            Already Registered? <a href="login_step1.php">Sign In</a>
        </p>
        <a href="index.php">Cancel</a>
    </div>
    <script src="js/show_password.js"></script>
</body>
</html>
