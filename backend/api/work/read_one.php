<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
    header("Content-Type: application/json;");

    include_once '../../config/database.php';
    include_once '../../models/work.php';

    $database = new Database();
    $db = $database->connect();

    $work = new Work($db);

    $work->work_id = isset($_GET['work_id']) ? $_GET['work_id'] : die();

    $result = $work->read_one();

    $num = $result->rowCount();

    if ($num > 0) {
        $row = $result->fetch(PDO::FETCH_ASSOC);

            $work_arr = array(
                'work_id' => $row['work_id'],
                'work_num' => $row['work_num'],
                'work_detail' => $row['work_detail'],
                'dr_id' => $row['dr_id']
            );

            http_response_code(200);
            echo json_encode($work_arr);
    } else {
        http_response_code(404);
        echo json_encode(array('message' => 'Not found.'));
    }

    

?>