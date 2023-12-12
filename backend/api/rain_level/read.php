<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/rain_level.php';

    $database = new Database();
    $db = $database->connect();

    $rain = new RainLevel($db);

    $result = $rain->read();

    $num = $result->rowCount();
    

    if ($num > 0) {
        $rain_arr = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $rain_item = array(
                'rain_id' => $rain_id,
                'rain_name' => $rain_name,
            );

            array_push($rain_arr, $rain_item);
        }

        echo json_encode($rain_arr);

    } else {

        echo json_encode(array("status" => "error", "message" => "Not Found"));

    }


?>