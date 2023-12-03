<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/overdue.php';

    $database = new Database();
    $db = $database->connect();

    $od = new Overdue($db);


    $data = file_get_contents("php://input");
    $req = json_decode($data, true);

    if ($req && !empty($req['od_detail']) && !empty($req['dr_id']) && !empty($req['project_id'])) {
        
        $od->od_detail = $req['od_detail'];
        $od->dr_id = $req['dr_id'];
        $od->project_id = $req['project_id'];

        if ($od->create()) {
            $response = array("status" => "success", "message" => "Data created.");
        } else {
            $response = array("status" => "error", "message" => "Failed to create data.");
        }
    } else {
        $response = array("status" => "error", "message" => "Invalid request data.");
    }

    echo json_encode($response);
?>