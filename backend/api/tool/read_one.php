<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
    header("Content-Type: application/json;");

    include_once '../../config/database.php';
    include_once '../../models/tool.php';

    $database = new Database();
    $db = $database->connect();

    $tool = new Tool($db);

    $tool->tool_id = isset($_GET['tool_id']) ? $_GET['tool_id'] : die();

    $result = $tool->read_one();

    $num = $result->rowCount();

    if ($num > 0) {
        $row = $result->fetch(PDO::FETCH_ASSOC);

            $tool_arr = array(
                'tool_id' => $row['tool_id'],
                'tool_name' => $row['tool_name'],
                'tool_num' => $row['tool_num'],
                'dr_id' => $row['dr_id']
            );

            http_response_code(200);
            echo json_encode($tool_arr);
    } else {
        http_response_code(404);
        echo json_encode(array('message' => 'Not found.'));
    }

    

?>