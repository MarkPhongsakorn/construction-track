<?php

    class MatName {
        private $conn;
        private $table = "tb_mat_name";

        public $mat_name_id;
        public $mat_name;
        public $mat_unit;

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

            $query = 'SELECT * FROM ' . $this->table . ' WHERE mat_name_id = :mat_name_id';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':mat_name_id', $this->mat_name_id);
            $stmt->execute();

            return $stmt;
        }

        public function create() {
            $query = 'INSERT INTO ' . $this->table . '
            SET
                mat_name = :mat_name,
                mat_unit = :mat_unit';

            $stmt = $this->conn->prepare($query);

            $this->mat_name = htmlspecialchars(strip_tags($this->mat_name));
            $this->mat_unit = htmlspecialchars(strip_tags($this->mat_unit));

            $stmt->bindParam(':mat_name', $this->mat_name);
            $stmt->bindParam(':mat_unit', $this->mat_unit);

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
                mat_unit = :mat_unit
            WHERE
                mat_name_id = :mat_name_id';

            $stmt = $this->conn->prepare($query);

            $this->mat_name = htmlspecialchars(strip_tags($this->mat_name));
            $this->mat_unit = htmlspecialchars(strip_tags($this->mat_unit));

            $stmt->bindParam(':mat_name', $this->mat_name);
            $stmt->bindParam(':mat_unit', $this->mat_unit);
            $stmt->bindParam(':mat_name_id', $this->mat_name_id);

            if ($stmt->execute()) {
                return json_encode("Updated.");
            } else {
                return json_encode("Failed to updated.");
            }
            
        }

        public function delete() {

            $query = 'DELETE FROM ' . $this->table . ' WHERE mat_name_id = :mat_name_id';
            $stmt = $this->conn->prepare($query);

            $this->mat_name_id = htmlspecialchars(strip_tags($this->mat_name_id));

            $stmt->bindParam(':mat_name_id', $this->mat_name_id);

            if ($stmt->execute()) {
                return true;
            }

            return false;
        }
    }

?>