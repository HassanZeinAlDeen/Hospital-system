<?php

include("connection.php");

$query = $mysql->prepare('SELECT `Room_number`,`Is_vip`,`Number_beds`,`Cost_day_usd`, `Department_id` from rooms');
$query->execute();
$result = $query->get_result();
while($object = $result->fetch_assoc()){
  $data[] = $object;
}
$response["patients"]=$data;
echo json_encode($response);

?>