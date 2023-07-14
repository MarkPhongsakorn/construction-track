<?php

    class Company {

        private $conn;
        private $table = "tb_company";
        
        public $comp_id;
        public $comp_name; 
        public $comp_email; 
        public $comp_address; 

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

            $query = 'SELECT * FROM ' . $this->table . ' WHERE comp_id = :comp_id';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':comp_id', $this->comp_id);
            $stmt->execute();

            return $stmt;
        }

        public function create() {
            $query = 'INSERT INTO ' . $this->table . '
            SET
                comp_name = :comp_name,
                comp_email = :comp_email,
                comp_address = :comp_address';

            $stmt = $this->conn->prepare($query);

            $this->comp_name = htmlspecialchars(strip_tags($this->comp_name));
            $this->comp_email = htmlspecialchars(strip_tags($this->comp_email));
            $this->comp_address = htmlspecialchars(strip_tags($this->comp_address));

            $stmt->bindParam(':comp_name', $this->comp_name);
            $stmt->bindParam(':comp_email', $this->comp_email);
            $stmt->bindParam(':comp_address', $this->comp_address);

            if ($stmt->execute()) {
                $this->comp_id = $this->conn->lastInsertId();
                return true;
            } else {
                return false;
            }
        }

        public function update() {
            $query = 'UPDATE ' . $this->table . '
            SET
                comp_name = :comp_name,
                comp_email = :comp_email,
                comp_address = :comp_address
            WHERE
                comp_id = :comp_id';

            $stmt = $this->conn->prepare($query);

            $this->comp_id = htmlspecialchars(strip_tags($this->comp_id));
            $this->comp_name = htmlspecialchars(strip_tags($this->comp_name));
            $this->comp_email = htmlspecialchars(strip_tags($this->comp_email));
            $this->comp_address = htmlspecialchars(strip_tags($this->comp_address));

            $stmt->bindParam(':comp_name', $this->comp_name);
            $stmt->bindParam(':comp_email', $this->comp_email);
            $stmt->bindParam(':comp_address', $this->comp_address);
            $stmt->bindParam(':comp_id', $this->comp_id);

            if ($stmt->execute()) {
                return true;
            }

            return false;
    
        }

        public function delete() {

            $query = 'DELETE FROM ' . $this->table . ' WHERE comp_id = :comp_id';
            $stmt = $this->conn->prepare($query);

            $stmt->bindParam(':comp_id', $this->comp_id);

            if ($stmt->execute()) {
                return true;
            }

            return false;
        }
    }

?>