<?php

    class Inspection {
        private $conn;
        private $table = "tb_inspection";

        public $inspec_id;
        public $inspec_result;
        
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

            $query = 'SELECT * FROM ' . $this->table . ' WHERE inspec_id = :inspec_id';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':inspec_id', $this->inspec_id);
            $stmt->execute();

            return $stmt;
        }

        public function create() {
            $query = 'INSERT INTO ' . $this->table . '
            SET
                inspec_result = :inspec_result,
                dr_id = :dr_id';

            $stmt = $this->conn->prepare($query);

            $this->inspec_result = htmlspecialchars(strip_tags($this->inspec_result));
            $this->dr_id = htmlspecialchars(strip_tags($this->dr_id));

            $stmt->bindParam(':inspec_result', $this->inspec_result);
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
                inspec_result = :inspec_result, 
                dr_id = :dr_id
            WHERE
                inspec_id = :inspec_id';

            $stmt = $this->conn->prepare($query);

            $this->inspec_result = htmlspecialchars(strip_tags($this->inspec_result));
            $this->dr_id = htmlspecialchars(strip_tags($this->dr_id));

            $stmt->bindParam(':inspec_result', $this->inspec_result);
            $stmt->bindParam(':dr_id', $this->dr_id);
            $stmt->bindParam(':inspec_id', $this->inspec_id);

            if ($stmt->execute()) {
                return json_encode("Updated.");
            } else {
                return json_encode("Failed to updated.");
            }
            
        }

        public function delete() {

            $query = 'DELETE FROM ' . $this->table . ' WHERE inspec_id = :inspec_id';
            $stmt = $this->conn->prepare($query);

            $this->inspec_id = htmlspecialchars(strip_tags($this->inspec_id));

            $stmt->bindParam(':inspec_id', $this->inspec_id);

            if ($stmt->execute()) {
                return true;
            }

            return false;
        }
    }

?>