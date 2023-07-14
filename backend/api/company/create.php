<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/company.php';

    $database = new Database();
    $db = $database->connect();

    $comp = new Company($db);


    $data = file_get_contents("php://input");
    $req = json_decode($data, true);

    if ($req && !empty($req['comp_name']) && !empty($req['comp_email']) && !empty($req['comp_address']) ) {
        
        $comp->comp_name = $req['comp_name'];
        $comp->comp_email = $req['comp_email'];
        $comp->comp_address = $req['comp_address'];

        if ($comp->create()) {
            $response = array("status" => "success", "message" => "User created.");
        } else {
            $response = array("status" => "error", "message" => "Failed to create user.");
        }
    } else {
        $response = array("status" => "error", "message" => "Invalid request data.");
    }

    echo json_encode($response);
?>