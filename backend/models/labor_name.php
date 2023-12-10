<?php

    class LaborName {
        private $conn;
        private $table = "tb_labor_name";

        public $labor_name_id;
        public $labor_name;

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

            $query = 'SELECT * FROM ' . $this->table . ' WHERE labor_name_id = :labor_name_id';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':labor_name_id', $this->labor_name_id);
            $stmt->execute();

            return $stmt;
        }

        public function create() {
            $query = 'INSERT INTO ' . $this->table . '
            SET
                labor_name = :labor_name';

            $stmt = $this->conn->prepare($query);

            $this->labor_name = htmlspecialchars(strip_tags($this->labor_name));

            $stmt->bindParam(':labor_name', $this->labor_name);

            if ($stmt->execute()) {
                return json_encode("Created.");
            } else {
                return json_encode("Failed to create.");
            }
        }

        public function update() {
            $query = 'UPDATE ' . $this->table . '
            SET
                labor_name = :labor_name
            WHERE
                labor_name_id = :labor_name_id';

            $stmt = $this->conn->prepare($query);

            $this->labor_name = htmlspecialchars(strip_tags($this->labor_name));

            $stmt->bindParam(':labor_name', $this->labor_name);
            $stmt->bindParam(':labor_name_id', $this->labor_name_id);

            if ($stmt->execute()) {
                return json_encode("Updated.");
            } else {
                return json_encode("Failed to updated.");
            }
            
        }

        public function delete() {

            $query = 'DELETE FROM ' . $this->table . ' WHERE labor_name_id = :labor_name_id';
            $stmt = $this->conn->prepare($query);

            $this->labor_name_id = htmlspecialchars(strip_tags($this->labor_name_id));

            $stmt->bindParam(':labor_name_id', $this->labor_name_id);

            if ($stmt->execute()) {
                return true;
            }

            return false;
        }
    }

?>