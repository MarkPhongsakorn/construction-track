<?php

    class Detail {

        private $conn;
        private $table = "tb_user_detail";
        private $table2 = "tb_prefix";
        private $table3 = "tb_position";

        public $user_detail_id;
        public $username;
        public $password;
        public $user_fname;
        public $user_lname;
        public $user_email;
        public $user_tel;
        public $user_address;

        public $pos_id;
        public $prefix_id;



        public function __construct($db) {
            $this->conn = $db;
        }

        // GET Data User ทุกตัว
        public function read() {

            $query = 'SELECT * FROM ' . $this->table . '
            INNER JOIN ' . $this->table2 . ' ON '
            . $this->table . '.prefix_id = ' . $this->table2 . '.prefix_id
            INNER JOIN ' . $this->table3 . ' ON '
            . $this->table . '.pos_id = ' . $this->table3 . '.pos_id';
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            
            return $stmt;
        }

        // GET Data User เพียง 1 ตัว
        public function read_one() {

            $query = 'SELECT * FROM ' . $this->table . '
            INNER JOIN ' . $this->table2 . ' ON '
            . $this->table . '.prefix_id = ' . $this->table2 . '.prefix_id
            INNER JOIN ' . $this->table3 . ' ON '
            . $this->table . '.pos_id = ' . $this->table3 . '.pos_id
            WHERE ' . $this->table . '.user_detail_id = :user_detail_id';

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':user_detail_id',$this->user_detail_id);
            $stmt->execute();

            return $stmt;
        }

        // Create User
        public function create($selectedPrefix, $selectedPosition) {

            $query = 'INSERT INTO ' . $this->table . '
            SET
                username = :username,
                password = :password,
                prefix_id = :prefix_id,
                user_fname = :user_fname,
                user_lname = :user_lname,
                pos_id = :pos_id,
                user_email = :user_email,
                user_tel = :user_tel';

            $stmt = $this->conn->prepare($query);

            $this->username = htmlspecialchars(strip_tags($this->username));
            $this->password = htmlspecialchars(strip_tags($this->password));
            $this->user_fname = htmlspecialchars(strip_tags($this->user_fname));
            $this->user_lname = htmlspecialchars(strip_tags($this->user_lname));
            $this->user_email = htmlspecialchars(strip_tags($this->user_email));
            $this->user_tel = htmlspecialchars(strip_tags($this->user_tel));
            
            $this->prefix_id = $selectedPrefix;
            $this->pos_id = $selectedPosition;

            $this->password = password_hash($this->password, PASSWORD_DEFAULT);

            $stmt->bindParam(':username', $this->username);
            $stmt->bindParam(':password', $this->password);
            $stmt->bindParam(':user_fname', $this->user_fname);
            $stmt->bindParam(':user_lname', $this->user_lname);
            $stmt->bindParam(':user_email', $this->user_email);
            $stmt->bindParam(':user_tel', $this->user_tel);

            $stmt->bindParam(':prefix_id', $this->prefix_id);
            $stmt->bindParam(':pos_id', $this->pos_id);

            if ($stmt->execute()) {
                // $this->user_detail_id = $this->conn->lastInsertId();
                return true;
            } else {
                return false;
            }
        }
        
        
        // UPDATE user
        public function update() {
            $query = 'UPDATE ' . $this->table . '
            SET
                username = :username,
                password = :password,
                user_fname = :user_fname,
                user_lname = :user_lname,
                user_email = :user_email,
                user_tel = :user_tel
            WHERE
                user_detail_id = :user_detail_id';

            $stmt = $this->conn->prepare($query);

            

            $this->username = htmlspecialchars(strip_tags($this->username));
            $this->password = htmlspecialchars(strip_tags($this->password));
            $this->user_fname = htmlspecialchars(strip_tags($this->user_fname));
            $this->user_lname = htmlspecialchars(strip_tags($this->user_lname));
            $this->user_email = htmlspecialchars(strip_tags($this->user_email));
            $this->user_tel = htmlspecialchars(strip_tags($this->user_tel));

            $stmt->bindParam(':username', $this->username);
            $stmt->bindParam(':password', $this->password);
            $stmt->bindParam(':user_fname', $this->user_fname);
            $stmt->bindParam(':user_lname', $this->user_lname);
            $stmt->bindParam(':user_email', $this->user_email);
            $stmt->bindParam(':user_tel', $this->user_tel);
            $stmt->bindParam(':user_detail_id', $this->user_detail_id);

            if($stmt->execute()) {
                return true;
            }

            return false;
            
        }

        // DELETE User
        public function delete() {

            $query = 'DELETE FROM ' . $this->table . ' WHERE user_detail_id = :user_detail_id';
            $stmt = $this->conn->prepare($query);

            $this->user_detail_id = htmlspecialchars(strip_tags($this->user_detail_id));

            $stmt->bindParam(':user_detail_id', $this->user_detail_id);

            if ($stmt->execute()) {
                return true;
            }

            return false;
        }

        // เช็ค username ไม่ให้ซ้ำกัน
        public function getUserByUsername($username) {

            $query = 'SELECT * FROM ' . $this->table . ' WHERE username = :username';
            $stmt = $this->conn->prepare($query);

            $stmt->bindParam(':username', $username);
            $stmt->execute();

            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            return $row;
        }

        // login 
        public function loginUser() {

            $query = 'SELECT * FROM ' . $this->table . ' WHERE username = :username';
            $stmt = $this->conn->prepare($query);
        
            $stmt->bindParam(':username', $this->username);

        
            $stmt->execute();
        
            if ($stmt->rowCount() > 0) {
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                $hashedPassword = $row['password'];
                
                if (password_verify($this->password, $hashedPassword)) {

                    $this->position = $this->userById($this->username);
                    $this->user_id = $this->usersById($this->username);

                    return true;
                }
            } else {
                return false;
            }
        }

        public function getPos() {
            return $this->position;

        }

        public function userById($username) {

            $query = 'SELECT pos_id FROM ' . $this->table . ' WHERE username = :username';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':username', $username);
            $stmt->execute();

            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $position = $row['pos_id'];

            return $position;


        }

        public function getUserId() {

            return $this->user_id;
        }

        public function usersById($username) {

            $query = 'SELECT user_detail_id FROM ' . $this->table . ' WHERE username = :username';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':username', $username);
            $stmt->execute();

            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $user_id = $row['user_detail_id'];

            return $user_id;

        }



    }

?>