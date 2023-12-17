<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/time_inspect.php';

    $database = new Database();
    $db = $database->connect();

    $timeinsp = new TimeInsp($db);

    $result = $timeinsp->read();

    $num = $result->rowCount();
    

    if ($num > 0) {
        $timeinsp_arr = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $timeinsp_item = array(
                'time_inspect_id' => $time_inspect_id,
                'inspect_start' => $inspect_start,
                'inspect_end' => $inspect_end,
                'dr_id' => $dr_id,
                'project_id' => $project_id
            );

            array_push($timeinsp_arr, $timeinsp_item);
        }

        echo json_encode($timeinsp_arr);

    } else {

        echo json_encode(array('message' => 'No User Found'));

    }