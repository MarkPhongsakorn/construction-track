<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/project.php';

    $database = new Database();
    $db = $database->connect();

    $project = new Project($db);

    $result = $project->read();

    $num = $result->rowCount();
    

    if ($num > 0) {
        $project_arr = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $project_item = array(
                'project_id' => $project_id,
                'project_name' => $project_name,
                'project_start' => $project_start,
                'project_end' => $project_end,
                'user_fname' => $user_fname,
                'user_lname' => $user_lname,

            );

            array_push($project_arr, $project_item);
        }

        echo json_encode($project_arr);

    } else {

        echo json_encode(array('message' => 'No User Found'));

    }


?>