<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
    header("Content-Type: application/json;");

    include_once '../../config/database.php';
    include_once '../../models/tool_name.php';

    $database = new Database();
    $db = $database->connect();

    $tool_name = new ToolName($db);

    $tool_name->tool_name_id = isset($_GET['tool_name_id']) ? $_GET['tool_name_id'] : die();

    $result = $tool_name->read_one();

    $num = $result->rowCount();

    if ($num > 0) {
        $row = $result->fetch(PDO::FETCH_ASSOC);

            $tool_name_arr = array(
                'tool_name_id' => $row['tool_name_id'],
                'tool_name' => $row['tool_name']
            );

            http_response_code(200);
            echo json_encode($tool_name_arr);
    } else {
        http_response_code(404);
        echo json_encode(array('message' => 'Not found.'));
    }

    

?>