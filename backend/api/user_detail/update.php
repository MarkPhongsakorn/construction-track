<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/user_detail.php';

    $database = new Database();
    $db = $database->connect();

    $users = new Detail($db);

    $data = json_decode(file_get_contents("php://input"), true);

    if ($data && !empty($data['user_detail_id']) && !empty($data['prefix_id']) && !empty($data['user_fname'])
        && !empty($data['user_lname']) && !empty($data['pos_id']) && !empty($data['user_email']) && !empty($data['user_tel'])) {
            
        $users->user_detail_id = $data['user_detail_id'];
        $users->prefix_id = $data['prefix_id'];
        $users->user_fname = $data['user_fname'];
        $users->user_lname = $data['user_lname'];
        $users->pos_id = $data['pos_id'];
        $users->user_email = $data['user_email'];
        $users->user_tel = $data['user_tel'];

        if ($users->update()) {
            $response = array("status" => "success", "message" => "User updated.");
        } else {
            $response = array("status" => "error", "message" => "Failed to updated user.");
        }
    
    } else {
        $response = array("status" => "error", "message" => "Invalid request data.");
    }

    echo json_encode($response);
?>