<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
    header("Content-Type: application/json;");

    include_once '../../config/database.php';
    include_once '../../models/work.php';

    $database = new Database();
    $db = $database->connect();

    $work = new Work($db);

    $work->dr_id = isset($_GET['dr_id']) ? $_GET['dr_id'] : die();

    $result = $work->read_one();

    $num = $result->rowCount();

    if ($num > 0) {
        $work_arr = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $work_item = array(
                'work_id' => $work_id,
                'work_num' => $work_num,
                'work_detail' => $work_detail,
                'dr_id' => $dr_id
            );

            array_push($work_arr, $work_item);
        }
            echo json_encode($work_arr);
    } else {
        http_response_code(404);
        echo json_encode(array('message' => 'Not found.'));
    }

    

?>