<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/weather.php';

    $database = new Database();
    $db = $database->connect();

    $weather = new Weather($db);

    $result = $weather->read();

    $num = $result->rowCount();
    

    if ($num > 0) {
        $weather_arr = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $weather_item = array(
                'weather_id' => $weather_id,
                'period_id' => $period_id,
                'sta_id' => $sta_id,
                'rain_id' => $rain_id,
                'rain_start' => $rain_start,
                'rain_end' => $rain_end,
                'dr_id' => $dr_id,
                'project_id' => $project_id
            );

            array_push($weather_arr, $weather_item);
        }

        echo json_encode($weather_arr);

    } else {

        echo json_encode(array('message' => 'No User Found'));

    }