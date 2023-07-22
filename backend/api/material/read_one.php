<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
    header("Content-Type: application/json;");

    include_once '../../config/database.php';
    include_once '../../models/material.php';

    $database = new Database();
    $db = $database->connect();

    $mat = new Material($db);

    $mat->dr_id = isset($_GET['dr_id']) ? $_GET['dr_id'] : die();

    $result = $mat->read_one();

    $num = $result->rowCount();

    if ($num > 0) {
        $mat_arr = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $mat_item = array(
                'mat_id' => $mat_id,
                'mat_name' => $mat_name,
                'mat_num' => $mat_num,
                'unit_id' => $unit_id,
                'unit_name' => $unit_name,
                'dr_id' => $dr_id
            );

            array_push($mat_arr, $mat_item);
        }
            echo json_encode($mat_arr);
    } else {
        http_response_code(404);
        echo json_encode(array('message' => 'Not found.'));
    }

    

?>