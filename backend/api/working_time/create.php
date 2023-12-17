<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/working_time.php';

    $database = new Database();
    $db = $database->connect();

    $work_time = new WorkTime($db);


    $data = file_get_contents("php://input");
    $req = json_decode($data, true);

    if ($req && !empty($req['work_start']) && !empty($req['work_end']) && !empty($req['dr_id']) && !empty($req['project_id'])) {
        
        $work_time->work_start = $req['work_start'];
        $work_time->work_end = $req['work_end'];
        $work_time->dr_id = $req['dr_id'];
        $work_time->project_id = $req['project_id'];

        if ($work_time->create()) {
            $response = array("status" => "success", "message" => "Created.");
        } else {
            $response = array("status" => "error", "message" => "Failed to create");
        }
    } else {
        $response = array("status" => "error", "message" => "Invalid request data.");
    }

    echo json_encode($response);
?>