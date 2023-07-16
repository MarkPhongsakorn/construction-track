<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/period.php';

    $database = new Database();
    $db = $database->connect();

    $period = new Period($db);

    $result = $period->read();

    $num = $result->rowCount();
    

    if ($num > 0) {
        $period_arr = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $period_item = array(
                'period_id' => $period_id,
                'period_name' => $period_name
            );

            array_push($period_arr, $period_item);
        }

        echo json_encode($period_arr);

    } else {

        echo json_encode(array('message' => 'No User Found'));

    }