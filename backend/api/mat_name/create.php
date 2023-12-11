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


    $data = file_get_contents("php://input");
    $req = json_decode($data, true);

    if ($req && !empty($req['mat_name']) && !empty($req['mat_unit'])) {
        
        $mat_name->mat_name = $req['mat_name'];
        $mat_name->mat_unit = $req['mat_unit'];

        if ($mat_name->create()) {
            $response = array("status" => "success", "message" => "Material Name created.");
        } else {
            $response = array("status" => "error", "message" => "Failed to create mat name.");
        }
    } else {
        $response = array("status" => "error", "message" => "Invalid request data.");
    }

    echo json_encode($response);
?>