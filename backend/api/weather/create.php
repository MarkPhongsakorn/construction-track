<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/weather.php';

    $database = new Database();
    $db = $database->connect();

    $weather = new Weather($db);


    $data = file_get_contents("php://input");
    $req = json_decode($data, true);

    if ($req && !empty($req['period_id']) && !empty($req['sta_id']) && !empty($req['dr_id']) && !empty($req['project_id'])) {
        
        $weather->period_id = $req['period_id'];
        $weather->sta_id = $req['sta_id'];
        $weather->dr_id = $req['dr_id'];
        $weather->project_id = $req['project_id'];

        if ($weather->create()) {
            $response = array("status" => "success", "message" => "User created.");
        } else {
            $response = array("status" => "error", "message" => "Failed to create user.");
        }
    } else {
        $response = array("status" => "error", "message" => "Invalid request data.");
    }

    echo json_encode($response);
?>