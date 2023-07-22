<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/strike.php';

    $database = new Database();
    $db = $database->connect();

    $strike = new Strike($db);

    $data = json_decode(file_get_contents("php://input"));

    $strike->dr_id = isset($_GET['dr_id']) ? $_GET['dr_id'] : die();

    if($strike->delete()) {
        $response = array("status" => "success", "message" => "User deleted.");
    } else {
        $response = array("status" => "error", "message" => "Failed to deleted user.");
    }
    echo json_encode($response);


?>