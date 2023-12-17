<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/labor.php';

    $database = new Database();
    $db = $database->connect();

    $labor = new Labor($db);

    $data = json_decode(file_get_contents("php://input"), true);

    if ($data && is_array($data) && !empty($data)) {
        foreach ($data as $item) {
            if (!empty($item['labor_name_id']) && !empty($item['labor_num']) && !empty($item['dr_id'])  && !empty($item['project_id'])) {
            
                $labor->labor_id = $item['labor_id'];
                $labor->labor_name_id = $item['labor_name_id'];
                $labor->labor_num = $item['labor_num'];
                $labor->dr_id = $item['dr_id'];
                $labor->project_id = $item['project_id'];
    
                if ($labor->update()) {
                    $response = array("status" => "success", "message" => "Labor updated.");
                } else {
                    $response = array("status" => "error", "message" => "Failed to updated labor.");
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