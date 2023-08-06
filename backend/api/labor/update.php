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

    if (!is_array($data)) {
        echo json_encode(array("status" => "error", "message" => "Invalid data format."));
        exit;
    }

    foreach ($data as $item) {
        $labor_id = $item['labor_id'];
        $labor_name = $item['labor_name'];
        $labor_num = $item['labor_num'];
        $dr_id = $item['dr_id'];
        $project_id = $item['project_id'];
    
        // ทำการอัปเดตข้อมูลสำหรับแต่ละตัวในรูปแบบของ array นี้
        $labor->labor_id = $labor_id;
        $labor->labor_name = $labor_name;
        $labor->labor_num = $labor_num;
        $labor->dr_id = $dr_id;
        $labor->project_id = $project_id;


        if ($labor->update()) {
            $response = array("status" => "success", "message" => "Labor updated.");
        } else {
            $response = array("status" => "error", "message" => "Failed to updated labor.");
        }
    }

    echo json_encode($response);
?>