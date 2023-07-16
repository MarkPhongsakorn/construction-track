<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
    header("Content-Type: application/json;");

    include_once '../../config/database.php';
    include_once '../../models/weather.php';

    $database = new Database();
    $db = $database->connect();

    $weather = new Weather($db);

    $weather->weather_id = isset($_GET['weather_id']) ? $_GET['weather_id'] : die();

    $result = $weather->read_one();

    $num = $result->rowCount();

    if ($num > 0) {
        $row = $result->fetch(PDO::FETCH_ASSOC);

            $weather_arr = array(
                'weather_id' => $row['weather_id'],
                'period_id' => $row['period_id'],
                'sta_id' => $row['sta_id'],
                'dr_id' => $row['dr_id']
            );

            http_response_code(200);
            echo json_encode($weather_arr);
    } else {
        http_response_code(404);
        echo json_encode(array('message' => 'Not found.'));
    }

    

?>