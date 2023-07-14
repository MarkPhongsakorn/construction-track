<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
    header("Content-Type: application/json;");

    include_once '../../config/database.php';
    include_once '../../models/project.php';

    $database = new Database();
    $db = $database->connect();

    $project = new Project($db);

    $project->project_id = isset($_GET['project_id']) ? $_GET['project_id'] : die();

    $result = $project->read_one();

    $num = $result->rowCount();

    if ($num > 0) {
        $row = $result->fetch(PDO::FETCH_ASSOC);

            $project_arr = array(
                'project_id' => $row['project_id'],
                'project_name' => $row['project_name'],
                'project_start' => $row['project_start'],
                'project_end' => $row['project_end'],
                'user_detail_id' => $row['user_detail_id'],
                'user_fname' => $row['user_fname'],
                'user_lname' => $row['user_lname'],
                'comp_id' => $row['comp_id'],
                'comp_name' => $row['comp_name']
            );

            http_response_code(200);
            echo json_encode($project_arr);
    } else {
        http_response_code(404);
        echo json_encode(array('message' => 'Not found.'));
    }

    

?>