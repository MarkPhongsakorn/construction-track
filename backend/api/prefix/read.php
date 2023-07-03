<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/prefix.php';

    $database = new Database();
    $db = $database->connect();

    $prefix = new Prefix($db);

    $result = $prefix->read();
    $num = $result->rowCount();

    if ($num > 0) {
        $users_arr = array();

        foreach ($result as $row) {
            extract($row);

            $users_item = array(
                'prefix_id' => $prefix_id,
                'prefix_tname' => $prefix_tname
            );

            array_push($users_arr, $users_item);
        }
        echo json_encode($users_arr);
    } else {
        echo json_encode(array('message' => 'No prefix Found'));
    }

?>