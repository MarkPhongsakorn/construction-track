<?php

    class Tool {
        private $conn;
        private $table = "tb_tool";
        private $table2 = "tb_tool_name";

        public $tool_id;
        public $tool_name_id;
        public $tool_num;

        public $dr_id;
        public $project_id;

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

            $query = 'SELECT * FROM ' . $this->table .
            ' INNER JOIN ' . $this->table2 . ' ON ' . $this->table . '.tool_name_id = ' . $this->table2 . '.tool_name_id
            WHERE dr_id = :dr_id';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':dr_id', $this->dr_id);
            $stmt->execute();

            return $stmt;
        }

        public function readByNameId() {

            $query = 'SELECT * FROM ' . $this->table .
            ' INNER JOIN ' . $this->table2 . ' ON ' . $this->table . '.tool_name_id = ' . $this->table2 . '.tool_name_id
            WHERE '. $this->table . '.tool_name_id = :tool_name_id' ;
            $stmt = $this->conn->prepare($query);
            // $stmt->bindParam(':dr_id', $this->dr_id);
            $stmt->bindParam(':tool_name_id', $this->tool_name_id);
            $stmt->execute();

            return $stmt;
        }

        public function create() {
            $query = 'INSERT INTO ' . $this->table . '
            SET
                tool_name_id = :tool_name_id,
                tool_num = :tool_num,
                dr_id = :dr_id,
                project_id = :project_id';

            $stmt = $this->conn->prepare($query);

            $this->tool_name_id = htmlspecialchars(strip_tags($this->tool_name_id));
            $this->tool_num = htmlspecialchars(strip_tags($this->tool_num));
            $this->dr_id = htmlspecialchars(strip_tags($this->dr_id));
            $this->project_id = htmlspecialchars(strip_tags($this->project_id));

            $stmt->bindParam(':tool_name_id', $this->tool_name_id);
            $stmt->bindParam(':tool_num', $this->tool_num);
            $stmt->bindParam(':dr_id', $this->dr_id);
            $stmt->bindParam(':project_id', $this->project_id);

            if ($stmt->execute()) {
                return json_encode("Created.");
            } else {
                return json_encode("Failed to create.");
            }
        }

        public function update() {
            $query = 'UPDATE ' . $this->table . '
            SET
                tool_name_id = :tool_name_id,
                tool_num = :tool_num,
                dr_id = :dr_id,
                project_id = :project_id
            WHERE
                tool_id = :tool_id';

            $stmt = $this->conn->prepare($query);

            $this->tool_name_id = htmlspecialchars(strip_tags($this->tool_name_id));
            $this->tool_num = htmlspecialchars(strip_tags($this->tool_num));
            $this->dr_id = htmlspecialchars(strip_tags($this->dr_id));
            $this->project_id = htmlspecialchars(strip_tags($this->project_id));

            $stmt->bindParam(':tool_name_id', $this->tool_name_id);
            $stmt->bindParam(':tool_num', $this->tool_num);
            $stmt->bindParam(':dr_id', $this->dr_id);
            $stmt->bindParam(':project_id', $this->project_id);
            $stmt->bindParam(':tool_id', $this->tool_id);

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

        public function deleteByProject() {

            $query = 'DELETE FROM ' . $this->table . ' WHERE project_id = :project_id';
            $stmt = $this->conn->prepare($query);

            $this->project_id = htmlspecialchars(strip_tags($this->project_id));

            $stmt->bindParam(':project_id', $this->project_id);

            if ($stmt->execute()) {
                return true;
            }

            return false;
        }
    }

?>