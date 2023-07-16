<?php

    class Request {
        private $conn;
        private $table = "tb_request";

        public $req_id;
        public $req_problem;
        public $req_daily;
        public $req_license;
        public $req_certificate;

        public $user_detail_id;

        public function __construct($db) {
            $this->conn = $db;
        }

        public function read() {

            $query = 'SELECT * FROM ' . $this->table . '';

            $stmt = $this->conn->prepare($query);
            $stmt->execute();

            return $stmt;
        }

        public function read_one() {

            $query = 'SELECT * FROM ' . $this->table . ' WHERE req_id = :req_id';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':req_id', $this->req_id);
            $stmt->execute();

            return $stmt;
        }

        public function create() {
            $query = 'INSERT INTO ' . $this->table . '
            SET
                req_problem = :req_problem,
                req_daily = :req_daily,
                req_license = :req_license,
                req_certificate = :req_certificate,
                user_detail_id = :user_detail_id';

            $stmt = $this->conn->prepare($query);

            $this->req_problem = htmlspecialchars(strip_tags($this->req_problem));
            $this->req_daily = htmlspecialchars(strip_tags($this->req_daily));
            $this->req_license = htmlspecialchars(strip_tags($this->req_license));
            $this->req_certificate = htmlspecialchars(strip_tags($this->req_certificate));
            $this->user_detail_id = htmlspecialchars(strip_tags($this->user_detail_id));

            $stmt->bindParam(':req_problem', $this->req_problem);
            $stmt->bindParam(':req_daily', $this->req_daily);
            $stmt->bindParam(':req_license', $this->req_license);
            $stmt->bindParam(':req_certificate', $this->req_certificate);
            $stmt->bindParam(':user_detail_id', $this->user_detail_id);

            if ($stmt->execute()) {
                return json_encode("Created.");
            } else {
                return json_encode("Failed to create.");
            }
        }

        public function update() {
            $query = 'UPDATE ' . $this->table . '
            SET
                req_problem = :req_problem,
                req_daily = :req_daily,
                req_license = :req_license,
                req_certificate = :req_certificate,
                user_detail_id = :user_detail_id
            WHERE
                req_id = :req_id';

            $stmt = $this->conn->prepare($query);

            $this->req_problem = htmlspecialchars(strip_tags($this->req_problem));
            $this->req_daily = htmlspecialchars(strip_tags($this->req_daily));
            $this->req_license = htmlspecialchars(strip_tags($this->req_license));
            $this->req_certificate = htmlspecialchars(strip_tags($this->req_certificate));
            $this->user_detail_id = htmlspecialchars(strip_tags($this->user_detail_id));

            $stmt->bindParam(':req_problem', $this->req_problem);
            $stmt->bindParam(':req_daily', $this->req_daily);
            $stmt->bindParam(':req_license', $this->req_license);
            $stmt->bindParam(':req_certificate', $this->req_certificate);
            $stmt->bindParam(':user_detail_id', $this->user_detail_id);
            $stmt->bindParam(':req_id', $this->req_id);

            if ($stmt->execute()) {
                return json_encode("Updated.");
            } else {
                return json_encode("Failed to updated.");
            }
            
        }

        public function delete() {

            $query = 'DELETE FROM ' . $this->table . ' WHERE req_id = :req_id';
            $stmt = $this->conn->prepare($query);

            $this->req_id = htmlspecialchars(strip_tags($this->req_id));

            $stmt->bindParam(':req_id', $this->req_id);

            if ($stmt->execute()) {
                return true;
            }

            return false;
        }
    }

?>