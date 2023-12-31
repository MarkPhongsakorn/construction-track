<?php

    class Request {
        private $conn;
        private $table = "tb_request";

        public $req_id;
        public $req_date;
        public $req_problem;
        public $req_daily;
        public $req_license;
        public $req_certificate;

        public $project_id;
        public $comp_id;

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

            $query = 'SELECT * FROM ' . $this->table . ' WHERE req_id = :req_id ORDER BY req_date';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':req_id', $this->req_id);
            $stmt->execute();

            return $stmt;
        }

        public function readByID() {

            $query = 'SELECT * FROM ' . $this->table . ' WHERE project_id = :project_id AND comp_id = :comp_id';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':project_id', $this->project_id);
            $stmt->bindParam(':comp_id', $this->comp_id);
            $stmt->execute();

            return $stmt;
        }

        public function readByProject() {

            $query = 'SELECT * FROM ' . $this->table . ' WHERE project_id = :project_id';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':project_id', $this->project_id);
            $stmt->execute();

            return $stmt;
        }

        public function create() {

            $req_date = date('m/d/Y', strtotime($this->req_date));

            $query = 'INSERT INTO ' . $this->table . '
            SET
                req_date = STR_TO_DATE(:req_date, "%m/%d/%Y"),
                req_problem = :req_problem,
                req_daily = :req_daily,
                req_license = :req_license,
                req_certificate = :req_certificate,
                project_id = :project_id,
                comp_id = :comp_id';

            $stmt = $this->conn->prepare($query);

            $this->req_date = htmlspecialchars(strip_tags($this->req_date));
            $this->req_problem = htmlspecialchars(strip_tags($this->req_problem));
            $this->req_daily = htmlspecialchars(strip_tags($this->req_daily));
            $this->req_license = htmlspecialchars(strip_tags($this->req_license));
            $this->req_certificate = htmlspecialchars(strip_tags($this->req_certificate));
            $this->project_id = htmlspecialchars(strip_tags($this->project_id));
            $this->comp_id = htmlspecialchars(strip_tags($this->comp_id));

            $stmt->bindParam(':req_date', $req_date);
            $stmt->bindParam(':req_problem', $this->req_problem);
            $stmt->bindParam(':req_daily', $this->req_daily);
            $stmt->bindParam(':req_license', $this->req_license);
            $stmt->bindParam(':req_certificate', $this->req_certificate);
            $stmt->bindParam(':project_id', $this->project_id);
            $stmt->bindParam(':comp_id', $this->comp_id);

            if ($stmt->execute()) {
                return json_encode("Created.");
            } else {
                return json_encode("Failed to create.");
            }
        }

        public function update() {
            $query = 'UPDATE ' . $this->table . '
            SET
                req_date = :req_date,
                req_problem = :req_problem,
                req_daily = :req_daily,
                req_license = :req_license,
                req_certificate = :req_certificate,
                user_detail_id = :user_detail_id
            WHERE
                req_id = :req_id';

            $stmt = $this->conn->prepare($query);

            $this->req_date = htmlspecialchars(strip_tags($this->req_date));
            $this->req_problem = htmlspecialchars(strip_tags($this->req_problem));
            $this->req_daily = htmlspecialchars(strip_tags($this->req_daily));
            $this->req_license = htmlspecialchars(strip_tags($this->req_license));
            $this->req_certificate = htmlspecialchars(strip_tags($this->req_certificate));
            $this->user_detail_id = htmlspecialchars(strip_tags($this->user_detail_id));

            $stmt->bindParam(':req_date', $this->req_date);
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

        public function deleteByProject() {

            $query = 'DELETE FROM ' . $this->table . ' WHERE project_id = :project_id';
            $stmt = $this->conn->prepare($query);

            $this->project_id = htmlspecialchars(strip_tags($this->project_id));

            $stmt->bindParam(':project_id', $this->project_id);

            if ($stmt->execute()) {
                return true;
            }

            return false;
        }
    }

?>