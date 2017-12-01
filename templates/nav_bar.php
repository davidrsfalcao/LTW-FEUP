<?php
include('templates/header.php');

if (isset($_SESSION['username']))
{
    echo '<body id="logged_body">';
}
else {
    echo '<body>';
}
?>

<!-- Navigation -->
<nav id="siteNav" class="navbar navbar-default navbar-fixed-top" role="navigation">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar">
                <span class="sr-only"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">
                <span class="glyphicon glyphicon-calendar"></span>
                Easy Notes
            </a>
        </div>
        <!-- Navbar links -->
        <div class="collapse navbar-collapse" id="navbar">
            <ul class="nav navbar-nav navbar-right">

                <?php
                if (isset($_SESSION['username'])){
                    echo ('<li class="active"><a href="index.php?username=' .  $_SESSION['username']  .'">Home</a></li>');
                    include ('templates/logout_form.php');
                }
                else{
                    echo ('<li class="active"><a href="#">Home</a></li>');
                    include ('templates/login_form.php');
                }
                ?>
            </ul>

        </div>
    </div>
</nav>

<?php
include('templates/header.php');

if (isset($_SESSION['username']))
{
    echo '<div class="background_Box">';
}
?>
