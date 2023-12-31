<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/inspection.php';

    $database = new Database();
    $db = $database->connect();

    $inspec = new Inspection($db);

    $result = $inspec->read();

    $num = $result->rowCount();
    

    if ($num > 0) {
        $inspec_arr = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $inspec_item = array(
                'inspec_id' => $inspec_id,
                'inspec_result_id' => $inspec_result_id,
                'dr_id' => $dr_id,
                'project_id' => $project_id
            );

            array_push($inspec_arr, $inspec_item);
        }

        echo json_encode($inspec_arr);

    } else {

        echo json_encode(array('message' => 'No User Found'));

    }