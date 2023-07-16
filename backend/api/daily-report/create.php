<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/user_detail.php';
    include_once '../../models/project.php';
    include_once '../../models/daily-report.php';

    $database = new Database();
    $db = $database->connect();

    $dr = new Report($db);


    $data = file_get_contents("php://input");
    $req = json_decode($data, true);

    if ($req && !empty($req['dr_time']) && !empty($req['problem']) && !empty($req['project_id'])
        && !empty($req['user_detail_id'])) {

        $dr->dr_time = $req['dr_time'];
        $dr->problem = $req['problem'];
        $dr->project_id = $req['project_id'];
        $dr->user_detail_id = $req['user_detail_id'];


        if ($dr->create()) {
            $response = array("status" => "success", "message" => "Report created.");
        } else {
            $response = array("status" => "error", "message" => "Failed to create user.");
        }
    } else {
        $response = array("status" => "error", "message" => "Invalid request data.");
    }

    echo json_encode($response);

?>