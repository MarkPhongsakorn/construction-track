<?php

    class RainTime {
        private $conn;
        private $table = "tb_rain_time";

        public $rain_time_id;
        public $rain_time_start;
        public $rain_time_end;

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

            $query = 'SELECT * FROM ' . $this->table . ' WHERE ' . $this->table . '.rain_time_id = :rain_time_id';

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':rain_time_id', $this->rain_time_id);
            $stmt->execute();

            return $stmt;
        }

        public function create() {
            $query = 'INSERT INTO ' . $this->table . '
            SET
                rain_time_start = :rain_time_start,
                rain_time_end = :rain_time_end';

            $stmt = $this->conn->prepare($query);

            $this->rain_time_start = htmlspecialchars(strip_tags($this->rain_time_start));
            $this->rain_time_end = htmlspecialchars(strip_tags($this->rain_time_end));

            $stmt->bindParam(':rain_time_start', $this->rain_time_start);
            $stmt->bindParam(':rain_time_end', $this->rain_time_end);

            if ($stmt->execute()) {
                return json_encode("Created.");
            } else {
                return json_encode("Failed to create.");
            }
        }

        public function update() {
            $query = 'UPDATE ' . $this->table . '
            SET
                rain_name = :rain_name
            WHERE
                rain_id = :rain_id';

            $stmt = $this->conn->prepare($query);

            $this->rain_name = htmlspecialchars(strip_tags($this->rain_name));


            $stmt->bindParam(':rain_name', $this->rain_name);
            $stmt->bindParam(':rain_id', $this->rain_id);

            if ($stmt->execute()) {
                return json_encode("Updated.");
            } else {
                return json_encode("Failed to updated.");
            }
            
        }

        public function delete() {

            $query = 'DELETE FROM ' . $this->table . ' WHERE rain_id = :rain_id';
            $stmt = $this->conn->prepare($query);

            $this->rain_id = htmlspecialchars(strip_tags($this->rain_id));

            $stmt->bindParam(':rain_id', $this->rain_id);

            if ($stmt->execute()) {
                return true;
            }

            return false;
        }
    }

?>