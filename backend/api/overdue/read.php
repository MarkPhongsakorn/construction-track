<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/overdue.php';

    $database = new Database();
    $db = $database->connect();

    $od = new Overdue($db);

    $result = $od->read();

    $num = $result->rowCount();
    

    if ($num > 0) {
        $od_arr = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $od_item = array(
                'od_id' => $od_id,
                'od_detail' => $od_detail,
                'dr_id' => $dr_id,
                'project_id' => $project_id
            );

            array_push($od_arr, $od_item);
        }

        echo json_encode($od_arr);

    } else {

        echo json_encode(array('message' => 'No Data Found'));

    }