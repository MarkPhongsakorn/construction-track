<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
    header("Content-Type: application/json;");

    include_once '../../config/database.php';
    include_once '../../models/inspection.php';

    $database = new Database();
    $db = $database->connect();

    $inspec = new Inspection($db);

    $inspec->dr_id = isset($_GET['dr_id']) ? $_GET['dr_id'] : die();

    $result = $inspec->read_one();

    $num = $result->rowCount();

    if ($num > 0) {
        $row = $result->fetch(PDO::FETCH_ASSOC);

            $inspec_arr = array(
                'inspec_id' => $row['inspec_id'],
                'inspec_result_id' => $row['inspec_result_id'],
                'inspec_result' => $row['inspec_result'],
                'dr_id' => $row['dr_id'],
                'project_id' => $row['project_id']
            );
            echo json_encode($inspec_arr);
    } else {
        echo json_encode(array("status" => "error", "message" => "Not Found Data"));
    }

    

?>