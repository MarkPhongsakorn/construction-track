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

    $req->req_id = isset($_GET['req_id']) ? $_GET['req_id'] : die();

    if ($data) {
        $problemFilePath = "../../upload/problem/" . $data['req_problem'];
        $dailyFilePath = "../../upload/daily/" . $data['req_daily'];
        $licenseFilePath = "../../upload/license/" . $data['req_license'];
        $certificateFilePath = "../../upload/certificate/" . $data['req_certificate'];
    
        // ตรวจสอบว่าไฟล์มีอยู่จริงหรือไม่
        if (file_exists($problemFilePath)) {
            unlink($problemFilePath);
        }
    
        if (file_exists($dailyFilePath)) {
            unlink($dailyFilePath);
        }
    
        if (file_exists($licenseFilePath)) {
            unlink($licenseFilePath);
        }
    
        if (file_exists($certificateFilePath)) {
            unlink($certificateFilePath);
        }

        if ($req->delete()) {
            $response = array("status" => "success", "message" => "User deleted.");
        } else {
            $response = array("status" => "error", "message" => "Failed to delete user.");
        }
    
    } else {
        $response = array("status" => "error", "message" => "Data not found");
    }

    echo json_encode($response);


?>