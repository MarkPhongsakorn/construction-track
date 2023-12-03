<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/overdue.php';

    $database = new Database();
    $db = $database->connect();

    $od = new Overdue($db);

    $data = json_decode(file_get_contents("php://input"), true);

    if ($data && !empty($data['od_detail']) && !empty($data['dr_id'])  && !empty($data['project_id'])) {
    
        $od->od_id = $data['od_id'];
        $od->od_detail = $data['od_detail'];
        $od->dr_id = $data['dr_id'];
        $od->project_id = $data['project_id'];

        if ($od->update()) {
            $response = array("status" => "success", "message" => "Data updated.");
        } else {
            $response = array("status" => "error", "message" => "Failed to updated data.");
        }
    } else {
        $response = array("status" => "error", "message" => "Invalid request data.");
    }

    echo json_encode($response);
?>