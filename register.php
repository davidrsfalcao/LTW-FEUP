<?php
include_once('config/init.php');
include('templates/header_forms.php');
?>

<body>
    <div class="registerBox">
        <h2>Registration</h2>
        <form action="actions/register.php" method="post" id="form_register">
            <input type="text" name="first_name" placeholder="first name" id="f_n" autocomplete="off"/>
            <input type="text" name="last_name" placeholder="last name" id="l_n" autocomplete="off"/>
            <input type="text"  id="user" name="username" placeholder="username" autocomplete="off"/>
            <button type="button" id="eye">
                <img src="images/templates/eye.png" alt="eye" id="eye_visibility" />
            </button>
            <input type="password" name="password" id="pwd" placeholder="password" autocomplete="off"/>
            <button class="form_button" type="button" onclick="try_submit()">Register</button>
        </form>
        <br />
        <p>
            Already Registered? <a href="login_step1.php">Sign In</a>
        </p>
        <a href="index.php">Cancel</a>
    </div>
    <script src="js/show_password.js"></script>
    <script src="js/register.js"></script>
</body>
</html>
