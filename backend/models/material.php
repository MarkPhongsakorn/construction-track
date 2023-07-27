<?php

    class Material {
        private $conn;
        private $table = "tb_material";
        private $table2 = "tb_unit";

        public $mat_id;
        public $mat_name;
        public $mat_num;
        public $unit_id;

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
            ' INNER JOIN ' . $this->table2 . ' ON ' . $this->table . '.unit_id = ' . $this->table2 . '.unit_id
            WHERE dr_id = :dr_id';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':dr_id', $this->dr_id);
            $stmt->execute();

            return $stmt;
        }

        public function create() {
            $query = 'INSERT INTO ' . $this->table . '
            SET
                mat_name = :mat_name,
                mat_num = :mat_num,
                unit_id = :unit_id,
                dr_id = :dr_id,
                project_id = :project_id';

            $stmt = $this->conn->prepare($query);

            $this->mat_name = htmlspecialchars(strip_tags($this->mat_name));
            $this->mat_num = htmlspecialchars(strip_tags($this->mat_num));
            $this->unit_id = htmlspecialchars(strip_tags($this->unit_id));
            $this->dr_id = htmlspecialchars(strip_tags($this->dr_id));
            $this->project_id = htmlspecialchars(strip_tags($this->project_id));

            $stmt->bindParam(':mat_name', $this->mat_name);
            $stmt->bindParam(':mat_num', $this->mat_num);
            $stmt->bindParam(':unit_id', $this->unit_id);
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
                mat_name = :mat_name,
                mat_num = :mat_num,
                unit_id = :unit_id,
                dr_id = :dr_id
                project_id = :project_id
            WHERE
                mat_id = :mat_id';

            $stmt = $this->conn->prepare($query);

            $this->mat_name = htmlspecialchars(strip_tags($this->mat_name));
            $this->mat_num = htmlspecialchars(strip_tags($this->mat_num));
            $this->unit_id = htmlspecialchars(strip_tags($this->unit_id));
            $this->dr_id = htmlspecialchars(strip_tags($this->dr_id));
            $this->project_id = htmlspecialchars(strip_tags($this->project_id));

            $stmt->bindParam(':mat_name', $this->mat_name);
            $stmt->bindParam(':mat_num', $this->mat_num);
            $stmt->bindParam(':unit_id', $this->unit_id);
            $stmt->bindParam(':dr_id', $this->dr_id);
            $stmt->bindParam(':project_id', $this->project_id);
            $stmt->bindParam(':mat_id', $this->mat_id);

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