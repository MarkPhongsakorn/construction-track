<?php

    class WorkTime {
        private $conn;
        private $table = "tb_working_time";

        public $work_time_id;
        public $work_start;
        public $work_end;

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
                work_start = :work_start,
                work_end = :work_end,
                dr_id = :dr_id,
                project_id = :project_id';

            $stmt = $this->conn->prepare($query);

            $this->work_start = htmlspecialchars(strip_tags($this->work_start));
            $this->work_end = htmlspecialchars(strip_tags($this->work_end));
            $this->dr_id = htmlspecialchars(strip_tags($this->dr_id));
            $this->project_id = htmlspecialchars(strip_tags($this->project_id));

            $stmt->bindParam(':work_start', $this->work_start);
            $stmt->bindParam(':work_end', $this->work_end);
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
                work_start = :work_start,
                work_end = :work_end,
                dr_id = :dr_id,
                project_id = :project_id
            WHERE
                work_time_id = :work_time_id';

            $stmt = $this->conn->prepare($query);

            $this->work_start = htmlspecialchars(strip_tags($this->work_start));
            $this->work_end = htmlspecialchars(strip_tags($this->work_end));
            $this->dr_id = htmlspecialchars(strip_tags($this->dr_id));
            $this->project_id = htmlspecialchars(strip_tags($this->project_id));

            $stmt->bindParam(':work_start', $this->work_start);
            $stmt->bindParam(':work_end', $this->work_end);
            $stmt->bindParam(':dr_id', $this->dr_id);
            $stmt->bindParam(':project_id', $this->project_id);
            $stmt->bindParam(':work_time_id', $this->work_time_id);

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