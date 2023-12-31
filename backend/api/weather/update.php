<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/weather.php';

    $database = new Database();
    $db = $database->connect();

    $weather = new Weather($db);

    $data = json_decode(file_get_contents("php://input"));

    $weather->weather_id = $data->weather_id;
    $weather->period_id = $data->period_id;
    $weather->sta_id = $data->sta_id;
    $weather->rain_id = $data->rain_id;
    $weather->rain_start = $data->rain_start;
    $weather->rain_end = $data->rain_end;
    $weather->dr_id = $data->dr_id;
    $weather->project_id = $data->project_id;

    if ($weather->update()) {
        $response = array("status" => "success", "message" => "Weather updated.");
    } else {
        $response = array("status" => "error", "message" => "Failed to updated weather.");
    }

    echo json_encode($response);
?>