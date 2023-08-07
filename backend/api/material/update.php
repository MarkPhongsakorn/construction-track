<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/material.php';

    $database = new Database();
    $db = $database->connect();

    $mat = new Material($db);

    $data = json_decode(file_get_contents("php://input"), true);

    if (!is_array($data)) {
        echo json_encode(array("status" => "error", "message" => "Invalid data format."));
        exit;
    }

    foreach ($data as $item) {

        $mat_id = $item['mat_id'];
        $mat_name = $item['mat_name'];
        $mat_num = $item['mat_num'];
        $unit_id = $item['unit_id'];
        $dr_id = $item['dr_id'];
        $project_id = $item['project_id'];

        $mat->mat_id = $mat_id;
        $mat->mat_name = $mat_name;
        $mat->mat_num = $mat_num;
        $mat->unit_id = $unit_id;
        $mat->dr_id = $dr_id;
        $mat->project_id = $project_id;

        if ($mat->update()) {
            $response = array("status" => "success", "message" => "Material updated.");
        } else {
            $response = array("status" => "error", "message" => "Failed to updated material.");
        }

    }

    echo json_encode($response);
?>