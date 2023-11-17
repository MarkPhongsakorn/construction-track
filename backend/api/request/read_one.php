<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
    header("Content-Type: application/json;");

    include_once '../../config/database.php';
    include_once '../../models/request.php';

    $database = new Database();
    $db = $database->connect();

    $req = new Request($db);

    $req->req_id = isset($_GET['req_id']) ? $_GET['req_id'] : die();

    $result = $req->read_one();

    $num = $result->rowCount();

    function getFilePath1($filename) {
        $fileDirectory = '../../upload/problem/';
        return $fileDirectory . $filename;
    }
    function getFilePath2($filename) {
        $fileDirectory = '../../upload/daily/';
        return $fileDirectory . $filename;
    }
    function getFilePath3($filename) {
        $fileDirectory = '../../upload/license/';
        return $fileDirectory . $filename;
    }
    function getFilePath4($filename) {
        $fileDirectory = '../../upload/certificate/';
        return $fileDirectory . $filename;
    }

    if ($num > 0) {
        $row = $result->fetch(PDO::FETCH_ASSOC);
    
        $req_arr = array(
            'req_id' => $row['req_id'],
            'req_date' => $row['req_date'],
            'req_problem' => getFilePath1($row['req_problem']),
            'req_daily' => getFilePath2($row['req_daily']),
            'req_license' => getFilePath3($row['req_license']),
            'req_certificate' => getFilePath4($row['req_certificate']),
            'project_id' => $row['project_id'],
            'comp_id' => $row['comp_id']
        );
    
        echo json_encode($req_arr);
    } else {
        echo json_encode(array("status" => "error", "message" => "Not Found Request"));
    }

    

?>