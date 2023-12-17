<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/working_time.php';

    $database = new Database();
    $db = $database->connect();

    $work_time = new WorkTime($db);


    $data = json_decode(file_get_contents("php://input"));

    $work_time->project_id = isset($_GET['project_id']) ? $_GET['project_id'] : die();

    if($work_time->deleteByProject()) {
        $response = array("status" => "success", "message" => "Deleted.");
    } else {
        $response = array("status" => "error", "message" => "Failed to deleted");
    }
    echo json_encode($response);


?>