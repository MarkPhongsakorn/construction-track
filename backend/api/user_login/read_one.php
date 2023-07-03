<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
    header("Content-Type: application/json;");

    include_once '../../config/database.php';
    include_once '../../models/user_login.php';

    $database = new Database();
    $db = $database->connect();

    $login = new Login($db);

    $login->user_login_id = isset($_GET['user_login_id']) ? $_GET['user_login_id'] : die();

    $result = $login->read_one($login->user_login_id);

    $num = $result->rowCount();

    if ($num > 0) {
        $row = $result->fetch(PDO::FETCH_ASSOC);

            $login_arr = array(
                'user_login_id' => $row['user_login_id'],
                'username' => $row['username'],
                'password' => $row['password']
            );

            http_response_code(200);
            echo json_encode($login_arr);
    } else {
        http_response_code(404);
        echo json_encode(array('message' => 'Not found.'));
    }

?>