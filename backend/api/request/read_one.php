<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
    header("Content-Type: application/json;");
    header('Content-Type: application/octet-stream');

    include_once '../../config/database.php';
    include_once '../../models/request.php';

    $database = new Database();
    $db = $database->connect();

    $req = new Request($db);

    $req->req_id = isset($_GET['req_id']) ? $_GET['req_id'] : die();

    $result = $req->read_one();

    $num = $result->rowCount();

    if ($num > 0) {
        $row = $result->fetch(PDO::FETCH_ASSOC);
    
        $req_arr = array(
            'req_id' => $row['req_id'],
            'req_date' => $row['req_date'],
            'req_problem' => $row['req_problem'],
            'file_problem' => getFilePath($row['req_problem'], 'problem'),
            'req_daily' => $row['req_daily'],
            'file_daily' => getFilePath($row['req_daily'], 'daily'),
            'req_license' =>$row['req_license'],
            'file_license' => getFilePath($row['req_license'], 'license'),
            'req_certificate' => $row['req_certificate'],
            'file_certificate' => getFilePath($row['req_certificate'], 'certificate'),
            'project_id' => $row['project_id'],
            'comp_id' => $row['comp_id']
        );
    
        echo json_encode($req_arr);
    } else {
        echo json_encode(array("status" => "error", "message" => "Not Found Request"));
    }

    function getFilePath($filename, $type) {
        $fileDirectory = '../../upload/' . $type . '/';
        $filePath = $fileDirectory . $filename;
    
        // Check if the file exists
        if (file_exists($filePath)) {
            return $filePath;
        } else {
            // File does not exist
            return false;
        }
    }

    

?>