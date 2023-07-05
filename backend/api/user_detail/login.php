<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");


    include_once '../../config/database.php';
    include_once '../../models/user_detail.php';

    $database = new Database();
    $db = $database->connect();

    $detail = new Detail($db);

    $data = file_get_contents("php://input");
    $req = json_decode($data, true);

    if (!empty($req['username']) && !empty($req['password'])) {

        $detail->username = $req['username'];
        $detail->password = $req['password'];

        if ($detail->loginUser()) {
            http_response_code(200);
            echo json_encode(array("message" => "Login successful."));
        } else {
            http_response_code(401);
            echo json_encode(array("message" => "Login failed."));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Invalid login data."));
    }
    

?>