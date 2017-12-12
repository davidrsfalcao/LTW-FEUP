<?php
if(isset($_POST['string'])){
    if ( !preg_match ("/^[a-zA-Z\s]+$/", $_POST['string'])) {
        echo 1;
    }
    else echo 1;
}
else echo 1;
?>
