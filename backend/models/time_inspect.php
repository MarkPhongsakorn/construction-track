<?php

    class TimeInsp {
        private $conn;
        private $table = "tb_time_inspect";

        public $time_inspect_id;
        public $inspect_start;
        public $inspect_end;

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

            $query = 'SELECT * FROM ' . $this->table . ' WHERE dr_id = :dr_id';

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':dr_id', $this->dr_id);
            $stmt->execute();

            return $stmt;
        }

        public function create() {
            $query = 'INSERT INTO ' . $this->table . '
            SET
                inspect_start = :inspect_start,
                inspect_end = :inspect_end,
                dr_id = :dr_id,
                project_id = :project_id';

            $stmt = $this->conn->prepare($query);

            $this->inspect_start = htmlspecialchars(strip_tags($this->inspect_start));
            $this->inspect_end = htmlspecialchars(strip_tags($this->inspect_end));
            $this->dr_id = htmlspecialchars(strip_tags($this->dr_id));
            $this->project_id = htmlspecialchars(strip_tags($this->project_id));

            $stmt->bindParam(':inspect_start', $this->inspect_start);
            $stmt->bindParam(':inspect_end', $this->inspect_end);
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
                inspect_start = :inspect_start,
                inspect_end = :inspect_end,
                dr_id = :dr_id,
                project_id = :project_id
            WHERE
                time_inspect_id = :time_inspect_id';

            $stmt = $this->conn->prepare($query);

            $this->inspect_start = htmlspecialchars(strip_tags($this->inspect_start));
            $this->inspect_end = htmlspecialchars(strip_tags($this->inspect_end));
            $this->dr_id = htmlspecialchars(strip_tags($this->dr_id));
            $this->project_id = htmlspecialchars(strip_tags($this->project_id));

            $stmt->bindParam(':inspect_start', $this->inspect_start);
            $stmt->bindParam(':inspect_end', $this->inspect_end);
            $stmt->bindParam(':dr_id', $this->dr_id);
            $stmt->bindParam(':project_id', $this->project_id);
            $stmt->bindParam(':time_inspect_id', $this->time_inspect_id);

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