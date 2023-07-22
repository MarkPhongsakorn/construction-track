<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/inspec_result.php';

    $database = new Database();
    $db = $database->connect();

    $result = new Result($db);

    $results = $inspec->read();

    $num = $results->rowCount();
    

    if ($num > 0) {
        $inspec_arr = array();

        while($row = $results->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $inspec_item = array(
                'inspec_result_id' => $inspec_result_id,
                'inspec_result' => $inspec_result
            );

            array_push($inspec_arr, $inspec_item);
        }

        echo json_encode($inspec_arr);

    } else {

        echo json_encode(array('message' => 'No User Found'));

    }