<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/time_inspect.php';

    $database = new Database();
    $db = $database->connect();

    $timeinsp = new TimeInsp($db);


    $data = file_get_contents("php://input");
    $req = json_decode($data, true);

    if ($req && !empty($req['inspect_start']) && !empty($req['inspect_end']) && !empty($req['dr_id']) && !empty($req['project_id'])) {
        
        $timeinsp->inspect_start = $req['inspect_start'];
        $timeinsp->inspect_end = $req['inspect_end'];
        $timeinsp->dr_id = $req['dr_id'];
        $timeinsp->project_id = $req['project_id'];

        if ($timeinsp->create()) {
            $response = array("status" => "success", "message" => "Created.");
        } else {
            $response = array("status" => "error", "message" => "Failed to create");
        }
    } else {
        $response = array("status" => "error", "message" => "Invalid request data.");
    }

    echo json_encode($response);
?>