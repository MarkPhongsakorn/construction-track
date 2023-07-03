<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/user_detail.php';
    include_once '../../models/user_login.php';
    include_once '../../models/prefix.php';
    include_once '../../models/position.php';

    $database = new Database();
    $db = $database->connect();

    $detail = new Detail($db);
    $login = new Login($db);
    $prefix = new Prefix($db);
    $pos = new Position($db);

    $data = file_get_contents("php://input");
    $req = json_decode($data, true);

    if ($req && !empty($req['username']) && !empty($req['password']) && !empty($req['prefix_name']) && !empty($req['user_fname']) && !empty($req['user_lname'])
     && !empty($req['pos_name']) && !empty($req['user_email']) && !empty($req['user_tel']) && !empty($req['user_address'])) {
        
        if ($login->create()) {
            $detail->user_login_id = $login->user_login_id;
            if ($prefix->create()) {
                $detail->prefix_id = $prefix->prefix_id;
                if ($pos->create()) {
                    $detail->pos_id = $pos->pos_id;
                    $users->username = $req['username'];
                    $users->email = $req['email'];
                    $users->password = $req['password'];

                    if ($users->create()) {
                        $response = array("status" => "success", "message" => "User created.");
                    } else {
                        $response = array("status" => "error", "message" => "Failed to create user.");
                    }
                }
            }
        }
    } else {
        $response = array("status" => "error", "message" => "Invalid request data.");
    }

    echo json_encode($response);
?>