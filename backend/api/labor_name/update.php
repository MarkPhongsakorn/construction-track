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

    $data = json_decode(file_get_contents("php://input"), true);

    if ($data && !empty($data['labor_name'])) {

        $labor_name->labor_name_id = $data['labor_name_id'];
        $labor_name->labor_name = $data['labor_name'];

        if ($labor_name->update()) {
            $response = array("status" => "success", "message" => "Company updated.");
        } else {
            $response = array("status" => "error", "message" => "Failed to updated company.");
        }
    } else {
        $response = array("status" => "error", "message" => "Data Not Found");
    }

    echo json_encode($response);
?>