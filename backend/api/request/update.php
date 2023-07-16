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

    $data = json_decode(file_get_contents("php://input"));

    $req->req_id = $data->req_id;
    $req->req_problem = $data->req_problem;
    $req->req_daily = $data->req_daily;
    $req->req_license = $data->req_license;
    $req->req_certificate = $data->req_certificate;
    $req->user_detail_id = $data->user_detail_id;

    if ($req->update()) {
        $response = array("status" => "success", "message" => "Project updated.");
    } else {
        $response = array("status" => "error", "message" => "Failed to updated project.");
    }

    echo json_encode($response);
?>