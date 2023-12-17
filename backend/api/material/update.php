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

    if ($data && is_array($data) && !empty($data)) {
        $response = array();
        foreach ($data as $item) {
            if ($data && !empty($item['mat_name_id']) && !empty($item['mat_num']) && !empty($item['dr_id']) && !empty($item['project_id'])) {
                
                $mat->mat_id = $item['mat_id'];
                $mat->mat_name_id = $item['mat_name_id'];
                $mat->mat_num = $item['mat_num'];
                $mat->dr_id = $item['dr_id'];
                $mat->project_id = $item['project_id'];
        
                if ($mat->update()) {
                    $response = array("status" => "success", "message" => "Material created.");
                } else {
                    $response = array("status" => "error", "message" => "Failed to create material.");
                }
            } else {
                $response = array("status" => "error", "message" => "Invalid request data.");
            }
        }
    } else {
        $response = array("status" => "error", "message" => "Invalid request data.");
    }

    echo json_encode($response);
?>