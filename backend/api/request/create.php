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


    $data = file_get_contents("php://input");
    $requ = json_decode($data, true);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {

        if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
            // $req->req_problem = $_POST['req_problem'];
            // $req->req_daily = $_POST['req_daily'];
            // $req->req_license = $_POST['req_license'];
            // $req->req_certificate = $_POST['req_certificate'];
            // $req->user_detail_id = $_POST['user_detail_id'];

            // แยกไฟล์ที่อัปโหลดเพื่อจัดการ
            $file = $_FILES['file'];
            $uploadDir = '../../upload'; // กำหนดโฟลเดอร์ที่ไฟล์จะถูกบันทึก
            $uploadPath = $uploadDir . '/' . $file['name']; // กำหนด path ที่ไฟล์จะถูกบันทึก

            if (move_uploaded_file($file['tmp_name'], $uploadPath)) {
                // สามารถย้ายไฟล์ได้
                $req->req_problem = $file['name']; // เพิ่มข้อมูล path ของไฟล์ในตัวแปรของคุณ

                if ($req->create()) {
                    $response = array("status" => "success", "message" => "Request created.");
                } else {
                    $response = array("status" => "error", "message" => "Failed to create request.");
                }
            } else {
                $response = array("status" => "error", "message" => "Error moving file.");
            }
        } else {
            $response = array("status" => "error", "message" => "Invalid file or request data.");
        }
    } else {
        $response = array("status" => "error", "message" => "Invalid request method.");
    }

    echo json_encode($response);

?>