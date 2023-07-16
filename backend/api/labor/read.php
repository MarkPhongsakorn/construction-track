<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/labor.php';

    $database = new Database();
    $db = $database->connect();

    $labor = new Labor($db);

    $result = $labor->read();

    $num = $result->rowCount();
    

    if ($num > 0) {
        $labor_arr = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $labor_item = array(
                'labor_id' => $labor_id,
                'labor_name' => $labor_name,
                'labor_num' => $labor_num,
                'dr_id' => $dr_id
            );

            array_push($labor_arr, $labor_item);
        }

        echo json_encode($labor_arr);

    } else {

        echo json_encode(array('message' => 'No User Found'));

    }