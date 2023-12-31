<?php

    class Labor {
        private $conn;
        private $table = "tb_labor";
        private $table2 = "tb_labor_name";

        public $labor_id;
        public $labor_name_id;
        public $labor_num;

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
            ' INNER JOIN ' . $this->table2 . ' ON ' . $this->table . '.labor_name_id = ' . $this->table2 . '.labor_name_id' .
            ' WHERE ' . $this->table . '.dr_id = :dr_id';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':dr_id', $this->dr_id);
            $stmt->execute();

            return $stmt;
        }

        public function readByNameId() {

            $query = 'SELECT * FROM ' . $this->table .
            ' INNER JOIN ' . $this->table2 . ' ON ' . $this->table . '.labor_name_id = ' . $this->table2 . '.labor_name_id' .
            ' WHERE ' . $this->table . '.dr_id = :dr_id AND ' . $this->table . '.labor_name_id = :labor_name_id';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':dr_id', $this->dr_id);
            $stmt->bindParam(':labor_name_id', $this->labor_name_id);
            $stmt->execute();

            return $stmt;
        }

        public function readNotEngineer() {
            $query = 'SELECT * FROM ' . $this->table .
                ' INNER JOIN ' . $this->table2 . ' ON ' . $this->table . '.labor_name_id = ' . $this->table2 . '.labor_name_id' .
                ' WHERE ' . $this->table . '.dr_id = :dr_id AND ' . $this->table . '.labor_name_id <> :labor_name_id';
            
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':dr_id', $this->dr_id);
            $stmt->bindParam(':labor_name_id', $this->labor_name_id);
            $stmt->execute();
        
            return $stmt;
        }

        public function create() {
            $query = 'INSERT INTO ' . $this->table . '
            SET
                labor_name_id = :labor_name_id,
                labor_num = :labor_num,
                dr_id = :dr_id,
                project_id = :project_id';

            $stmt = $this->conn->prepare($query);

            $this->labor_name_id = htmlspecialchars(strip_tags($this->labor_name_id));
            $this->labor_num = htmlspecialchars(strip_tags($this->labor_num));
            $this->dr_id = htmlspecialchars(strip_tags($this->dr_id));
            $this->project_id = htmlspecialchars(strip_tags($this->project_id));

            $stmt->bindParam(':labor_name_id', $this->labor_name_id);
            $stmt->bindParam(':labor_num', $this->labor_num);
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
                labor_name_id = :labor_name_id,
                labor_num = :labor_num,
                dr_id = :dr_id,
                project_id = :project_id
            WHERE
                labor_id = :labor_id';

            $stmt = $this->conn->prepare($query);

            $this->labor_name_id = htmlspecialchars(strip_tags($this->labor_name_id));
            $this->labor_num = htmlspecialchars(strip_tags($this->labor_num));
            $this->dr_id = htmlspecialchars(strip_tags($this->dr_id));
            $this->project_id = htmlspecialchars(strip_tags($this->project_id));

            $stmt->bindParam(':labor_name_id', $this->labor_name_id);
            $stmt->bindParam(':labor_num', $this->labor_num);
            $stmt->bindParam(':dr_id', $this->dr_id);
            $stmt->bindParam(':project_id', $this->project_id);
            $stmt->bindParam(':labor_id', $this->labor_id);

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