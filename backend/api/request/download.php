<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Content-Type: application/pdf");


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

    $filePath = array(
        'req_problem' => '../../upload/problem/' . $row['req_problem'],
        'req_daily' => '../../upload/daily/' . $row['req_daily'],
        'req_license' => '../../upload/license/' . $row['req_license'],
        'req_certificate' => '../../upload/certificate/' . $row['req_certificate']
    );
    // รวมข้อมูลจากไฟล์ที่ต้องการดาวน์โหลด
    $fileContents = array();
    foreach ($filePath as $fileName => $file) {
        // ตรวจสอบว่าคีย์นั้นๆ มีอยู่ใน $row หรือไม่
        if (array_key_exists($fileName, $row) && file_exists($file)) {
            $fileContents[] = file_get_contents($file);
        } else {
            // ถ้าไฟล์ไม่มีอยู่จริง, สามารถเพิ่มข้อมูลเป็น null หรือข้อมูลที่ต้องการได้ตามความเหมาะสม
            $fileContents[] = null;
        }
    }
    // $response = array("files" => $fileContents);
    // echo json_encode($response);
    var_dump($fileContents);

    // ตรวจสอบว่ามีข้อมูลที่ต้องการส่งกลับหรือไม่
    if (!empty($fileContents)) {
        // สร้าง Blob จากข้อมูลที่รวม
        $mergedBlob = new Blob($fileContents, array('type' => 'application/pdf'));

        // ส่ง Blob กลับไปให้ Angular
        // echo $mergedBlob->stream();
    } else {
        echo json_encode(array("status" => "error", "message" => "No files to download"));
    }
} else {
    echo json_encode(array("status" => "error", "message" => "Not Found Request"));
}
?>
