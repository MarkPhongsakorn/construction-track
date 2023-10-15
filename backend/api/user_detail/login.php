<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");


    include_once '../../config/database.php';
    include_once '../../models/user_detail.php';
    include_once '../../models/position.php';

    $database = new Database();
    $db = $database->connect();

    $detail = new Detail($db);
    $pos = new Position($db);

    $data = file_get_contents("php://input");
    $req = json_decode($data, true);

    if (!empty($req['username']) && !empty($req['password'])) {

        $detail->username = $req['username'];
        $detail->password = $req['password'];
        

        if ($detail->loginUser()) {
            $response = array("status" => "success", "message" => "Login Success.");

            $response['pos_id'] = $detail->getPos();
            $response['user_detail_id'] = $detail->getUserId();
            
        } else {
            $response = array("status" => "error", "message" => "Failed to login user.");
        }
    } else {
        $response = array("status" => "error", "message" => "Invalid login data.");
    }

    echo json_encode($response);
    

?>