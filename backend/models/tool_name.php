<?php

    class ToolName {
        private $conn;
        private $table = "tb_tool_name";

        public $tool_name_id;
        public $tool_name;

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

            $query = 'SELECT * FROM ' . $this->table . ' WHERE tool_name_id = :tool_name_id';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':tool_name_id', $this->tool_name_id);
            $stmt->execute();

            return $stmt;
        }

        public function create() {
            $query = 'INSERT INTO ' . $this->table . '
            SET
                tool_name = :tool_name';

            $stmt = $this->conn->prepare($query);

            $this->tool_name = htmlspecialchars(strip_tags($this->tool_name));

            $stmt->bindParam(':tool_name', $this->tool_name);

            if ($stmt->execute()) {
                return json_encode("Created.");
            } else {
                return json_encode("Failed to create.");
            }
        }

        public function update() {
            $query = 'UPDATE ' . $this->table . '
            SET
                tool_name = :tool_name
            WHERE
                tool_name_id = :tool_name_id';

            $stmt = $this->conn->prepare($query);

            $this->tool_name = htmlspecialchars(strip_tags($this->tool_name));

            $stmt->bindParam(':tool_name', $this->tool_name);
            $stmt->bindParam(':tool_name_id', $this->tool_name_id);

            if ($stmt->execute()) {
                return json_encode("Updated.");
            } else {
                return json_encode("Failed to updated.");
            }
            
        }

        public function delete() {

            $query = 'DELETE FROM ' . $this->table . ' WHERE tool_name_id = :tool_name_id';
            $stmt = $this->conn->prepare($query);

            $this->tool_name_id = htmlspecialchars(strip_tags($this->tool_name_id));

            $stmt->bindParam(':tool_name_id', $this->tool_name_id);

            if ($stmt->execute()) {
                return true;
            }

            return false;
        }
    }

?>