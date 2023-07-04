<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/user_detail.php';
    include_once '../../models/prefix.php';
    include_once '../../models/position.php';

    $database = new Database();
    $db = $database->connect();

    $detail = new Detail($db);
    $prefix = new Prefix($db);
    $pos = new Position($db);


    $data = file_get_contents("php://input");
    $req = json_decode($data, true);

    if ($req && !empty($req['username']) && !empty($req['password']) && !empty($req['prefix_id'])
        && !empty($req['user_fname']) && !empty($req['user_lname']) && !empty($req['pos_id'])
        && !empty($req['user_email']) && !empty($req['user_tel'])) {

        $checkUser = $detail->getUserByUsername($req['username']);
        if ($checkUser) {
            $response = array("status" => "error", "message" => "Username already exists.");
            echo json_encode($response);
            exit;
        }

        $detail->username = $req['username'];
        $detail->password = password_hash($req['password'], PASSWORD_DEFAULT);
        $detail->user_fname = $req['user_fname'];
        $detail->user_lname = $req['user_lname'];
        $detail->user_email = $req['user_email'];
        $detail->user_tel = $req['user_tel'];
        $selectedPrefix = $req['prefix_id'];
        $selectedPosition = $req['pos_id'];

        if ($detail->create($selectedPrefix, $selectedPosition)) {
            $response = array("status" => "success", "message" => "User created.");
        } else {
            $response = array("status" => "error", "message" => "Failed to create user.");
        }
    } else {
        $response = array("status" => "error", "message" => "Invalid request data.");
    }

    echo json_encode($response);

?>