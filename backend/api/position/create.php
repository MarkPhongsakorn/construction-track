<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/position.php';

    $database = new Database();
    $db = $database->connect();

    $pos = new Position($db);

    $data = file_get_contents("php://input");
    $req = json_decode($data, true);

    if ($req && !empty($req['pos_name'])) {
        $pos->pos_name = $req['pos_name'];

        if ($pos->create()) {
            $response = array("status" => "success", "message" => "User created.");
        } else {
            $response = array("status" => "error", "message" => "Failed to create user.");
        }
    } else {
        $response = array("status" => "error", "message" => "Invalid request data.");
    }

    echo json_encode($response);
?>