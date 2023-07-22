<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
    header("Content-Type: application/json;");

    include_once '../../config/database.php';
    include_once '../../models/labor.php';

    $database = new Database();
    $db = $database->connect();

    $labor = new Labor($db);

    $labor->dr_id = isset($_GET['dr_id']) ? $_GET['dr_id'] : die();

    $result = $labor->read_one();

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
        http_response_code(404);
        echo json_encode(array('message' => 'Not found.'));
    }

    

?>