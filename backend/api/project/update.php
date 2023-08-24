<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/project.php';

    $database = new Database();
    $db = $database->connect();

    $project = new Project($db);

    $data = json_decode(file_get_contents("php://input"), true);

    if ($data && !empty($data['project_name']) && !empty($data['project_start']) && !empty($data['project_end'])
        && !empty($data['user_detail_id']) && !empty($data['comp_id']) ) {

        $project->project_id = $data['project_id'];
        $project->project_name = $data['project_name'];
        $project->project_start = $data['project_start'];
        $project->project_end = $data['project_end'];
        $project->user_detail_id = $data['user_detail_id'];
        $project->comp_id = $data['comp_id'];
        

        if ($project->update()) {
            $response = array("status" => "success", "message" => "Project updated.");
        } else {
            $response = array("status" => "error", "message" => "Failed to updated project.");
        }

    } else {
        $response = array("status" => "error", "message" => "Invalid request data.");
    }

    echo json_encode($response);
?>