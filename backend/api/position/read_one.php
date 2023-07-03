<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
    header("Content-Type: application/json;");

    include_once '../../config/database.php';
    include_once '../../models/position.php';

    $database = new Database();
    $db = $database->connect();

    $pos = new Position($db);

    $pos->pos_id = isset($_GET['pos_id']) ? $_GET['pos_id'] : die();

    $result = $pos->read_one();

    $num = $result->rowCount();

    if ($num > 0) {
        $row = $result->fetch(PDO::FETCH_ASSOC);

            $pos_arr = array(
                'pos_id' => $row['pos_id'],
                'pos_name' => $row['pos_name']
            );

            http_response_code(200);
            echo json_encode($pos_arr);
    } else {
        http_response_code(404);
        echo json_encode(array('message' => 'Not found.'));
    }

    

?>