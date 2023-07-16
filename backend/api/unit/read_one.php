<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
    header("Content-Type: application/json;");

    include_once '../../config/database.php';
    include_once '../../models/unit.php';

    $database = new Database();
    $db = $database->connect();

    $unit = new Unit($db);

    $unit->unit_id = isset($_GET['unit_id']) ? $_GET['unit_id'] : die();

    $result = $unit->read_one();

    $num = $result->rowCount();

    if ($num > 0) {
        $row = $result->fetch(PDO::FETCH_ASSOC);

            $unit_arr = array(
                'unit_id' => $row['unit_id'],
                'unit_name' => $row['unit_name']
            );

            http_response_code(200);
            echo json_encode($unit_arr);
    } else {
        http_response_code(404);
        echo json_encode(array('message' => 'Not found.'));
    }

    

?>