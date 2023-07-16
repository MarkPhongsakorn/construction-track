<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/unit.php';

    $database = new Database();
    $db = $database->connect();

    $unit = new Unit($db);

    $result = $unit->read();

    $num = $result->rowCount();
    

    if ($num > 0) {
        $unit_arr = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $unit_item = array(
                'unit_id' => $unit_id,
                'unit_name' => $unit_name
            );

            array_push($unit_arr, $unit_item);
        }

        echo json_encode($unit_arr);

    } else {

        echo json_encode(array('message' => 'No User Found'));

    }