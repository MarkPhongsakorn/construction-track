<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/company.php';

    $database = new Database();
    $db = $database->connect();

    $comp = new Company($db);

    $data = json_decode(file_get_contents("php://input"));

    $comp->comp_id = isset($_GET['comp_id']) ? $_GET['comp_id'] : die();

    if($comp->delete()) {
        $response = array("status" => "success", "message" => "User deleted.");
    } else {
        $response = array("status" => "error", "message" => "Failed to deleted user.");
    }
    echo json_encode($response);


?>