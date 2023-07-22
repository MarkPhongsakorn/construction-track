<?php

    class Weather {
        private $conn;
        private $table = "tb_weather";

        public $weather_id;
        public $period_id;
        public $sta_id;
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

            $query = 'SELECT * FROM ' . $this->table . ' WHERE weather_id = :weather_id';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':weather_id', $this->weather_id);
            $stmt->execute();

            return $stmt;
        }

        public function create() {
            $query = 'INSERT INTO ' . $this->table . '
            SET
                period_id = :period_id,
                sta_id = :sta_id,
                dr_id = :dr_id';

            $stmt = $this->conn->prepare($query);

            $this->period_id = htmlspecialchars(strip_tags($this->period_id));
            $this->sta_id = htmlspecialchars(strip_tags($this->sta_id));
            $this->dr_id = htmlspecialchars(strip_tags($this->dr_id));

            $stmt->bindParam(':period_id', $this->period_id);
            $stmt->bindParam(':sta_id', $this->sta_id);
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
                period_id = :period_id,
                sta_id = :sta_id,
                dr_id = :dr_id
            WHERE
                weather_id = :weather_id';

            $stmt = $this->conn->prepare($query);

            $this->period_id = htmlspecialchars(strip_tags($this->period_id));
            $this->sta_id = htmlspecialchars(strip_tags($this->sta_id));
            $this->dr_id = htmlspecialchars(strip_tags($this->dr_id));

            $stmt->bindParam(':period_id', $this->period_id);
            $stmt->bindParam(':sta_id', $this->sta_id);
            $stmt->bindParam(':dr_id', $this->dr_id);
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