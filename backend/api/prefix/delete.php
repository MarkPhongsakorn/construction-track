<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/prefix.php';

    $database = new Database();
    $db = $database->connect();

    $prefix = new Prefix($db);

    $data = json_decode(file_get_contents("php://input"));

    $prefix->prefix_id = isset($_GET['prefix_id']) ? $_GET['prefix_id'] : die();

    if($prefix->delete()) {
        echo json_encode("User deleted.");
    } else {
        echo json_encode("Not deleted.");
    }

?>