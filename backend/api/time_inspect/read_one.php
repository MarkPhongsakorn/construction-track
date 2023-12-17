<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
    header("Content-Type: application/json;");

    include_once '../../config/database.php';
    include_once '../../models/time_inspect.php';

    $database = new Database();
    $db = $database->connect();

    $timeinsp = new TimeInsp($db);


    $timeinsp->dr_id = isset($_GET['dr_id']) ? $_GET['dr_id'] : die();

    $result = $timeinsp->read_one();

    $num = $result->rowCount();

    if ($num > 0) {
        $row = $result->fetch(PDO::FETCH_ASSOC);

            $timeinsp_arr = array(
                'time_inspect_id' => $row['time_inspect_id'],
                'inspect_start' => $row['inspect_start'],
                'inspect_end' => $row['inspect_end'],
                'dr_id' => $row['dr_id'],
                'project_id' => $row['project_id']
            );

            echo json_encode($timeinsp_arr);
    } else {
        echo json_encode(array("status" => "error", "message" => "Not Found Data"));
    }

    

?>