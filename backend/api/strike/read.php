<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/strike.php';

    $database = new Database();
    $db = $database->connect();

    $strike = new Strike($db);

    $result = $strike->read();

    $num = $result->rowCount();
    

    if ($num > 0) {
        $strike_arr = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $strike_item = array(
                'strike_id' => $strike_id,
                'strike_detail' => $strike_detail,
                'strike_cause' => $strike_cause,
                'dr_id' => $dr_id
            );

            array_push($strike_arr, $strike_item);
        }

        echo json_encode($strike_arr);

    } else {

        echo json_encode(array('message' => 'No User Found'));

    }