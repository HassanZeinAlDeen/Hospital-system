<?php
include('connection.php');

$name = $_POST["Name"];
$email = $_POST["Email"];
$password = $_POST["Password"];
$dob = $_POST["dob"];
$hashed = hash("sha256",$password);


$query = $mysql->prepare("SELECT * FROM users WHERE Email=?");
$query->bind_param('s',$email);
$query->execute();
$result = $query->get_result();

while($object = $result->fetch_assoc()){
  $data[] = $object;
}

if(isset($data)){
  $response = [
      "status" => "Email already exists"
  ];
} else{
  $query = $mysql->prepare("INSERT INTO `users` (`Name` ,`Email`, `Password`, `Dob`) VALUES (?,?,?,?)");
  $query->bind_param('ssss', $name, $email, $hashed, $dob);
  $query->execute();
  $response = [
    "status" => "User added"
];
}

echo json_encode($response);
?>