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


    $data = file_get_contents("php://input");
    $req = json_decode($data, true);

    if ($req && !empty($req['labor_name'])) {
        
        $labor_name->labor_name = $req['labor_name'];

        if ($labor_name->create()) {
            $response = array("status" => "success", "message" => "Labor name created.");
        } else {
            $response = array("status" => "error", "message" => "Failed to create labor name.");
        }
    } else {
        $response = array("status" => "error", "message" => "Invalid request data.");
    }

    echo json_encode($response);
?>