<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
    header("Content-Type: application/json;");

    include_once '../../config/database.php';
    include_once '../../models/project_status.php';

    $database = new Database();
    $db = $database->connect();

    $psta = new Psta($db);

    $psta->psta_id = isset($_GET['psta_id']) ? $_GET['psta_id'] : die();

    $result = $psta->read_one();

    $num = $result->rowCount();

    if ($num > 0) {
        $row = $result->fetch(PDO::FETCH_ASSOC);

            $psta_arr = array(
                'psta_id' => $row['psta_id'],
                'psta_name' => $row['psta_name']
            );

            http_response_code(200);
            echo json_encode($psta_arr);
    } else {
        http_response_code(404);
        echo json_encode(array('message' => 'Not found.'));
    }

    

?>