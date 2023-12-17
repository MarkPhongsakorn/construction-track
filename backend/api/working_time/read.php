<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/working_time.php';

    $database = new Database();
    $db = $database->connect();

    $work_time = new WorkTime($db);

    $result = $work_time->read();

    $num = $result->rowCount();
    

    if ($num > 0) {
        $work_time_arr = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $work_time_item = array(
                'work_time_id' => $work_time_id,
                'work_start' => $work_start,
                'work_end' => $work_end,
                'dr_id' => $dr_id,
                'project_id' => $project_id
            );

            array_push($work_time_arr, $work_time_item);
        }

        echo json_encode($work_time_arr);

    } else {

        echo json_encode(array('message' => 'No User Found'));

    }