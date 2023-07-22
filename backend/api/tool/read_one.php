<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
    header("Content-Type: application/json;");

    include_once '../../config/database.php';
    include_once '../../models/tool.php';

    $database = new Database();
    $db = $database->connect();

    $tool = new Tool($db);

    $tool->dr_id = isset($_GET['dr_id']) ? $_GET['dr_id'] : die();

    $result = $tool->read_one();

    $num = $result->rowCount();

    if ($num > 0) {
        $tool_arr = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $tool_item = array(
                'tool_id' => $tool_id,
                'tool_name' => $tool_name,
                'tool_num' => $tool_num,
                'unit_id' => $unit_id,
                'unit_name' => $unit_name,
                'dr_id' => $dr_id
            );

            array_push($tool_arr, $tool_item);
        }
            echo json_encode($tool_arr);
    } else {
        http_response_code(404);
        echo json_encode(array('message' => 'Not found.'));
    }

    

?>