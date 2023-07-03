<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
    header("Content-Type: application/json;");

    include_once '../../config/database.php';
    include_once '../../models/users.php';

    $database = new Database();
    $db = $database->connect();

    $users = new Users($db);

    $users->id = isset($_GET['id']) ? $_GET['id'] : die();

    $result = $users->read_one($users->id);

    $num = $result->rowCount();

    if ($num > 0) {
        $row = $result->fetch(PDO::FETCH_ASSOC);

            $users_arr = array(
                'id' => $row['id'],
                'username' => $row['username']
            );

            http_response_code(200);
            echo json_encode($users_arr);
    } else {
        http_response_code(404);
        echo json_encode(array('message' => 'Not found.'));
    }

?>