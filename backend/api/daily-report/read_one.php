<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
    header("Content-Type: application/json;");

    include_once '../../config/database.php';
    include_once '../../models/daily-report.php';

    $database = new Database();
    $db = $database->connect();

    $dr = new Report($db);

    $dr->dr_id = isset($_GET['dr_id']) ? $_GET['dr_id'] : die();

    $result = $dr->read_one();

    $num = $result->rowCount();

    if ($num > 0) {
        $row = $result->fetch(PDO::FETCH_ASSOC);

            $dr_arr = array(
                'dr_id' => $row['dr_id'],
                'dr_time' => $row['dr_time'],
                'project_id' => $row['project_id'],
                'project_name' => $row['project_name'],
                'user_detail_id' => $row['user_detail_id'],
                'user_fname' => $row['user_fname'],
                'user_lname' => $row['user_lname']
            );
            
        echo json_encode($dr_arr);
    } else {
        echo json_encode(array("status" => "error", "message" => "Not Found Report"));
    }

    

?>