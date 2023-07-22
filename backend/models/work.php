<?php

    class Work {
        private $conn;
        private $table = "tb_work";

        public $work_id;
        public $work_num;
        public $work_detail;

        public $dr_id;

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

            $query = 'SELECT * FROM ' . $this->table . ' WHERE work_id = :work_id';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':work_id', $this->work_id);
            $stmt->execute();

            return $stmt;
        }

        public function create() {
            $query = 'INSERT INTO ' . $this->table . '
            SET
                work_num = :work_num,
                work_detail = :work_detail,
                dr_id = :dr_id';

            $stmt = $this->conn->prepare($query);

            $this->work_num = htmlspecialchars(strip_tags($this->work_num));
            $this->work_detail = htmlspecialchars(strip_tags($this->work_detail));
            $this->dr_id = htmlspecialchars(strip_tags($this->dr_id));

            $stmt->bindParam(':work_num', $this->work_num);
            $stmt->bindParam(':work_detail', $this->work_detail);
            $stmt->bindParam(':dr_id', $this->dr_id);

            if ($stmt->execute()) {
                return json_encode("Created.");
            } else {
                return json_encode("Failed to create.");
            }
        }

        public function update() {
            $query = 'UPDATE ' . $this->table . '
            SET
                work_num = :work_num,
                work_detail = :work_detail,
                dr_id = :dr_id
            WHERE
                work_id = :work_id';

            $stmt = $this->conn->prepare($query);

            $this->work_num = htmlspecialchars(strip_tags($this->work_num));
            $this->work_detail = htmlspecialchars(strip_tags($this->work_detail));
            $this->dr_id = htmlspecialchars(strip_tags($this->dr_id));

            $stmt->bindParam(':work_num', $this->work_num);
            $stmt->bindParam(':work_detail', $this->work_detail);
            $stmt->bindParam(':dr_id', $this->dr_id);
            $stmt->bindParam(':work_id', $this->work_id);

            if ($stmt->execute()) {
                return json_encode("Updated.");
            } else {
                return json_encode("Failed to updated.");
            }
            
        }

        public function delete() {

            $query = 'DELETE FROM ' . $this->table . ' WHERE dr_id = :dr_id';
            $stmt = $this->conn->prepare($query);

            $this->dr_id = htmlspecialchars(strip_tags($this->dr_id));

            $stmt->bindParam(':dr_id', $this->dr_id);

            if ($stmt->execute()) {
                return true;
            }

            return false;
        }
    }

?>