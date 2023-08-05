<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
    header("Content-Type: application/json;");

    include_once '../../config/database.php';
    include_once '../../models/problem.php';

    $database = new Database();
    $db = $database->connect();

    $prob = new Problem($db);

    $prob->dr_id = isset($_GET['dr_id']) ? $_GET['dr_id'] : die();

    $result = $prob->read_one();

    $num = $result->rowCount();

    if ($num > 0) {
        $row = $result->fetch(PDO::FETCH_ASSOC);

            $prob_arr = array(
                'prob_id' => $row['prob_id'],
                'problem' => $row['problem'],
                'dr_id' => $row['dr_id'],
                'project_id' => $row['project_id']
            );

            echo json_encode($prob_arr);
    } else {
        echo json_encode(array("status" => "error", "message" => "Not Found Data"));
    }

    

?>