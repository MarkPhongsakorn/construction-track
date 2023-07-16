<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
    header("Content-Type: application/json;");

    include_once '../../config/database.php';
    include_once '../../models/period.php';

    $database = new Database();
    $db = $database->connect();

    $period = new Period($db);

    $period->period_id = isset($_GET['period_id']) ? $_GET['period_id'] : die();

    $result = $period->read_one();

    $num = $result->rowCount();

    if ($num > 0) {
        $row = $result->fetch(PDO::FETCH_ASSOC);

            $period_arr = array(
                'period_id' => $row['period_id'],
                'period_name' => $row['period_name']
            );

            http_response_code(200);
            echo json_encode($period_arr);
    } else {
        http_response_code(404);
        echo json_encode(array('message' => 'Not found.'));
    }

    

?>