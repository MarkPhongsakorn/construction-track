<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
    header("Content-Type: application/json;");

    include_once '../../config/database.php';
    include_once '../../models/labor_name.php';

    $database = new Database();
    $db = $database->connect();

    $labor_name = new LaborName($db);

    $labor_name->labor_name_id = isset($_GET['labor_name_id']) ? $_GET['labor_name_id'] : die();

    $result = $labor_name->read_one();

    $num = $result->rowCount();

    if ($num > 0) {
        $row = $result->fetch(PDO::FETCH_ASSOC);

            $labor_name_arr = array(
                'labor_name_id' => $row['labor_name_id'],
                'labor_name' => $row['labor_name']
            );

            http_response_code(200);
            echo json_encode($labor_name_arr);
    } else {
        http_response_code(404);
        echo json_encode(array('message' => 'Not found.'));
    }

    

?>