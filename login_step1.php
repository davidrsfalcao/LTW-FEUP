<?php
include_once('config/init.php');
if(isset($_GET["username"])){
    include_once('database/user.php');
    if(userExists($_GET["username"])){
        $_SESSION["flag_error"] = false;
        $var = $_GET['username'];
        header('Location: login_step2.php?username=' . $var);
    }
    else $_SESSION["flag_error"] = true;
}
include('templates/header_forms.php');
?>

<body>
    <div class="loginBox">
        <img src="images/avatars/avatar.jpg" class="user"/>
        <h2>Login</h2>
        <form >
            <input type="text" name="username" id="user" placeholder="username"/>
            <button class="form_button" type="button" onclick="next()">Next</button>
        </form>
        <br />
        <p>
            Not registered? <a href="register.php">Create an account</a>
        </p>
        <a href="index.php">Cancel</a>
    </div>
    <script src="js/login.js"></script>
</body>
</html>
