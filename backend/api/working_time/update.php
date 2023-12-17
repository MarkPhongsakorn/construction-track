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

    $data = json_decode(file_get_contents("php://input"), true);

    if ($data && !empty($data['work_start']) && !empty($data['work_end'])
        && !empty($data['dr_id']) && !empty($data['project_id'])) {

        $work_time->work_time_id = $data['work_time_id'];
        $work_time->work_start = $data['work_start'];
        $work_time->work_end = $data['work_end'];
        $work_time->dr_id = $data['dr_id'];
        $work_time->project_id = $data['project_id'];
        

        if ($work_time->update()) {
            $response = array("status" => "success", "message" => "Updated.");
        } else {
            $response = array("status" => "error", "message" => "Failed to updated.");
        }

    } else {
        $response = array("status" => "error", "message" => "Invalid request data.");
    }

    echo json_encode($response);
?>