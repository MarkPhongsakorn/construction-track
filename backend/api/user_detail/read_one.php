<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
    header("Content-Type: application/json;");

    include_once '../../config/database.php';
    include_once '../../models/user_detail.php';

    $database = new Database();
    $db = $database->connect();

    $detail = new Detail($db);

    $detail->user_detail_id = isset($_GET['user_detail_id']) ? $_GET['user_detail_id'] : die();

    $result = $detail->read_one($detail->user_detail_id);

    $num = $result->rowCount();

    if ($num > 0) {
        $row = $result->fetch(PDO::FETCH_ASSOC);

            $detail_arr = array(
                'user_detail_id' => $row['user_detail_id'],
                'username' => $row['username'],
                'password' => $row['password'],
                'prefix_id' => $row['prefix_id'],
                'user_fname' => $row['user_fname'],
                'user_lname' => $row['user_lname'],          
                'pos_id' => $row['pos_id'],
                'user_email' => $row['user_email'],
                'user_tel' => $row['user_tel'],
            );

            http_response_code(200);
            echo json_encode($detail_arr);
    } else {
        http_response_code(404);
        echo json_encode(array('message' => 'Not found.'));
    }

?>