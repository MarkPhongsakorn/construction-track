<?php

class Database {
    private $host = "localhost";
    private $db_name = "construction_track2";
    private $username = "root";
    private $password = "";
    public $conn;

    public function connect() {
        $this->conn = null;

        try {
            $dsn = "mysql:host=$this->host;dbname=$this->db_name;charset=utf8";
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_EMULATE_PREPARES => false,
            ];

            $this->conn = new PDO($dsn, $this->username, $this->password, $options);
           // echo json_encode("Connected Successfully");
        } catch (PDOException $exception) {
            echo json_encode("Connection error: " . $exception->getMessage());
        }

        return $this->conn;
    }
}
?>
