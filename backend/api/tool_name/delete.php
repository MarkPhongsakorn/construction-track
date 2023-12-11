<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/tool_name.php';

    $database = new Database();
    $db = $database->connect();

    $tool_name = new ToolName($db);


    $data = json_decode(file_get_contents("php://input"));

    $tool_name->tool_name_id = isset($_GET['tool_name_id']) ? $_GET['tool_name_id'] : die();

    if($tool_name->delete()) {
        $response = array("status" => "success", "message" => "Tool name deleted.");
    } else {
        $response = array("status" => "error", "message" => "Failed to deleted tool name.");
    }
    echo json_encode($response);


?>