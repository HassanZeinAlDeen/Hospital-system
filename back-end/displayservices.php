<?php

include("connection.php");

$query = $mysql->prepare("SELECT `Name`, `Description`,`Cost`
FROM departments
INNER JOIN services ON departments.Id=services.Department_id");
$query->execute();
$result = $query->get_result();

while($object = $result->fetch_assoc()){
  $data[] = $object;
}
$response["services"]=$data;
echo json_encode($response);
?>
