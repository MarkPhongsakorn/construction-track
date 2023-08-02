<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/sta_weather.php';

    $database = new Database();
    $db = $database->connect();

    $sta = new Status($db);

    $result = $sta->read();

    $num = $result->rowCount();
    

    if ($num > 0) {
        $sta_arr = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $sta_item = array(
                'sta_id' => $sta_id,
                'sta_name' => $sta_name
            );

            array_push($sta_arr, $sta_item);
        }

        echo json_encode($sta_arr);

    } else {

        echo json_encode(array('message' => 'No User Found'));

    }