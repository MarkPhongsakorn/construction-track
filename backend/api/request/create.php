<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST"); // เรากำหนดให้เฉพาะ POST เท่านั้น
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/request.php';

    $database = new Database();
    $db = $database->connect();

    $req = new Request($db);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (isset($_FILES['req_problem']) && $_FILES['req_problem']['error'] === UPLOAD_ERR_OK) {
            $file1 = $_FILES['req_problem'];
            $uploadDir1 = '../../upload/problem/'; 
            $uploadPath1 = $uploadDir1 . $file1['name']; 
            if (move_uploaded_file($file1['tmp_name'], $uploadPath1)) {
                $req->req_problem = $file1['name'];
            } else {
                $response = array("status" => "error", "message" => "Error moving file problem.");
            }
        } else {
            $response = array("status" => "error", "message" => "Problem is null");
        }

        if (isset($_FILES['req_daily']) && $_FILES['req_daily']['error'] === UPLOAD_ERR_OK) {
            $file2 = $_FILES['req_daily'];
            $uploadDir2 = '../../upload/daily/'; 
            $uploadPath2 = $uploadDir2 . $file2['name']; 
            if (move_uploaded_file($file2['tmp_name'], $uploadPath2)) {
                $req->req_daily = $file2['name'];
            } else {
                $response = array("status" => "error", "message" => "Error moving file daily.");
            }
        } else {
            $response = array("status" => "error", "message" => "Daily is null");
        }

        if (isset($_FILES['req_license']) && $_FILES['req_license']['error'] === UPLOAD_ERR_OK) {
            $file3 = $_FILES['req_license'];
            $uploadDir3 = '../../upload/license/'; 
            $uploadPath3 = $uploadDir3 . $file3['name']; 
            if (move_uploaded_file($file3['tmp_name'], $uploadPath3)) {
                $req->req_license = $file3['name'];

                
            } else {
                $response = array("status" => "error", "message" => "Error moving file license.");
            }
        } else {
            $response = array("status" => "error", "message" => "License is null");
        }

        if (isset($_FILES['req_certificate']) && $_FILES['req_certificate']['error'] === UPLOAD_ERR_OK) {
            $file4 = $_FILES['req_certificate'];
            $uploadDir4 = '../../upload/certificate/'; 
            $uploadPath4 = $uploadDir4 . $file4['name']; 
            if (move_uploaded_file($file4['tmp_name'], $uploadPath4)) {
                $req->req_certificate = $file4['name'];

                
            } else {
                $response = array("status" => "error", "message" => "Error moving file certificate.");
            }
        } else {
            $response = array("status" => "error", "message" => "Certificate is null");
        }

        $data = $_POST;

        if (!empty($data['req_date']) && !empty($data['project_id']) && !empty($data['comp_id'])) {
            $req->req_date = $data['req_date'];
            $req->project_id = $data['project_id'];
            $req->comp_id = $data['comp_id'];

            if ($req->create()) {
                $response = array("status" => "success", "message" => "Request created.");
            } else {
                $response = array("status" => "error", "message" => "Failed to create request.");
            }
        } else {
            $response = array("status" => "error", "message" => "Invalid request data.");
        }
    } else {
        $response = array("status" => "error", "message" => "Invalid request method.");
    }

    echo json_encode($response);
?>
