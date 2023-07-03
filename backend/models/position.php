<?php

    class Position {

        private $conn;
        private $table = "tb_position";

        public $pos_id;
        public $pos_name;

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
        public function read_one() {

            $query = 'SELECT * FROM ' . $this->table . ' WHERE pos_id = :pos_id';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':pos_id',$this->pos_id);
            $stmt->execute();

            return $stmt;
        }

        public function create() {
            $query = 'INSERT INTO ' . $this->table . '
            SET
                pos_name = :pos_name';

            $stmt = $this->conn->prepare($query);

            $this->pos_name = htmlspecialchars(strip_tags($this->pos_name));

            $stmt->bindParam(':pos_name', $this->pos_name);

            if ($stmt->execute()) {
                $this->pos_id = $this->conn->lastInsertId();
                return true;
            } else {
                return false;
            }
        }

        // UPDATE Data
        public function update() {
            $query = 'UPDATE ' . $this->table . '
            SET
                pos_name = :pos_name
            WHERE
                pos_id = :pos_id';

            $stmt = $this->conn->prepare($query);

            $this->pos_id = htmlspecialchars(strip_tags($this->pos_id));
            $this->pos_name = htmlspecialchars(strip_tags($this->pos_name));

            $stmt->bindParam(':pos_name', $this->pos_name);
            $stmt->bindParam(':pos_id', $this->pos_id);

            if ($stmt->execute()) {
                return true;
            }

            return false;
    
        }

        // DELETE data
        public function delete() {

            $query = 'DELETE FROM ' . $this->table . ' WHERE pos_id = :pos_id';
            $stmt = $this->conn->prepare($query);

            $this->pos_id = htmlspecialchars(strip_tags($this->pos_id));

            $stmt->bindParam(':pos_id', $this->pos_id);

            if ($stmt->execute()) {
                return true;
            }

            return false;
        }

    }

?>