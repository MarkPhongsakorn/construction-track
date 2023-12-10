<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/labor_name.php';

    $database = new Database();
    $db = $database->connect();

    $labor_name = new LaborName($db);

    $data = json_decode(file_get_contents("php://input"));

    $labor_name->labor_name_id = isset($_GET['labor_name_id']) ? $_GET['labor_name_id'] : die();

    if($labor_name->delete()) {
        $response = array("status" => "success", "message" => "Labor name deleted.");
    } else {
        $response = array("status" => "error", "message" => "Failed to deleted labor name.");
    }
    echo json_encode($response);


?>