<?php

    class Psta {
        private $conn;
        private $table = "tb_project_status";

        public $psta_id;
        public $psta_name;

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

            $query = 'SELECT * FROM ' . $this->table . ' WHERE psta_id = :psta_id';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':psta_id', $this->psta_id);
            $stmt->execute();

            return $stmt;
        }

        public function create() {
            $query = 'INSERT INTO ' . $this->table . '
            SET
                psta_name = :psta_name';

            $stmt = $this->conn->prepare($query);

            $this->psta_name = htmlspecialchars(strip_tags($this->psta_name));

            $stmt->bindParam(':psta_name', $this->psta_name);

            if ($stmt->execute()) {
                return json_encode("Created.");
            } else {
                return json_encode("Failed to create.");
            }
        }

        public function update() {
            $query = 'UPDATE ' . $this->table . '
            SET
                psta_name = :psta_name
            WHERE
                psta_id = :psta_id';

            $stmt = $this->conn->prepare($query);

            $this->psta_name = htmlspecialchars(strip_tags($this->psta_name));

            $stmt->bindParam(':psta_name', $this->psta_name);
            $stmt->bindParam(':psta_id', $this->psta_id);

            if ($stmt->execute()) {
                return json_encode("Updated.");
            } else {
                return json_encode("Failed to updated.");
            }
            
        }

        public function delete() {

            $query = 'DELETE FROM ' . $this->table . ' WHERE psta_id = :psta_id';
            $stmt = $this->conn->prepare($query);

            $this->psta_id = htmlspecialchars(strip_tags($this->psta_id));

            $stmt->bindParam(':psta_id', $this->psta_id);

            if ($stmt->execute()) {
                return true;
            }

            return false;
        }

    }

?>