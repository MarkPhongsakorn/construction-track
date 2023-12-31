<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/work.php';

    $database = new Database();
    $db = $database->connect();

    $work = new Work($db);

    $data = json_decode(file_get_contents("php://input"), true);

    if ($data && is_array($data) && !empty($data)) {
        foreach ($data as $item) {
            if ($data && !empty($item['work_num']) && !empty($item['dr_id']) && !empty($item['project_id'])) {
        
                $work->work_id = $item['work_id'];
                $work->work_num = $item['work_num'];
                $work->work_detail = $item['work_detail'];
                $work->dr_id = $item['dr_id'];
                $work->project_id = $item['project_id'];
        
                if ($work->update()) {
                    $response = array("status" => "success", "message" => "Work created.");
                } else {
                    $response = array("status" => "error", "message" => "Failed to create work.");
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