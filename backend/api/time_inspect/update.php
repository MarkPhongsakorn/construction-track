<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/time_inspect.php';

    $database = new Database();
    $db = $database->connect();

    $timeinsp = new TimeInsp($db);

    $data = json_decode(file_get_contents("php://input"), true);

    if ($data && !empty($data['inspect_start']) && !empty($data['inspect_end'])
        && !empty($data['dr_id']) && !empty($data['project_id'])) {

        $timeinsp->time_inspect_id = $data['time_inspect_id'];
        $timeinsp->inspect_start = $data['inspect_start'];
        $timeinsp->inspect_end = $data['inspect_end'];
        $timeinsp->dr_id = $data['dr_id'];
        $timeinsp->project_id = $data['project_id'];
        

        if ($timeinsp->update()) {
            $response = array("status" => "success", "message" => "Updated.");
        } else {
            $response = array("status" => "error", "message" => "Failed to updated.");
        }

    } else {
        $response = array("status" => "error", "message" => "Invalid request data.");
    }

    echo json_encode($response);
?>