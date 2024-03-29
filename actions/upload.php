<?php
include_once(__DIR__ . '/../config/init.php');
$user = $_SESSION['username'];
$originalFileName = "../images/avatars/tmp/$user.jpg";
$originalImage = $_FILES['profile_photo']['tmp_name'];

$dir = "../images/avatars/tmp/";
if (!file_exists($dir) && !is_dir($dir)) {
    mkdir($dir, 0777);
}

if($originalImage == null){
    header('Location: ../profile.php?username=' . $user . '&error=filesize');
    $_SESSION['flag_upload'] = false;
    include_once('clean_tmp_folder.php');
    unlinkRecursive('../images/avatars/tmp/', false );
    exit();
}

$tmp = getimagesize($originalImage);
$ext = $tmp['mime'];

if (preg_match('/jpg|jpeg/i',$ext)){
    $imageTmp=imagecreatefromjpeg($originalImage);
}
else if (preg_match('/png/i',$ext)){
    $imageTmp1 = imagecreatefrompng($originalImage);
    list($width, $height) = getimagesize($originalImage);
    $imageTmp = imagecreatetruecolor($width, $height);
    $white = imagecolorallocate($imageTmp,  255, 255, 255);
    imagefilledrectangle($imageTmp, 0, 0, $width, $height, $white);
    imagecopy($imageTmp, $imageTmp1, 0, 0, 0, 0, $width, $height);
}
else if (preg_match('/gif/i',$ext)){
    $imageTmp=imagecreatefromgif($originalImage);
}
else if (preg_match('/bmp/i',$ext)){
    $imageTmp=imagecreatefrombmp($originalImage);
}
else {
    header('Location: ../profile.php?username=' . $user . '&error=filetype');
    exit();
}
$width = imagesx($imageTmp);
$height = imagesy($imageTmp);
$square = min($width, $height);
$final = imagecreatetruecolor($square, $square);
imagecopyresized($final, $imageTmp, 0, 0, ($width>$square)?($width-$square)/2:0, ($height>$square)?($height-$square)/2:0, $square, $square, $square, $square);
imagejpeg($final, $originalFileName, 100);
imagedestroy($imageTmp);
imagedestroy($final);
clearstatcache();
$_SESSION['flag_upload'] = true;
header('Location: ../profile.php?username=' . $user);
?>
