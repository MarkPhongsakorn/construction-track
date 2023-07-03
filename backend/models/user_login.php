<?php

    class Login {

        private $conn;
        private $table = "user_login";

        public $user_login_id;
        public $username;
        public $password;




        public function __construct($db) {
            $this->conn = $db;
        }

        // GET Data User ทุกตัว
        public function read() {

            $query = 'SELECT * FROM ' . $this->table . '';
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            
            return $stmt;
        }

        // GET Data User เพียง 1 ตัว
        public function read_one() {

            $query = 'SELECT * FROM ' . $this->table . ' WHERE user_login_id = :user_login_id';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':user_login_id',$this->user_login_id);
            $stmt->execute();

            return $stmt;
        }

        // Create User
        public function create() {
            $query = 'INSERT INTO ' . $this->table . '
            SET
                username = :username,
                password = :password';

            $stmt = $this->conn->prepare($query);

            $this->username = htmlspecialchars(strip_tags($this->username));
            $this->password = htmlspecialchars(strip_tags($this->password));

            $stmt->bindParam(':username', $this->username);
            $stmt->bindParam(':password', $this->password);

            if ($stmt->execute()) {
                return json_encode("Created.");
            } else {
                return json_encode("Failed to create.");
            }
        }
        
        
        // UPDATE user
        public function update() {
            $query = 'UPDATE ' . $this->table . '
            SET
                username = :username,
                password = :password
            WHERE
                user_login_id = :user_login_id';

            $stmt = $this->conn->prepare($query);

            $this->username = htmlspecialchars(strip_tags($this->username));
            $this->password = htmlspecialchars(strip_tags($this->password));

            $stmt->bindParam(':username', $this->username);
            $stmt->bindParam(':password', $this->password);
            $stmt->bindParam(':user_login_id', $this->user_login_id);
            
            if($stmt->execute()) {
                return true;
            }

            return false;
            
        }

        // DELETE User
        public function delete() {

            $query = 'DELETE FROM ' . $this->table . ' WHERE user_login_id = :user_login_id';
            $stmt = $this->conn->prepare($query);

            $this->user_login_id = htmlspecialchars(strip_tags($this->user_login_id));

            $stmt->bindParam(':user_login_id', $this->user_login_id);

            if ($stmt->execute()) {
                return true;
            }

            return false;
        }


    }

?>