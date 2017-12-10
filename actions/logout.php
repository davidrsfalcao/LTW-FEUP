<?php
  include_once(__DIR__ . '/../config/init.php');

  session_destroy();

  session_start();

  header('Location: ../index.php');
  exit();
?>
