<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/position.php';

    $database = new Database();
    $db = $database->connect();

    $pos = new Position($db);

    $result = $pos->read();

    $num = $result->rowCount();
    

    if ($num > 0) {
        $pos_arr = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $pos_item = array(
                'pos_id' => $pos_id,
                'pos_name' => $pos_name
            );

            array_push($pos_arr, $pos_item);
        }

        echo json_encode($pos_arr);

    } else {

        echo json_encode(array('message' => 'No User Found'));

    }


?>