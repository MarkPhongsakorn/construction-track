<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/company.php';

    $database = new Database();
    $db = $database->connect();

    $comp = new Company($db);

    $result = $comp->read();

    $num = $result->rowCount();
    

    if ($num > 0) {
        $comp_arr = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $comp_item = array(
                'comp_id' => $comp_id,
                'comp_name' => $comp_name,
                'comp_email' => $comp_email,
                'comp_address' => $comp_address
            );

            array_push($comp_arr, $comp_item);
        }

        echo json_encode($comp_arr);

    } else {

        echo json_encode(array("status" => "error", 'message' => 'No User Found'));

    }