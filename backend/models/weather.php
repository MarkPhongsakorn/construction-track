<?php

    class Weather {
        private $conn;
        private $table = "tb_weather";
        private $table2 = "tb_period";
        private $table3 = "tb_sta_weather";

        public $weather_id;
        public $period_id;
        public $sta_id;
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
            ' INNER JOIN ' . $this->table2 . ' ON ' . $this->table . '.period_id = ' . $this->table2 . '.period_id' .
            ' INNER JOIN ' . $this->table3 . ' ON ' . $this->table . '.sta_id = ' . $this->table3 . '.sta_id' .
            ' WHERE ' . $this->table . '.dr_id = :dr_id AND ' . $this->table . '.period_id = :period_id';

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':dr_id', $this->dr_id);
            $stmt->bindParam(':period_id', $this->period_id);
            $stmt->execute();

            return $stmt;
        }

        public function create() {
            $query = 'INSERT INTO ' . $this->table . '
            SET
                period_id = :period_id,
                sta_id = :sta_id,
                dr_id = :dr_id,
                project_id = :project_id';

            $stmt = $this->conn->prepare($query);

            $this->period_id = htmlspecialchars(strip_tags($this->period_id));
            $this->sta_id = htmlspecialchars(strip_tags($this->sta_id));
            $this->dr_id = htmlspecialchars(strip_tags($this->dr_id));
            $this->project_id = htmlspecialchars(strip_tags($this->project_id));

            $stmt->bindParam(':period_id', $this->period_id);
            $stmt->bindParam(':sta_id', $this->sta_id);
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
                period_id = :period_id,
                sta_id = :sta_id,
                dr_id = :dr_id,
                project_id = :project_id
            WHERE
                weather_id = :weather_id';

            $stmt = $this->conn->prepare($query);

            $this->period_id = htmlspecialchars(strip_tags($this->period_id));
            $this->sta_id = htmlspecialchars(strip_tags($this->sta_id));
            $this->dr_id = htmlspecialchars(strip_tags($this->dr_id));
            $this->project_id = htmlspecialchars(strip_tags($this->project_id));

            $stmt->bindParam(':period_id', $this->period_id);
            $stmt->bindParam(':sta_id', $this->sta_id);
            $stmt->bindParam(':dr_id', $this->dr_id);
            $stmt->bindParam(':project_id', $this->project_id);
            $stmt->bindParam(':weather_id', $this->weather_id);

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
    }

?>