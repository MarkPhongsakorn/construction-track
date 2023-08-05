<?php

    class Report {
        private $conn;
        private $table = "tb_daily_report";
        private $table2 = "tb_user_detail";
        private $table3 = "tb_project";
        
        public $dr_id;
        public $dr_time;

        public $project_id;
        public $user_detail_id;

        public function __construct($db) {
            $this->conn = $db;
        }

        public function read() {

            $query = 'SELECT * FROM ' . $this->table .
            ' LEFT JOIN ' . $this->table3 . ' ON ' . $this->table . '.project_id = ' . $this->table3 . '.project_id'
            . ' LEFT JOIN ' . $this->table2 . ' ON ' . $this->table . '.user_detail_id = '  . $this->table2 . '.user_detail_id';

            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            
            return $stmt;
        }

        public function read_one() {
            $query = 'SELECT * FROM ' . $this->table .
            ' LEFT JOIN ' . $this->table3 . ' ON ' . $this->table . '.project_id = ' . $this->table3 . '.project_id'
            . ' LEFT JOIN ' . $this->table2 . ' ON ' . $this->table . '.user_detail_id = '  . $this->table2 . '.user_detail_id
            WHERE ' . $this->table . '.dr_id = :dr_id';

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':dr_id',$this->dr_id);
            $stmt->execute();

            return $stmt;

        }

        public function readByProjectId() {

            $query = 'SELECT * FROM ' . $this->table .
            ' LEFT JOIN ' . $this->table3 . ' ON ' . $this->table . '.project_id = ' . $this->table3 . '.project_id'
            . ' LEFT JOIN ' . $this->table2 . ' ON ' . $this->table . '.user_detail_id = '  . $this->table2 . '.user_detail_id
            WHERE ' . $this->table . '.project_id = :project_id';


            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':project_id',$this->project_id);
            $stmt->execute();

            return $stmt;
        }

        public function create() {

            $dr_time = date('m/d/Y', strtotime($this->dr_time));

            $query = 'INSERT INTO ' . $this->table . '
            SET
                dr_time = STR_TO_DATE(:dr_time, "%m/%d/%Y"),
                project_id = :project_id,
                user_detail_id = :user_detail_id';

            $stmt = $this->conn->prepare($query);

            $this->dr_time = htmlspecialchars(strip_tags($this->dr_time));
            $this->project_id = htmlspecialchars(strip_tags($this->project_id));
            $this->user_detail_id = htmlspecialchars(strip_tags($this->user_detail_id));

            $stmt->bindParam(':dr_time', $dr_time);
            $stmt->bindParam(':project_id', $this->project_id);
            $stmt->bindParam(':user_detail_id', $this->user_detail_id);

            if ($stmt->execute()) {
                return true;
            } else {
                return false;
            }
        }

        public function update() {
            
            $query = 'UPDATE ' . $this->table . '
            SET
                dr_time = :dr_time,
                project_id = :project_id,
                user_detail_id = :user_detail_id
            WHERE
                dr_id = :dr_id';

            $stmt = $this->conn->prepare($query);

            $this->dr_time = htmlspecialchars(strip_tags($this->dr_time));
            $this->project_id = htmlspecialchars(strip_tags($this->project_id));
            $this->user_detail_id = htmlspecialchars(strip_tags($this->user_detail_id));
            $this->dr_id = htmlspecialchars(strip_tags($this->dr_id));

            $stmt->bindParam(':dr_time', $this->dr_time);
            $stmt->bindParam(':project_id', $this->project_id);
            $stmt->bindParam(':user_detail_id', $this->user_detail_id);
            $stmt->bindParam(':dr_id', $this->dr_id);

            if ($stmt->execute()) {
                return true;
            }

            return false;
    
        }

        public function delete() {

            $query = 'DELETE  FROM ' . $this->table . ' WHERE dr_id = :dr_id';
            

            $stmt = $this->conn->prepare($query);

            $stmt->bindParam(':dr_id', $this->dr_id);

            if ($stmt->execute()) {
                return true;
            }

            return false;
        }

        public function deleteByProject() {

            $query = 'DELETE  FROM ' . $this->table . ' WHERE project_id = :project_id';
            

            $stmt = $this->conn->prepare($query);

            $stmt->bindParam(':project_id', $this->project_id);

            if ($stmt->execute()) {
                return true;
            }

            return false;
        }

    }

?>