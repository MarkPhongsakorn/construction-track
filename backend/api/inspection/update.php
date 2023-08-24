<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/inspection.php';

    $database = new Database();
    $db = $database->connect();

    $inspec = new Inspection($db);

    $data = json_decode(file_get_contents("php://input"));

    $inspec->inspec_id = $data->inspec_id;
    $inspec->inspec_result_id = $data->inspec_result_id;
    $inspec->dr_id = $data->dr_id;
    $inspec->project_id = $data->project_id;

    if ($inspec->update()) {
        $response = array("status" => "success", "message" => "Inspection updated.");
    } else {
        $response = array("status" => "error", "message" => "Failed to updated inspection.");
    }

    echo json_encode($response);
?>