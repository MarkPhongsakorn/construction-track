<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/tool.php';

    $database = new Database();
    $db = $database->connect();

    $tool = new Tool($db);

    $result = $tool->read();

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
                'dr_id' => $dr_id
            );

            array_push($tool_arr, $tool_item);
        }

        echo json_encode($tool_arr);

    } else {

        echo json_encode(array('message' => 'No User Found'));

    }