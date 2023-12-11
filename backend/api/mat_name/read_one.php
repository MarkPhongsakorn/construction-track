<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
    header("Content-Type: application/json;");

    include_once '../../config/database.php';
    include_once '../../models/mat_name.php';

    $database = new Database();
    $db = $database->connect();

    $mat_name = new MatName($db);

    $mat_name->mat_name_id = isset($_GET['mat_name_id']) ? $_GET['mat_name_id'] : die();

    $result = $mat_name->read_one();

    $num = $result->rowCount();

    if ($num > 0) {
        $row = $result->fetch(PDO::FETCH_ASSOC);

            $mat_name_arr = array(
                'mat_name_id' => $row['mat_name_id'],
                'mat_name' => $row['mat_name'],
                'mat_unit' => $row['mat_unit']
            );

            http_response_code(200);
            echo json_encode($mat_name_arr);
    } else {
        http_response_code(404);
        echo json_encode(array('message' => 'Not found.'));
    }

    

?>