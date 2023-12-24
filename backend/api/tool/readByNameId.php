<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
    header("Content-Type: application/json;");

    include_once '../../config/database.php';
    include_once '../../models/tool.php';

    $database = new Database();
    $db = $database->connect();

    $tool = new Tool($db);

    // $tool->dr_id = isset($_GET['dr_id']) ? $_GET['dr_id'] : die();
    $tool->tool_name_id = isset($_GET['tool_name_id']) ? $_GET['tool_name_id'] : die();

    $result = $tool->readByNameId();

    $num = $result->rowCount();

    if ($num > 0) {
        $tool_arr = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $tool_item = array(
                'tool_id' => $tool_id,
                'tool_name_id' => $tool_name_id,
                'tool_name' => $tool_name,
                'tool_num' => $tool_num,
                'dr_id' => $dr_id,
                'project_id' => $project_id,
            );

            array_push($tool_arr, $tool_item);
        }
            echo json_encode($tool_arr);
    } else {
        echo json_encode(array("status" => "error", "message" => "Not Found Data"));
    }

    

?>