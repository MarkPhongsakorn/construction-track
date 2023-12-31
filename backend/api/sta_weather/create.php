<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/sta_weather.php';

    $database = new Database();
    $db = $database->connect();

    $sta = new Status($db);


    $data = file_get_contents("php://input");
    $req = json_decode($data, true);

    if ($req && !empty($req['sta_name'])) {
        
        $sta->sta_name = $req['sta_name'];

        if ($sta->create()) {
            $response = array("status" => "success", "message" => "User created.");
        } else {
            $response = array("status" => "error", "message" => "Failed to create user.");
        }
    } else {
        $response = array("status" => "error", "message" => "Invalid request data.");
    }

    echo json_encode($response);
?>