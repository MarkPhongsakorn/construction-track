<?php

    class Material {
        private $conn;
        private $table = "tb_material";

        public $mat_id;
        public $mat_name;
        public $mat_num;

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

            $query = 'SELECT * FROM ' . $this->table . ' WHERE mat_id = :mat_id';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':mat_id', $this->mat_id);
            $stmt->execute();

            return $stmt;
        }

        public function create() {
            $query = 'INSERT INTO ' . $this->table . '
            SET
                mat_name = :mat_name,
                mat_num = :mat_num,
                dr_id = :dr_id';

            $stmt = $this->conn->prepare($query);

            $this->mat_name = htmlspecialchars(strip_tags($this->mat_name));
            $this->mat_num = htmlspecialchars(strip_tags($this->mat_num));
            $this->dr_id = htmlspecialchars(strip_tags($this->dr_id));

            $stmt->bindParam(':mat_name', $this->mat_name);
            $stmt->bindParam(':mat_num', $this->mat_num);
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
                mat_name = :mat_name,
                mat_num = :mat_num,
                dr_id = :dr_id
            WHERE
                mat_id = :mat_id';

            $stmt = $this->conn->prepare($query);

            $this->mat_name = htmlspecialchars(strip_tags($this->mat_name));
            $this->mat_num = htmlspecialchars(strip_tags($this->mat_num));
            $this->dr_id = htmlspecialchars(strip_tags($this->dr_id));

            $stmt->bindParam(':mat_name', $this->mat_name);
            $stmt->bindParam(':mat_num', $this->mat_num);
            $stmt->bindParam(':dr_id', $this->dr_id);
            $stmt->bindParam(':mat_id', $this->mat_id);

            if ($stmt->execute()) {
                return json_encode("Updated.");
            } else {
                return json_encode("Failed to updated.");
            }
            
        }

        public function delete() {

            $query = 'DELETE FROM ' . $this->table . ' WHERE mat_id = :mat_id';
            $stmt = $this->conn->prepare($query);

            $this->mat_id = htmlspecialchars(strip_tags($this->mat_id));

            $stmt->bindParam(':mat_id', $this->mat_id);

            if ($stmt->execute()) {
                return true;
            }

            return false;
        }
    }

?>