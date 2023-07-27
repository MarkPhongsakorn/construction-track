<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/work.php';

    $database = new Database();
    $db = $database->connect();

    $work = new Work($db);

    $result = $work->read();

    $num = $result->rowCount();
    

    if ($num > 0) {
        $work_arr = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $work_item = array(
                'work_id' => $work_id,
                'work_num' => $work_num,
                'work_detail' => $work_detail,
                'dr_id' => $dr_id,
                'project_id' => $project_id
            );

            array_push($work_arr, $work_item);
        }

        echo json_encode($work_arr);

    } else {

        echo json_encode(array('message' => 'No User Found'));

    }