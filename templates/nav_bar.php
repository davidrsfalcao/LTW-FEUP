<?php
include('templates/header.php');
if (isset($_SESSION['username']))
{
    echo '<body id="logged_body">';
    $username = $_SESSION['username'];
}
else {
    echo '<body>';
    $username = null;
}

?>
<nav class="navigation_bar">
    <p onmousemove="onBrand()" onClick="clickOnBrand('<?=$username?>')" onmouseleave="outBrand()" id="logo_plus_name"><span class="icon bookmark"></span>Easy Notes</p>
    <ul>
        <?php
        if (isset($_SESSION['username'])){
            echo ('<li><a id="home" class="selectable" href="index.php?username=' . $_SESSION['username'] . '">Home</a></li>');
            include ('templates/logout_form.php');
        }
        else {
            echo ('<li><a id="home" class="selectable" href="index.php">Home</a></li>');
             include ('templates/login_form.php');
        }
        ?>
    </ul>
</nav>


<?php
if (isset($_SESSION['username']))
{
    echo '<div class="background_Box">';
}
?>
