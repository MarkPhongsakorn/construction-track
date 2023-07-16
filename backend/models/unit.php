<?php

    class Unit {
        private $conn;
        private $table = "tb_unit";

        public $unit_id;
        public $unit_name;

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

            $query = 'SELECT * FROM ' . $this->table . ' WHERE unit_id = :unit_id';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':unit_id', $this->unit_id);
            $stmt->execute();

            return $stmt;
        }

        public function create() {
            $query = 'INSERT INTO ' . $this->table . '
            SET
                unit_name = :unit_name';

            $stmt = $this->conn->prepare($query);

            $this->unit_name = htmlspecialchars(strip_tags($this->unit_name));

            $stmt->bindParam(':unit_name', $this->unit_name);

            if ($stmt->execute()) {
                return json_encode("Created.");
            } else {
                return json_encode("Failed to create.");
            }
        }

        public function update() {
            $query = 'UPDATE ' . $this->table . '
            SET
                unit_name = :unit_name
            WHERE
                unit_id = :unit_id';

            $stmt = $this->conn->prepare($query);

            $this->unit_name = htmlspecialchars(strip_tags($this->unit_name));

            $stmt->bindParam(':unit_name', $this->unit_name);
            $stmt->bindParam(':unit_id', $this->unit_id);

            if ($stmt->execute()) {
                return json_encode("Updated.");
            } else {
                return json_encode("Failed to updated.");
            }
            
        }

        public function delete() {

            $query = 'DELETE FROM ' . $this->table . ' WHERE unit_id = :unit_id';
            $stmt = $this->conn->prepare($query);

            $this->unit_id = htmlspecialchars(strip_tags($this->unit_id));

            $stmt->bindParam(':unit_id', $this->unit_id);

            if ($stmt->execute()) {
                return true;
            }

            return false;
        }

    }

?>