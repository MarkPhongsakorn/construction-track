<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/user_detail.php';
    include_once '../../models/project.php';

    $database = new Database();
    $db = $database->connect();

    $project = new Project($db);


    $data = file_get_contents("php://input");
    $req = json_decode($data, true);

    if ($req && !empty($req['project_name']) && !empty($req['project_start']) && !empty($req['project_end'])
        && !empty($req['user_detail_id'])) {

        $project->project_name = $req['project_name'];
        $project->project_start = $req['project_start'];
        $project->project_end = $req['project_end'];
        $project->user_detail_id = $req['user_detail_id'];

        if ($project->create()) {
            $response = array("status" => "success", "message" => "User created.");
        } else {
            $response = array("status" => "error", "message" => "Failed to create user.");
        }
    } else {
        $response = array("status" => "error", "message" => "Invalid request data.");
    }

    echo json_encode($response);

?>