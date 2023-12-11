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

    $data = json_decode(file_get_contents("php://input"), true);

    if ($data && !empty($data['tool_name'])) {

        $tool_name->tool_name_id = $data['tool_name_id'];
        $tool_name->tool_name = $data['tool_name'];

        if ($tool_name->update()) {
            $response = array("status" => "success", "message" => "Tool name updated.");
        } else {
            $response = array("status" => "error", "message" => "Failed to updated tool name.");
        }
    } else {
        $response = array("status" => "error", "message" => "Data Not Found");
    }

    echo json_encode($response);
?>