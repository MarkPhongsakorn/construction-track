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


    $data = file_get_contents("php://input");
    $req = json_decode($data, true);

    if ($req && is_array($req) && !empty($req)) {
        $response = array();
        foreach ($req as $item) {
            if ($req && !empty($item['work_num']) && !empty($item['work_detail']) && !empty($item['dr_id']) && !empty($item['project_id'])) {
        
                $work->work_num = $item['work_num'];
                $work->work_detail = $item['work_detail'];
                $work->dr_id = $item['dr_id'];
                $work->project_id = $item['project_id'];
        
                if ($work->create()) {
                    $response = array("status" => "success", "message" => "User created.");
                } else {
                    $response = array("status" => "error", "message" => "Failed to create user.");
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