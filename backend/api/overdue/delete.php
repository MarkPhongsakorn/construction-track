<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/overdue.php';

    $database = new Database();
    $db = $database->connect();

    $od = new Overdue($db);

    $data = json_decode(file_get_contents("php://input"));

    $od->dr_id = isset($_GET['dr_id']) ? $_GET['dr_id'] : die();

    if($od->delete()) {
        $response = array("status" => "success", "message" => "Data deleted.");
    } else {
        $response = array("status" => "error", "message" => "Failed to deleted data.");
    }
    echo json_encode($response);


?>