<?php
include('connection.php');

$name = $_POST['Name'];
$email = $_POST['Email'];
$password = $_POST['Password'];
$dob = $_POST['Dob'];
$user_type = $_POST['Usertype_id'];

$check_email = $mysql->prepare('select Email from users where Email=?');
$check_email->bind_param('s', $email);
$check_email->execute();
$check_email->store_result();
$email_exists = $check_email->num_rows();

$hashed_password = password_hash($password, PASSWORD_BCRYPT);

if ($email_exists > 0) {
    $response['status'] = "failed";
} else {
    $query = $mysql->prepare('insert into users(Name,Email,Password,Dob,Usertype_id) values(?,?,?,?,?)');
    $query->bind_param('ssssi', $name, $email, $hashed_password, $dob, $user_type);
    $query->execute();
    $response['status'] = "success";
}

echo json_encode($response);
