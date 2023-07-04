<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/user_detail.php';

    $database = new Database();
    $db = $database->connect();

    $detail = new Detail($db);

    $result = $detail->read();

    $num = $result->rowCount();
    

    if ($num > 0) {
        $detail_arr = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $detail_item = array(
                'user_detail_id' => $user_detail_id,
                'username' => $username,
                'password' => $password,
                'prefix_id' => $prefix_id,
                'user_fname' => $user_fname,
                'user_lname' => $user_lname,          
                'pos_id' => $pos_id,
                'user_email' => $user_email,
                'user_tel' => $user_tel,

            );

            array_push($detail_arr, $detail_item);
        }

        echo json_encode($detail_arr);

    } else {

        echo json_encode(array('message' => 'No User Found'));

    }


?>