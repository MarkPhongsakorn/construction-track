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

    if ($data && !empty($data['psta_id']) ) {

        $project->project_id = $data['project_id'];
        $project->psta_id = $data['psta_id'];
        

        if ($project->updatePsta()) {
            $response = array("status" => "success", "message" => "Project status updated.");
        } else {
            $response = array("status" => "error", "message" => "Failed to updated project status.");
        }

    } else {
        $response = array("status" => "error", "message" => "Invalid request data.");
    }

    echo json_encode($response);
?>