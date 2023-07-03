<?php

    class Prefix {

        private $conn;
        private $table = "tb_prefix";

        public $prefix_id;
        public $prefix_tname;

        public function __construct($db) {
            $this->conn = $db;
        }

        // GET Data ทุกตัว
        public function read() {

            $query = 'SELECT * FROM ' . $this->table . '';
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            
            return $stmt;
        }

        // GET Data User เพียง 1 ตัว
        public function read_one($prefix_id) {

            $query = 'SELECT * FROM ' . $this->table . ' WHERE prefix_id = :prefix_id';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':prefix_id',$this->prefix_id);
            $stmt->execute();

            return $stmt;
        }

        public function create() {
            $query = 'INSERT INTO ' . $this->table . '
            SET
                prefix_tname = :prefix_tname';

            $stmt = $this->conn->prepare($query);

            $this->prefix_tname = htmlspecialchars(strip_tags($this->prefix_tname));

            $stmt->bindParam(':prefix_tname', $this->prefix_tname);

            if ($stmt->execute()) {
                return json_encode("Created.");
            } else {
                return json_encode("Failed to create.");
            }
        }

        // UPDATE Data
        public function update() {
            $query = 'UPDATE ' . $this->table . '
            SET
                prefix_tname = :prefix_tname
            WHERE
                prefix_id = :prefix_id';

            $stmt = $this->conn->prepare($query);

            $this->prefix_tname = htmlspecialchars(strip_tags($this->prefix_tname));

            $stmt->bindParam(':prefix_tname', $this->prefix_tname);
            $stmt->bindParam(':prefix_id', $this->prefix_id);

            if ($stmt->execute()) {
                return json_encode("Updated.");
            } else {
                return json_encode("Failed to updated.");
            }
            
        }

        // DELETE data
        public function delete() {

            $query = 'DELETE FROM ' . $this->table . ' WHERE prefix_id = :prefix_id';
            $stmt = $this->conn->prepare($query);

            $this->prefix_id = htmlspecialchars(strip_tags($this->prefix_id));

            $stmt->bindParam(':prefix_id', $this->prefix_id);

            if ($stmt->execute()) {
                return true;
            }

            return false;
        }

    }

?>