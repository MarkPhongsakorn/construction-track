<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/work.php';

    $database = new Database();
    $db = $database->connect();

    $work = new Work($db);

    $data = json_decode(file_get_contents("php://input"));

    $work->dr_id = isset($_GET['dr_id']) ? $_GET['dr_id'] : die();

    if($work->delete()) {
        $response = array("status" => "success", "message" => "User deleted.");
    } else {
        $response = array("status" => "error", "message" => "Failed to deleted user.");
    }
    echo json_encode($response);


?>