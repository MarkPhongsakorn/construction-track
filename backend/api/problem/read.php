<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/problem.php';

    $database = new Database();
    $db = $database->connect();

    $prob = new Problem($db);

    $result = $prob->read();

    $num = $result->rowCount();
    

    if ($num > 0) {
        $prob_arr = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $prob_item = array(
                'prob_id' => $prob_id,
                'problem' => $problem,
                'dr_id' => $dr_id,
                'project_id' => $project_id,
            );

            array_push($prob_arr, $prob_item);
        }

        echo json_encode($prob_arr);

    } else {

        echo json_encode(array('message' => 'No User Found'));

    }