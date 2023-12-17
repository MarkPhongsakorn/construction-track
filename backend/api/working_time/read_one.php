<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
    header("Content-Type: application/json;");

    include_once '../../config/database.php';
    include_once '../../models/working_time.php';

    $database = new Database();
    $db = $database->connect();

    $work_time = new WorkTime($db);


    $work_time->dr_id = isset($_GET['dr_id']) ? $_GET['dr_id'] : die();

    $result = $work_time->read_one();

    $num = $result->rowCount();

    if ($num > 0) {
        $row = $result->fetch(PDO::FETCH_ASSOC);

            $work_time_arr = array(
                'work_time_id' => $row['work_time_id'],
                'work_start' => $row['work_start'],
                'work_end' => $row['work_end'],
                'dr_id' => $row['dr_id'],
                'project_id' => $row['project_id']
            );

            echo json_encode($work_time_arr);
    } else {
        echo json_encode(array("status" => "error", "message" => "Not Found Data"));
    }

    

?>