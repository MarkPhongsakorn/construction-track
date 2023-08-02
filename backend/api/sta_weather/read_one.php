<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
    header("Content-Type: application/json;");

    include_once '../../config/database.php';
    include_once '../../models/sta_weather.php';

    $database = new Database();
    $db = $database->connect();

    $sta = new Status($db);

    $sta->sta_id = isset($_GET['sta_id']) ? $_GET['sta_id'] : die();

    $result = $sta->read_one();

    $num = $result->rowCount();

    if ($num > 0) {
        $row = $result->fetch(PDO::FETCH_ASSOC);

            $sta_arr = array(
                'sta_id' => $row['sta_id'],
                'sta_name' => $row['sta_name']
            );

            http_response_code(200);
            echo json_encode($sta_arr);
    } else {
        http_response_code(404);
        echo json_encode(array('message' => 'Not found.'));
    }

    

?>