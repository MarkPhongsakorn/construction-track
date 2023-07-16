<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/unit.php';

    $database = new Database();
    $db = $database->connect();

    $unit = new Unit($db);

    $data = json_decode(file_get_contents("php://input"));

    $unit->unit_id = isset($_GET['unit_id']) ? $_GET['unit_id'] : die();

    if($unit->delete()) {
        $response = array("status" => "success", "message" => "User deleted.");
    } else {
        $response = array("status" => "error", "message" => "Failed to deleted user.");
    }
    echo json_encode($response);


?>