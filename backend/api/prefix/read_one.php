<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
    header("Content-Type: application/json;");

    include_once '../../config/database.php';
    include_once '../../models/prefix.php';

    $database = new Database();
    $db = $database->connect();

    $prefix = new Prefix($db);

    $prefix->prefix_id = isset($_GET['prefix_id']) ? $_GET['prefix_id'] : die();

    $result = $prefix->read_one($prefix->prefix_id);

    $num = $result->rowCount();

    if ($num > 0) {
        $row = $result->fetch(PDO::FETCH_ASSOC);

            $prefix_arr = array(
                'prefix_id' => $row['prefix_id'],
                'prefix_name' => $row['prefix_tname']
            );

            http_response_code(200);
            echo json_encode($prefix_arr);
    } else {
        http_response_code(404);
        echo json_encode(array('message' => 'Not found.'));
    }

?>