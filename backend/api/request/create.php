<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/database.php';
    include_once '../../models/request.php';

    $database = new Database();
    $db = $database->connect();

    $req = new Request($db);


    $data =  json_decode(file_get_contents("php://input"), true);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {

        
            // แยกไฟล์ที่อัปโหลดเพื่อจัดการ
            $file1 = $_FILES['req_problem'];
            $uploadDir1 = '../../upload/problem/'; // กำหนดโฟลเดอร์ที่ไฟล์จะถูกบันทึก
            $uploadPath1 = $uploadDir1 . $file1['name']; // กำหนด path ที่ไฟล์จะถูกบันทึก

            $file2 = $_FILES['req_daily'];
            $uploadDir2 = '../../upload/daily/'; // กำหนดโฟลเดอร์ที่ไฟล์จะถูกบันทึก
            $uploadPath2 = $uploadDir2 . $file2['name']; // กำหนด path ที่ไฟล์จะถูกบันทึก

            $file3 = $_FILES['req_license'];
            $uploadDir3 = '../../upload/license/'; // กำหนดโฟลเดอร์ที่ไฟล์จะถูกบันทึก
            $uploadPath3 = $uploadDir3 . $file3['name']; // กำหนด path ที่ไฟล์จะถูกบันทึก

            $file4 = $_FILES['req_certificate'];
            $uploadDir4 = '../../upload/certificate/'; // กำหนดโฟลเดอร์ที่ไฟล์จะถูกบันทึก
            $uploadPath4 = $uploadDir4 . $file4['name']; // กำหนด path ที่ไฟล์จะถูกบันทึก

            if (move_uploaded_file($file1['tmp_name'], $uploadPath1)) {
                if (move_uploaded_file($file2['tmp_name'], $uploadPath2)) {
                    if (move_uploaded_file($file3['tmp_name'], $uploadPath3)) {
                        if (move_uploaded_file($file4['tmp_name'], $uploadPath4)) {
                            $req->req_problem = $file1['name']; // เพิ่มข้อมูล path ของไฟล์ในตัวแปรของคุณ
                            $req->req_daily = $file2['name']; // เพิ่มข้อมูล path ของไฟล์ในตัวแปรของคุณ
                            $req->req_license = $file3['name']; // เพิ่มข้อมูล path ของไฟล์ในตัวแปรของคุณ
                            $req->req_certificate = $file4['name']; // เพิ่มข้อมูล path ของไฟล์ในตัวแปรของคุณ
                            $req->project_id = $data['project_id'];
                            $req->comp_id = $data['comp_id'];

                            if ($req->create()) {
                                $response = array("status" => "success", "message" => "Request created.");
                            } else {
                                $response = array("status" => "error", "message" => "Failed to create request.");
                            }
                            // สามารถย้ายไฟล์ได้
                        } else {
                            $response = array("status" => "error", "message" => "Error moving file.");
                        }
                    } else {
                        $response = array("status" => "error", "message" => "Error moving file.");
                    }
                } else {
                    $response = array("status" => "error", "message" => "Error moving file.");
                }
            } else {
                $response = array("status" => "error", "message" => "Error moving file.");
            }
        // } else {
        //     $response = array("status" => "error", "message" => "Invalid file or request data.");
        // }
    } else {
        $response = array("status" => "error", "message" => "Invalid request method.");
    }

    echo json_encode($response);

?>