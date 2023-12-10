<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/labor_name.php';

    $database = new Database();
    $db = $database->connect();

    $labor_name = new LaborName($db);

    $result = $labor_name->read();

    $num = $result->rowCount();
    

    if ($num > 0) {
        $labor_name_arr = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $labor_name_item = array(
                'labor_name_id' => $labor_name_id,
                'labor_name' => $labor_name
            );

            array_push($labor_name_arr, $labor_name_item);
        }

        echo json_encode($labor_name_arr);

    } else {

        echo json_encode(array('status' => 'error', 'message' => 'No Labor Name Found'));

    }