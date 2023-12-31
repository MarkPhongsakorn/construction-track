<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
    header("Content-Type: application/json;");

    include_once '../../config/database.php';
    include_once '../../models/company.php';

    $database = new Database();
    $db = $database->connect();

    $comp = new Company($db);

    $comp->comp_id = isset($_GET['comp_id']) ? $_GET['comp_id'] : die();

    $result = $comp->read_one();

    $num = $result->rowCount();

    if ($num > 0) {
        $row = $result->fetch(PDO::FETCH_ASSOC);

            $comp_arr = array(
                'comp_id' => $row['comp_id'],
                'comp_name' => $row['comp_name'],
                'comp_email' => $row['comp_email'],
                'comp_address' => $row['comp_address']
            );

            http_response_code(200);
            echo json_encode($comp_arr);
    } else {
        http_response_code(404);
        echo json_encode(array('message' => 'Not found.'));
    }

    

?>