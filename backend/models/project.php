<?php

    class Project {

        private $conn;
        private $table = "tb_project";
        private $table2 = "tb_user_detail";
        private $table3 = "tb_company";
        

        public $project_id;
        public $project_name;
        public $project_start;
        public $project_end;

        public $user_detail_id;

        public function __construct($db) {
            $this->conn = $db;
        }

        public function read() {

            $query = 'SELECT * FROM ' . $this->table . 
            ' LEFT JOIN ' . $this->table2 . ' ON ' 
            . $this->table . '.user_detail_id = '  . $this->table2 . '.user_detail_id
            LEFT JOIN ' .$this->table3 . ' ON ' . $this->table . '.comp_id = ' . $this->table3 . '.comp_id';

            $stmt = $this->conn->prepare($query);
            $stmt->execute();

            return $stmt;
        }

        public function read_one() {

            $query = 'SELECT * FROM ' . $this->table . ' 
                        LEFT JOIN ' . $this->table2 . ' 
                        ON ' . $this->table . '.user_detail_id = ' . $this->table2 . '.user_detail_id 
                        LEFT JOIN ' .$this->table3 . '
                        ON ' . $this->table . '.comp_id = ' . $this->table3 . '.comp_id
                        WHERE ' . $this->table . '.project_id = :project_id';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':project_id', $this->project_id);
            $stmt->execute();

            return $stmt;
        }

        public function create() {

            $project_start = date('m/d/Y', strtotime($this->project_start));
            $project_end = date('m/d/Y', strtotime($this->project_end));

            $query = 'INSERT INTO ' . $this->table . '
            SET
                project_name = :project_name,
                project_start = STR_TO_DATE(:project_start, "%m/%d/%Y"),
                project_end = STR_TO_DATE(:project_end, "%m/%d/%Y"),
                user_detail_id = :user_detail_id,
                comp_id = :comp_id';

            $stmt = $this->conn->prepare($query);

            $this->project_name = htmlspecialchars(strip_tags($this->project_name));
            $this->project_start = htmlspecialchars(strip_tags($this->project_start));
            $this->project_end = htmlspecialchars(strip_tags($this->project_end));
            $this->user_detail_id = htmlspecialchars(strip_tags($this->user_detail_id));
            $this->comp_id = htmlspecialchars(strip_tags($this->comp_id));

            $stmt->bindParam(':project_name', $this->project_name);
            $stmt->bindParam(':project_start', $project_start);
            $stmt->bindParam(':project_end', $project_end);
            $stmt->bindParam(':user_detail_id', $this->user_detail_id);
            $stmt->bindParam(':comp_id', $this->comp_id);

            if ($stmt->execute()) {
                return true;
            } else {
                return false;
            }
        }

        public function update() {

            $query = 'UPDATE ' . $this->table . '
            SET
                project_name = :project_name,
                project_start = :project_start,
                project_end = :project_end,
                user_detail_id = :user_detail_id
            WHERE
                project_id = :project_id';

            $stmt = $this->conn->prepare($query);

            $this->project_name = htmlspecialchars(strip_tags($this->project_name));
            $this->project_start = htmlspecialchars(strip_tags($this->project_start));
            $this->project_end = htmlspecialchars(strip_tags($this->project_end));
            $this->user_detail_id = htmlspecialchars(strip_tags($this->user_detail_id));

            $stmt->bindParam(':project_name', $this->project_name);
            $stmt->bindParam(':project_start', $this->project_start);
            $stmt->bindParam(':project_end', $this->project_end);
            $stmt->bindParam(':user_detail_id', $this->user_detail_id);
            $stmt->bindParam(':project_id', $this->project_id);

            if ($stmt->execute()) {
                return true;
            } else {
                return false;
            }
        }

        public function delete() {

            $query = 'DELETE FROM ' . $this->table . ' WHERE project_id = :project_id';
            $stmt = $this->conn->prepare($query);

            // $this->project_id = htmlspecialchars(strip_tags($this->project_id));

            $stmt->bindParam(':project_id', $this->project_id);

            if ($stmt->execute()) {
                return true;
            } else {
                return false;
            }

        }

    }

?>