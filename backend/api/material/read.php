<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/material.php';

    $database = new Database();
    $db = $database->connect();

    $mat = new Material($db);

    $result = $mat->read();

    $num = $result->rowCount();
    

    if ($num > 0) {
        $mat_arr = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $mat_item = array(
                'mat_id' => $mat_id,
                'mat_name' => $mat_name,
                'mat_num' => $mat_num,
                'dr_id' => $dr_id
            );

            array_push($mat_arr, $mat_item);
        }

        echo json_encode($mat_arr);

    } else {

        echo json_encode(array('message' => 'No User Found'));

    }