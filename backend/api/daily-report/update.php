<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/daily-report.php';

    $database = new Database();
    $db = $database->connect();

    $dr = new Report($db);

    $data = json_decode(file_get_contents("php://input"));

    $dr->dr_id = $data->dr_id;
    $dr->problem = $data->problem;
    $dr->project_id = $data->project_id;
    $dr->user_detail_id = $data->user_detail_id;

    if ($dr->update()) {
        $response = array("status" => "success", "message" => "Report updated.");
    } else {
        $response = array("status" => "error", "message" => "Failed to updated report.");
    }

    echo json_encode($response);
?>