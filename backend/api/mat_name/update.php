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

    $data = json_decode(file_get_contents("php://input"), true);

    if ($data && !empty($data['mat_name']) && !empty($data['mat_unit'])) {

        $mat_name->mat_name_id = $data['mat_name_id'];
        $mat_name->mat_name = $data['mat_name'];
        $mat_name->mat_unit = $data['mat_unit'];

        if ($mat_name->update()) {
            $response = array("status" => "success", "message" => "Material name updated.");
        } else {
            $response = array("status" => "error", "message" => "Failed to updated Material name.");
        }
    } else {
        $response = array("status" => "error", "message" => "Data Not Found");
    }

    echo json_encode($response);
?>