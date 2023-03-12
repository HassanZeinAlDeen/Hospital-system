<?php

include("connection.php");

$query = $mysql->prepare("SELECT * from services");
$query->execute();
$result = $query->get_result();

while($object = $result->fetch_assoc()){
  $data[] = $object;
}
$response["services"]=$data;
echo json_encode($response);
?>
