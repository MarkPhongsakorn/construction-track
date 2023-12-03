<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
    header("Content-Type: application/json;");

    include_once '../../config/database.php';
    include_once '../../models/overdue.php';

    $database = new Database();
    $db = $database->connect();

    $od = new Overdue($db);

    $od->dr_id = isset($_GET['dr_id']) ? $_GET['dr_id'] : die();

    $result = $od->read_one();

    $num = $result->rowCount();

    if ($num > 0) {
        $row = $result->fetch(PDO::FETCH_ASSOC);

            $od_arr = array(
                'od_id' => $row['od_id'],
                'od_detail' => $row['od_detail'],
                'dr_id' => $row['dr_id'],
                'project_id' => $row['project_id']
            );

            echo json_encode($od_arr);
    } else {
        echo json_encode(array("status" => "error", "message" => "Not Found Data"));
    }

    

?>