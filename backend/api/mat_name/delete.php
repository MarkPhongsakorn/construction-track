<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/mat_name.php';

    $database = new Database();
    $db = $database->connect();

    $mat_name = new MatName($db);


    $data = json_decode(file_get_contents("php://input"));

    $mat_name->mat_name_id = isset($_GET['mat_name_id']) ? $_GET['mat_name_id'] : die();

    if($mat_name->delete()) {
        $response = array("status" => "success", "message" => "Material name deleted.");
    } else {
        $response = array("status" => "error", "message" => "Failed to deleted material name.");
    }
    echo json_encode($response);


?>