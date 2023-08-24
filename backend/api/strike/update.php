<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/strike.php';

    $database = new Database();
    $db = $database->connect();

    $strike = new Strike($db);

    $data = json_decode(file_get_contents("php://input"), true);

    if ($data && !empty($data['strike_detail']) && !empty($data['strike_cause']) && !empty($data['dr_id'])  && !empty($data['project_id'])) {
    
        $strike->strike_id = $data['strike_id'];
        $strike->strike_detail = $data['strike_detail'];
        $strike->strike_cause = $data['strike_cause'];
        $strike->dr_id = $data['dr_id'];
        $strike->project_id = $data['project_id'];

        if ($strike->update()) {
            $response = array("status" => "success", "message" => "Company updated.");
        } else {
            $response = array("status" => "error", "message" => "Failed to updated company.");
        }
    } else {
        $response = array("status" => "error", "message" => "Invalid request data.");
    }

    echo json_encode($response);
?>