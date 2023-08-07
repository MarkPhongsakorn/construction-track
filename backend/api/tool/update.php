<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/tool.php';

    $database = new Database();
    $db = $database->connect();

    $tool = new Tool($db);

    $data = json_decode(file_get_contents("php://input"), true);

    if (!is_array($data)) {
        echo json_encode(array("status" => "error", "message" => "Invalid data format."));
        exit;
    }

    foreach ($data as $item) {

        $tool_id = $item['tool_id'];
        $tool_name = $item['tool_name'];
        $tool_num = $item['tool_num'];
        $unit_id = $item['unit_id'];
        $dr_id = $item['dr_id'];
        $project_id = $item['project_id'];

        $tool->tool_id = $tool_id;
        $tool->tool_name = $tool_name;
        $tool->tool_num = $tool_num;
        $tool->unit_id = $unit_id;
        $tool->dr_id = $dr_id;
        $tool->project_id = $project_id;

        if ($tool->update()) {
            $response = array("status" => "success", "message" => "Tool updated.");
        } else {
            $response = array("status" => "error", "message" => "Failed to updated tool.");
        }

    }

    echo json_encode($response);
?>