<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/tool.php';

    $database = new Database();
    $db = $database->connect();

    $tool = new Tool($db);

    $data = json_decode(file_get_contents("php://input"), true);

    if ($data && is_array($data) && !empty($data)) {
        $response = array();
        foreach ($data as $item) {
            if ($data && !empty($item['tool_name_id']) && isset($item['tool_num']) && !empty($item['dr_id']) && !empty($item['project_id'])) {
        
                $tool->tool_id = $item['tool_id'];
                $tool->tool_name_id = $item['tool_name_id'];
                $tool->tool_num = $item['tool_num'];
                $tool->dr_id = $item['dr_id'];
                $tool->project_id = $item['project_id'];
        
                if ($tool->update()) {
                    $response = array("status" => "success", "message" => "Tool created.");
                } else {
                    $response = array("status" => "error", "message" => "Failed to create tool.");
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