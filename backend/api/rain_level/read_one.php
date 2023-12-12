<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
    header("Content-Type: application/json;");

    include_once '../../config/database.php';
    include_once '../../models/rain_level.php';

    $database = new Database();
    $db = $database->connect();

    $rain = new RainLevel($db);

    $rain->rain_id = isset($_GET['rain_id']) ? $_GET['rain_id'] : die();

    $result = $rain->read_one();

    $num = $result->rowCount();

    if ($num > 0) {
        $row = $result->fetch(PDO::FETCH_ASSOC);

            $rain_arr = array(
                'rain_id' => $row['rain_id'],
                'rain_name' => $row['rain_name'],
            );

            http_response_code(200);
            echo json_encode($project_arr);
    } else {
        http_response_code(404);
        echo json_encode(array('status' => 'error', 'message' => 'Not found.'));
    }

    

?>