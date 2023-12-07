<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/project_status.php';

    $database = new Database();
    $db = $database->connect();

    $psta = new Psta($db);

    $result = $psta->read();

    $num = $result->rowCount();
    

    if ($num > 0) {
        $psta_arr = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $psta_item = array(
                'psta_id' => $psta_id,
                'psta_name' => $psta_name
            );

            array_push($psta_arr, $psta_item);
        }

        echo json_encode($psta_arr);

    } else {

        echo json_encode(array('message' => 'No User Found'));

    }