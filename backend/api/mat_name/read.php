<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/mat_name.php';

    $database = new Database();
    $db = $database->connect();

    $mat_name = new MatName($db);

    $result = $mat_name->read();

    $num = $result->rowCount();
    

    if ($num > 0) {
        $mat_name_arr = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $mat_name_item = array(
                'mat_name_id' => $mat_name_id,
                'mat_name' => $mat_name,
                'mat_unit' => $mat_unit
            );

            array_push($mat_name_arr, $mat_name_item);
        }

        echo json_encode($mat_name_arr);

    } else {

        echo json_encode(array('status' => 'error', 'message' => 'No Found'));

    }

?>