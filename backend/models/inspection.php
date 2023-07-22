<?php

    class Inspection {
        private $conn;
        private $table = "tb_inspection";

        public $inspec_id;
        public $inspec_result_id;
        
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
                inspec_result_id = :inspec_result_id,
                dr_id = :dr_id';

            $stmt = $this->conn->prepare($query);

            $this->inspec_result_id = htmlspecialchars(strip_tags($this->inspec_result_id));
            $this->dr_id = htmlspecialchars(strip_tags($this->dr_id));

            $stmt->bindParam(':inspec_result_id', $this->inspec_result_id);
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
                inspec_result_id = :inspec_result_id, 
                dr_id = :dr_id
            WHERE
                inspec_id = :inspec_id';

            $stmt = $this->conn->prepare($query);

            $this->inspec_result_id = htmlspecialchars(strip_tags($this->inspec_result_id));
            $this->dr_id = htmlspecialchars(strip_tags($this->dr_id));

            $stmt->bindParam(':inspec_result_id', $this->inspec_result_id);
            $stmt->bindParam(':dr_id', $this->dr_id);
            $stmt->bindParam(':inspec_id', $this->inspec_id);

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