<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/daily-report.php';

    $database = new Database();
    $db = $database->connect();

    $dr = new Report($db);

    $result = $dr->read();

    $num = $result->rowCount();
    

    if ($num > 0) {
        $dr_arr = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $dr_item = array(
                'dr_id' => $dr_id,
                'dr_time' => $dr_time,
                'problem' => $problem,
                'project_id' => $project_id,
                'user_detail_id' => $user_detail_id

            );

            array_push($dr_arr, $dr_item);
        }

        echo json_encode($dr_arr);

    } else {

        echo json_encode(array("status" => "error", "message" => "Not Found data"));

    }


?>