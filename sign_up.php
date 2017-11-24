<?php
include_once('config/init.php');
include('templates/header.php');
?>

<body>
    <div class="login-page">
        <div class="form">
            <form class="register-form" action="action_register.php" method="post">
                <input type="text" placeholder="first name" name ="first_name"/>
                <input type="text" placeholder="last name" name = "last_name"/>
                <input type="text" placeholder="username" name = "username"/>
                <input type="password" placeholder="password" name = "password"/>
                <button>create</button>
                <p class="message">Already registered? <a href="sign_in.php">Sign In</a>
                    <br>
                    <br>
                    <a href="/">Cancel</a>
                </p>
            </form>
        </div>
    </div>
    <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>

    <script  src="js/sign_in_up.js"></script>

</body>
</html>
