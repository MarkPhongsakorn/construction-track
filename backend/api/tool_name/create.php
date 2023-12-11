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


    $data = file_get_contents("php://input");
    $req = json_decode($data, true);

    if ($req && !empty($req['tool_name'])) {
        
        $tool_name->tool_name = $req['tool_name'];

        if ($tool_name->create()) {
            $response = array("status" => "success", "message" => "Tool name created.");
        } else {
            $response = array("status" => "error", "message" => "Failed to create tool name.");
        }
    } else {
        $response = array("status" => "error", "message" => "Invalid request data.");
    }

    echo json_encode($response);
?>