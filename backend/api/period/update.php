<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/period.php';

    $database = new Database();
    $db = $database->connect();

    $period = new Period($db);

    $data = json_decode(file_get_contents("php://input"));

    $period->period_id = $data->period_id;
    $period->period_name = $data->period_name;

    if ($period->update()) {
        $response = array("status" => "success", "message" => "Company updated.");
    } else {
        $response = array("status" => "error", "message" => "Failed to updated company.");
    }

    echo json_encode($response);
?>