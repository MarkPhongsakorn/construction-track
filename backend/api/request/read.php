<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/request.php';

    $database = new Database();
    $db = $database->connect();

    $req = new Request($db);

    $result = $req->read();

    $num = $result->rowCount();
    

    if ($num > 0) {
        $req_arr = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $req_item = array(
                'req_id' => $req_id,
                'req_problem' => $req_problem,
                'req_daily' => $req_daily,
                'req_license' => $req_license,
                'req_certificate' => $req_certificate,
                'user_detail_id' => $user_detail_id
            );

            array_push($req_arr, $req_item);
        }

        echo json_encode($req_arr);

    } else {

        echo json_encode(array("status" => "error", "message" => "Not Found Project"));

    }


?>