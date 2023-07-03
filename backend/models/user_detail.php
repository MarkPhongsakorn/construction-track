<?php

    class Detail {

        private $conn;
        private $table = "tb_user_detail";

        public $user_detail_id;
        public $user_fname;
        public $user_lname;
        public $user_email;
        public $user_tel;
        public $user_address;

        public $user_login_id;
        public $pos_id;
        public $prefix_id;


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

            $query = 'SELECT * FROM ' . $this->table . ' WHERE user_detail_id = :user_detail_id';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':user_detail_id',$this->user_detail_id);
            $stmt->execute();

            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            $this->user_fname = $row['user_fname'];
            $this->user_lname = $row['user_lname'];
            $this->email = $row['user_email'];
            $this->user_tel = $row['user_tel'];
            $this->user_address = $row['user_address'];

            return $stmt;
        }

        // Create User
        public function create() {
            $query = 'INSERT INTO ' . $this->table . '
            SET
                user_login_id = :user_login_id,
                user_fname = :user_fname,
                user_lname = :user_lname,
                user_email = :user_email,
                user_tel = :user_tel,
                user_address = :user_address,
                prefix_id = :prefix_id,
                pos_id = :pos_id';

            $stmt = $this->conn->prepare($query);

            $this->user_login_id = htmlspecialchars(strip_tags($this->user_login_id));
            $this->user_fname = htmlspecialchars(strip_tags($this->user_fname));
            $this->user_lname = htmlspecialchars(strip_tags($this->user_lname));
            $this->user_email = htmlspecialchars(strip_tags($this->user_email));
            $this->user_tel = htmlspecialchars(strip_tags($this->user_tel));
            $this->user_address = htmlspecialchars(strip_tags($this->user_address));
            $this->prefix_id = htmlspecialchars(strip_tags($this->prefix_id));
            $this->pos_id = htmlspecialchars(strip_tags($this->pos_id));


            $stmt->bindParam(':user_login_id', $this->user_login_id);
            $stmt->bindParam(':user_fname', $this->user_fname);
            $stmt->bindParam(':user_lname', $this->user_lname);
            $stmt->bindParam(':user_email', $this->user_email);
            $stmt->bindParam(':user_tel', $this->user_tel);
            $stmt->bindParam(':user_address', $this->user_address);
            $stmt->bindParam(':prefix_id', $this->prefix_id);
            $stmt->bindParam(':pos_id', $this->pos_id);

            if ($stmt->execute()) {
                $this->user_detail_id = $this->conn->lastInsertId();
                return true;
            } else {
                return false;
            }
        }
        
        
        // UPDATE user
        public function update() {
            $query = 'UPDATE ' . $this->table . '
            SET
                user_fname = :user_fname,
                user_lname = :user_lname,
                user_email = :user_email,
                user_tel = :user_tel,
                user_address = :user_address
            WHERE
                user_detail_id = :user_detail_id';

            $stmt = $this->conn->prepare($query);

            $this->user_fname = htmlspecialchars(strip_tags($this->user_fname));
            $this->user_lname = htmlspecialchars(strip_tags($this->user_lname));
            $this->user_email = htmlspecialchars(strip_tags($this->user_email));
            $this->user_tel = htmlspecialchars(strip_tags($this->user_tel));
            $this->user_address = htmlspecialchars(strip_tags($this->user_address));

            $stmt->bindParam(':user_fname', $this->user_fname);
            $stmt->bindParam(':user_lname', $this->user_lname);
            $stmt->bindParam(':user_email', $this->user_email);
            $stmt->bindParam(':user_tel', $this->user_tel);
            $stmt->bindParam(':user_address', $this->user_address);
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


    }

?>