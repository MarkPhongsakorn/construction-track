<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/request.php';

    $database = new Database();
    $db = $database->connect();

    $req = new Request($db);

    $data = json_decode(file_get_contents("php://input"), true);

    $req->project_id = isset($_GET['project_id']) ? $_GET['project_id'] : die();

    if ($data) {
        // แยกที่อยู่ของโฟลเดอร์และชื่อไฟล์
    
        // ตรวจสอบว่าเป็นไดเรกทอรีหรือไม่ และ $data ไม่ใช่ null
        if ($data['req_problem'] != null) {
            unlink("../../upload/problem/".$data['req_problem']);
        } else {
            $response = array("status" => "error", "message" => "Data not found");
        }
    
        if ($data['req_daily'] != null) {
            unlink("../../upload/daily/".$data['req_daily']);
        } else {
            $response = array("status" => "error", "message" => "Data not found");
        }
    
        if ($data['req_license'] != null) {
            unlink("../../upload/license/".$data['req_license']);
        } else {
            $response = array("status" => "error", "message" => "Data not found");
        }
    
        if ($data['req_certificate'] != null) {
            unlink("../../upload/certificate/".$data['req_certificate']);
        } else {
            $response = array("status" => "error", "message" => "Data not found");
        }
    
        if ($req->deleteByProject()) {
            $response = array("status" => "success", "message" => "User deleted.");
        } else {
            $response = array("status" => "error", "message" => "Failed to delete user.");
        }
    } else {
        $response = array("status" => "error", "message" => "Data not found");
    }

    echo json_encode($response);


?>