<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
    header("Content-Type: application/json;");

    include_once '../../config/database.php';
    include_once '../../models/inspec_result.php';

    $database = new Database();
    $db = $database->connect();

    $result = new Result($db);

    $result->inspec_id = isset($_GET['inspec_result_id']) ? $_GET['inspec_result_id'] : die();

    $results = $result->read_one();

    $num = $result->rowCount();

    if ($num > 0) {
        $row = $results->fetch(PDO::FETCH_ASSOC);

            $inspec_arr = array(
                'inspec_result_id' => $row['inspec_result_id'],
                'inspec_result' => $row['inspec_result']
            );

            http_response_code(200);
            echo json_encode($inspec_arr);
    } else {
        http_response_code(404);
        echo json_encode(array('message' => 'Not found.'));
    }

    

?>