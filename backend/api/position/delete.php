<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/position.php';

    $database = new Database();
    $db = $database->connect();

    $pos = new Position($db);

    $data = json_decode(file_get_contents("php://input"));

    $pos->pos_id = isset($_GET['pos_id']) ? $_GET['pos_id'] : die();

    if($pos->delete()) {
        echo json_encode("User deleted.");
    } else {
        echo json_encode("Not deleted.");
    }

?>