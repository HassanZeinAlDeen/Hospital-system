<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');

$host = 'localhost';
$db_username = 'root';
$db_password = null;
$db_name = 'hospitaldb';

$mysql = new mysqli ($host, $db_username, $db_password, $db_name);

?>