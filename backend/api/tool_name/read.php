<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/tool_name.php';

    $database = new Database();
    $db = $database->connect();

    $tool_name = new ToolName($db);

    $result = $tool_name->read();

    $num = $result->rowCount();
    

    if ($num > 0) {
        $tool_name_arr = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $tool_name_item = array(
                'tool_name_id' => $tool_name_id,
                'tool_name' => $tool_name
            );

            array_push($tool_name_arr, $tool_name_item);
        }

        echo json_encode($tool_name_arr);

    } else {

        echo json_encode(array('status' => 'error', 'message' => 'No Tool Name Found'));

    }

?>