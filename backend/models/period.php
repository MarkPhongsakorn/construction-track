<?php

    class Period {
        private $conn;
        private $table = "tb_period";

        public $period_id;
        public $period_name;

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

            $query = 'SELECT * FROM ' . $this->table . ' WHERE period_id = :period_id';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':period_id', $this->period_id);
            $stmt->execute();

            return $stmt;
        }

        public function create() {
            $query = 'INSERT INTO ' . $this->table . '
            SET
                period_name = :period_name';

            $stmt = $this->conn->prepare($query);

            $this->period_name = htmlspecialchars(strip_tags($this->period_name));

            $stmt->bindParam(':period_name', $this->period_name);

            if ($stmt->execute()) {
                return json_encode("Created.");
            } else {
                return json_encode("Failed to create.");
            }
        }

        public function update() {
            $query = 'UPDATE ' . $this->table . '
            SET
                period_name = :period_name
            WHERE
                period_id = :period_id';

            $stmt = $this->conn->prepare($query);

            $this->period_name = htmlspecialchars(strip_tags($this->period_name));

            $stmt->bindParam(':period_name', $this->period_name);
            $stmt->bindParam(':period_id', $this->period_id);

            if ($stmt->execute()) {
                return json_encode("Updated.");
            } else {
                return json_encode("Failed to updated.");
            }
            
        }

        public function delete() {

            $query = 'DELETE FROM ' . $this->table . ' WHERE period_id = :period_id';
            $stmt = $this->conn->prepare($query);

            $this->period_id = htmlspecialchars(strip_tags($this->period_id));

            $stmt->bindParam(':period_id', $this->period_id);

            if ($stmt->execute()) {
                return true;
            }

            return false;
        }
    }

?>