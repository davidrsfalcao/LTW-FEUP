<?php
include_once('config/init.php');
if(isset($_SESSION['username'])){
    header('Location: index.php?username=' . $_SESSION['username']);
    exit();
}
include('templates/header_forms.php');
?>

<body>
    <div class="loginBox">
        <img src="images/avatars/avatar.jpg" class="user"/>
        <h2>Login</h2>
        <form>
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
