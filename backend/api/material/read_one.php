<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
    header("Content-Type: application/json;");

    include_once '../../config/database.php';
    include_once '../../models/material.php';

    $database = new Database();
    $db = $database->connect();

    $mat = new Material($db);

    $mat->mat_id = isset($_GET['mat_id']) ? $_GET['mat_id'] : die();

    $result = $mat->read_one();

    $num = $result->rowCount();

    if ($num > 0) {
        $row = $result->fetch(PDO::FETCH_ASSOC);

            $mat_arr = array(
                'mat_id' => $row['mat_id'],
                'mat_name' => $row['mat_name'],
                'mat_num' => $row['mat_num'],
                'dr_id' => $row['dr_id']
            );

            http_response_code(200);
            echo json_encode($mat_arr);
    } else {
        http_response_code(404);
        echo json_encode(array('message' => 'Not found.'));
    }

    

?>