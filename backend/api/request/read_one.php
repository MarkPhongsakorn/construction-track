<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
    header("Content-Type: application/json;");

    include_once '../../config/database.php';
    include_once '../../models/request.php';

    $database = new Database();
    $db = $database->connect();

    $req = new Request($db);

    $req->req_id = isset($_GET['req_id']) ? $_GET['req_id'] : die();

    $result = $req->read_one();

    $num = $result->rowCount();

    if ($num > 0) {
        $row = $result->fetch(PDO::FETCH_ASSOC);

            $req_arr = array(
                'req_id' => $row['req_id'],
                'req_problem' => $row['req_problem'],
                'req_daily' => $row['req_daily'],
                'req_license' => $row['req_license'],
                'req_certificate' => $row['req_certificate'],
                'user_detail_id' => $row['user_detail_id']
            );

            http_response_code(200);
            echo json_encode($req_arr);
    } else {
        http_response_code(404);
        echo json_encode(array('message' => 'Not found.'));
    }

    

?>