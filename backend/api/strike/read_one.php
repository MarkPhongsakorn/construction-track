<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
    header("Content-Type: application/json;");

    include_once '../../config/database.php';
    include_once '../../models/strike.php';

    $database = new Database();
    $db = $database->connect();

    $strike = new Strike($db);

    $strike->dr_id = isset($_GET['dr_id']) ? $_GET['dr_id'] : die();

    $result = $strike->read_one();

    $num = $result->rowCount();

    if ($num > 0) {
        $row = $result->fetch(PDO::FETCH_ASSOC);

            $strike_arr = array(
                'strike_id' => $row['strike_id'],
                'strike_detail' => $row['strike_detail'],
                'strike_cause' => $row['strike_cause'],
                'dr_id' => $row['dr_id'],
                'project_id' => $row['project_id']
            );

            echo json_encode($strike_arr);
    } else {
        echo json_encode(array("status" => "error", "message" => "Not Found Data"));
    }

    

?>