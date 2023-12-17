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


    $data = file_get_contents("php://input");
    $req = json_decode($data, true);

    if ($req && is_array($req) && !empty($req)) {
        $response = array();
        foreach ($req as $item) {
            if ($req && !empty($item['mat_name_id']) && !empty($item['mat_num']) && !empty($item['dr_id']) && !empty($item['project_id'])) {
        
                $mat->mat_name_id = $item['mat_name_id'];
                $mat->mat_num = $item['mat_num'];
                $mat->dr_id = $item['dr_id'];
                $mat->project_id = $item['project_id'];
        
                if ($mat->create()) {
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