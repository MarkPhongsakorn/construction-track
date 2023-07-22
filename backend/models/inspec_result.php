<?php

    class Result {
        private $conn;
        private $table = "tb_inspec_result";

        public $inspec_result_id;
        public $inspec_result;
        

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

            $query = 'SELECT * FROM ' . $this->table . ' WHERE inspec_result_id = :inspec_result_id';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':inspec_result_id', $this->inspec_result_id);
            $stmt->execute();

            return $stmt;
        }

        public function create() {
            $query = 'INSERT INTO ' . $this->table . '
            SET
                inspec_result = :inspec_result';

            $stmt = $this->conn->prepare($query);

            $this->inspec_result = htmlspecialchars(strip_tags($this->inspec_result));

            $stmt->bindParam(':inspec_result', $this->inspec_result);

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
            WHERE
                inspec_result_id = :inspec_result_id';

            $stmt = $this->conn->prepare($query);

            $this->inspec_result = htmlspecialchars(strip_tags($this->inspec_result));

            $stmt->bindParam(':inspec_result', $this->inspec_result);
            $stmt->bindParam(':inspec_result_id', $this->inspec_result_id);

            if ($stmt->execute()) {
                return json_encode("Updated.");
            } else {
                return json_encode("Failed to updated.");
            }
            
        }

        public function delete() {

            $query = 'DELETE FROM ' . $this->table . ' WHERE inspec_result_id = :inspec_result_id';
            $stmt = $this->conn->prepare($query);

            $this->inspec_result_id = htmlspecialchars(strip_tags($this->inspec_result_id));

            $stmt->bindParam(':inspec_result_id', $this->inspec_result_id);

            if ($stmt->execute()) {
                return true;
            }

            return false;
        }
    }

?>