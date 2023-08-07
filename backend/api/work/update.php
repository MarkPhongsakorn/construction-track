<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/work.php';

    $database = new Database();
    $db = $database->connect();

    $work = new Work($db);

    $data = json_decode(file_get_contents("php://input"), true);

    if (!is_array($data)) {
        echo json_encode(array("status" => "error", "message" => "Invalid data format."));
        exit;
    }

    foreach ($data as $item) {

        $work_id = $item['work_id'];
        $work_num = $item['work_num'];
        $work_detail = $item['work_detail'];
        $dr_id = $item['dr_id'];
        $project_id = $item['project_id'];

        $work->work_id = $work_id;
        $work->work_num = $work_num;
        $work->work_detail = $work_detail;
        $work->dr_id = $dr_id;
        $work->project_id = $project_id;

        if ($work->update()) {
            $response = array("status" => "success", "message" => "Work updated.");
        } else {
            $response = array("status" => "error", "message" => "Failed to updated work.");
        }

    }

    echo json_encode($response);
?>