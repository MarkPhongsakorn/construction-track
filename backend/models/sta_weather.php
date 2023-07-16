<?php

    class Status {
        private $conn;
        private $table = "tb_sta_weather";

        public $sta_id;
        public $sta_name;
        public $sta_time;

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

            $query = 'SELECT * FROM ' . $this->table . ' WHERE sta_id = :sta_id';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':sta_id', $this->sta_id);
            $stmt->execute();

            return $stmt;
        }

        public function create() {
            $query = 'INSERT INTO ' . $this->table . '
            SET
                sta_name = :sta_name,
                sta_time = :sta_time';

            $stmt = $this->conn->prepare($query);

            $this->sta_name = htmlspecialchars(strip_tags($this->sta_name));
            $this->sta_time = htmlspecialchars(strip_tags($this->sta_time));

            $stmt->bindParam(':sta_name', $this->sta_name);
            $stmt->bindParam(':sta_time', $this->sta_time);

            if ($stmt->execute()) {
                return json_encode("Created.");
            } else {
                return json_encode("Failed to create.");
            }
        }

        public function update() {
            $query = 'UPDATE ' . $this->table . '
            SET
                sta_name = :sta_name,
                sta_time = :sta_time
            WHERE
                sta_id = :sta_id';

            $stmt = $this->conn->prepare($query);

            $this->sta_name = htmlspecialchars(strip_tags($this->sta_name));
            $this->sta_time = htmlspecialchars(strip_tags($this->sta_time));

            $stmt->bindParam(':sta_name', $this->sta_name);
            $stmt->bindParam(':sta_time', $this->sta_time);
            $stmt->bindParam(':sta_id', $this->sta_id);

            if ($stmt->execute()) {
                return json_encode("Updated.");
            } else {
                return json_encode("Failed to updated.");
            }
            
        }

        public function delete() {

            $query = 'DELETE FROM ' . $this->table . ' WHERE sta_id = :sta_id';
            $stmt = $this->conn->prepare($query);

            $this->sta_id = htmlspecialchars(strip_tags($this->sta_id));

            $stmt->bindParam(':sta_id', $this->sta_id);

            if ($stmt->execute()) {
                return true;
            }

            return false;
        }
    }

?>