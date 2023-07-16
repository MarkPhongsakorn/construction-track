<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
    header("Content-Type: application/json;");

    include_once '../../config/database.php';
    include_once '../../models/labor.php';

    $database = new Database();
    $db = $database->connect();

    $labor = new Labor($db);

    $labor->labor_id = isset($_GET['labor_id']) ? $_GET['labor_id'] : die();

    $result = $labor->read_one();

    $num = $result->rowCount();

    if ($num > 0) {
        $row = $result->fetch(PDO::FETCH_ASSOC);

            $labor_arr = array(
                'labor_id' => $row['labor_id'],
                'labor_name' => $row['labor_name'],
                'labor_num' => $row['labor_num'],
                'dr_id' => $row['dr_id']
            );

            http_response_code(200);
            echo json_encode($labor_arr);
    } else {
        http_response_code(404);
        echo json_encode(array('message' => 'Not found.'));
    }

    

?>