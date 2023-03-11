<?php

include('connection.php');

$query = $mysql -> prepare('SELECT Name from Medications');
$query->execute();
$result = $query->get_result();

while($object = $result->fetch_assoc()){
  $data[] = $object;
}
$response["medications"]=$data;
echo json_encode($response);
?>