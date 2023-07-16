<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/request.php';

    $database = new Database();
    $db = $database->connect();

    $req = new Request($db);


    $data = file_get_contents("php://input");
    $requ = json_decode($data, true);

    if ($req && !empty($requ['req_problem']) && !empty($requ['req_daily']) && !empty($requ['req_license'])
        && !empty($requ['req_certificate']) && !empty($requ['user_detail_id']) ) {

        $req->req_problem = $requ['req_problem'];
        $req->req_daily = $requ['req_daily'];
        $req->req_license = $requ['req_license'];
        $req->req_certificate = $requ['req_certificate'];
        $req->user_detail_id = $requ['user_detail_id'];

        if ($req->create()) {
            $response = array("status" => "success", "message" => "User created.");
        } else {
            $response = array("status" => "error", "message" => "Failed to create user.");
        }
    } else {
        $response = array("status" => "error", "message" => "Invalid request data.");
    }

    echo json_encode($response);

?>