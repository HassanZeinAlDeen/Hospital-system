<?php
include("connection.php");

$email = $_POST['Email'];
$password = $_POST['Password'];
// $user_type = $_POST['Usertype_id'];

$query = $mysql->prepare('SELECT `Id`, `Name`, `Email`, `Password`, `Dob`, `Usertype_id` from users where Email=?');
$query->bind_param('s',$email);
$query->execute();
$query->store_result();
$num_rows = $query->num_rows();
$query->bind_result($id, $name, $email, $hashed_password, $dob, $user_type);
$query->fetch();
$response = [];
if ($num_rows == 0) {
  $response['response'] = "user not found";
} else {

  if (password_verify($password, $hashed_password)) {
      $response['response'] = "logged in";
      $response['Id'] = $id;
      $response['Name'] = $name;
      $response['Email'] = $email; 
      $response['Dob'] = $dob;
      $response['Usertype_id'] = $user_type;
  } else {
      $response["response"] = "Incorrect password";
  }
}

echo json_encode($response);

?>