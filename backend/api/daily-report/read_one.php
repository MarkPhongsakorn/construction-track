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
                'problem' => $row['problem'],
                'dr_start' => $row['dr_start'],
                'project_id' => $row['project_id'],
                'user_detail_id' => $row['user_detail_id'],
            );

            http_response_code(200);
            echo json_encode($dr_arr);
    } else {
        http_response_code(404);
        echo json_encode(array('message' => 'Not found.'));
    }

    

?>