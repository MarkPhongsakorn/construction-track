<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
    header("Content-Type: application/json;");

    include_once '../../config/database.php';
    include_once '../../models/request.php';

    $database = new Database();
    $db = $database->connect();

    $req = new Request($db);

    $req->project_id = isset($_GET['project_id']) ? $_GET['project_id'] : die();
    $req->comp_id = isset($_GET['comp_id']) ? $_GET['comp_id'] : die();

    $result = $req->read_one();

    $num = $result->rowCount();

    if ($num > 0) {

        $req_arr = array();

            while($row = $result->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
    
                $req_item = array(
                    'req_id' => $row['req_id'],
                    'req_date' => $row['req_date'],
                    'req_problem' => $row['req_problem'],
                    'req_daily' => $row['req_daily'],
                    'req_license' => $row['req_license'],
                    'req_certificate' => $row['req_certificate'],
                    'project_id' => $row['project_id'],
                    'comp_id' => $row['comp_id']
                );
    
                array_push($req_arr, $req_item);
            }
            echo json_encode($req_arr);
    } else {
        echo json_encode(array("status" => "error", "message" => "Not Found Request"));
    }

    

?>