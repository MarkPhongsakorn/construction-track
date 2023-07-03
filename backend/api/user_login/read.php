<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/user_login.php';

    $database = new Database();
    $db = $database->connect();

    $login = new Login($db);

    $result = $login->read();

    $num = $result->rowCount();
    

    if ($num > 0) {
        $login_arr = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $login_item = array(
                'user_login_id' => $user_login_id,
                'username' => $username,
                'password' => $password
            );

            array_push($login_arr, $login_item);
        }

        echo json_encode($login_arr);

    } else {

        echo json_encode(array('message' => 'No User Found'));

    }


?>