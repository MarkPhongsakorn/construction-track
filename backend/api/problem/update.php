<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/problem.php';

    $database = new Database();
    $db = $database->connect();

    $prob = new Problem($db);

    $data = json_decode(file_get_contents("php://input"), true);

    if ($data && !empty($data['problem']) && !empty($data['dr_id'])  && !empty($data['project_id'])) {

        $prob->prob_id = $data['prob_id'];
        $prob->problem = $data['problem'];
        $prob->dr_id = $data['dr_id'];
        $prob->project_id = $data['project_id'];

        if ($prob->update()) {
            $response = array("status" => "success", "message" => "Problem updated.");
        } else {
            $response = array("status" => "error", "message" => "Failed to updated problem.");
        }
    } else {
        $response = array("status" => "error", "message" => "Invalid request data.");
    }

    echo json_encode($response);
?>