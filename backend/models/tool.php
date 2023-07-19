<?php

    class Tool {
        private $conn;
        private $table = "tb_tool";

        public $tool_id;
        public $tool_name;
        public $tool_num;

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

            $query = 'SELECT * FROM ' . $this->table . ' WHERE tool_id = :tool_id';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':tool_id', $this->tool_id);
            $stmt->execute();

            return $stmt;
        }

        public function create() {
            $query = 'INSERT INTO ' . $this->table . '
            SET
                tool_name = :tool_name,
                tool_num = :tool_num,
                dr_id = :dr_id';

            $stmt = $this->conn->prepare($query);

            $this->tool_name = htmlspecialchars(strip_tags($this->tool_name));
            $this->tool_num = htmlspecialchars(strip_tags($this->tool_num));
            $this->dr_id = htmlspecialchars(strip_tags($this->dr_id));

            $stmt->bindParam(':tool_name', $this->tool_name);
            $stmt->bindParam(':tool_num', $this->tool_num);
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
                tool_name = :tool_name,
                tool_num = :tool_num,
                dr_id = :dr_id
            WHERE
                tool_id = :tool_id';

            $stmt = $this->conn->prepare($query);

            $this->tool_name = htmlspecialchars(strip_tags($this->tool_name));
            $this->tool_num = htmlspecialchars(strip_tags($this->tool_num));
            $this->dr_id = htmlspecialchars(strip_tags($this->dr_id));

            $stmt->bindParam(':tool_name', $this->tool_name);
            $stmt->bindParam(':tool_num', $this->tool_num);
            $stmt->bindParam(':dr_id', $this->dr_id);
            $stmt->bindParam(':tool_id', $this->tool_id);

            if ($stmt->execute()) {
                return json_encode("Updated.");
            } else {
                return json_encode("Failed to updated.");
            }
            
        }

        public function delete() {

            $query = 'DELETE FROM ' . $this->table . ' WHERE tool_id = :tool_id';
            $stmt = $this->conn->prepare($query);

            $this->tool_id = htmlspecialchars(strip_tags($this->tool_id));

            $stmt->bindParam(':tool_id', $this->tool_id);

            if ($stmt->execute()) {
                return true;
            }

            return false;
        }
    }

?>