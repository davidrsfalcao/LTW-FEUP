<?php
    $file_name = $_GET['filename'];
    $path = "../fonts/SVG/" . $file_name . ".svg";

    if(file_exists ($path)){
        $file = file_get_contents($path, FILE_USE_INCLUDE_PATH);
        echo $file;
    }
    else {
        echo "404: " . $file_name . " not found";
    }
?>
