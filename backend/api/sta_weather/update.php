<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/sta_weather.php';

    $database = new Database();
    $db = $database->connect();

    $sta = new Status($db);
    $data = json_decode(file_get_contents("php://input"));

    $sta->sta_id = $data->sta_id;
    $sta->sta_name = $data->sta_name;

    if ($sta->update()) {
        $response = array("status" => "success", "message" => "Company updated.");
    } else {
        $response = array("status" => "error", "message" => "Failed to updated company.");
    }

    echo json_encode($response);
?>