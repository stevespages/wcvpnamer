<?php
  $dsn = 'sqlite:'.__DIR__.'/../sqlite/database.db';
  try {
    $db = new PDO($dsn);
  } catch (Exception $e) {
    $error = $e->getMessage();
  }

