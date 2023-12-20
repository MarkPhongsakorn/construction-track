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


    $data = json_decode(file_get_contents("php://input"));

    $timeinsp->project_id = isset($_GET['project_id']) ? $_GET['project_id'] : die();

    if($timeinsp->deleteByProject()) {
        $response = array("status" => "success", "message" => "Deleted.");
    } else {
        $response = array("status" => "error", "message" => "Failed to deleted");
    }
    echo json_encode($response);


?>