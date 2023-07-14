-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 14, 2023 at 04:51 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `construction_track2`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_company`
--

CREATE TABLE `tb_company` (
  `comp_id` int(11) NOT NULL,
  `comp_name` varchar(50) NOT NULL,
  `comp_email` varchar(50) NOT NULL,
  `comp_address` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tb_company`
--

INSERT INTO `tb_company` (`comp_id`, `comp_name`, `comp_email`, `comp_address`) VALUES
(1, 'บริษัท เทส01 จำกัด', 'test01@gmail.com', '80/1 ถนนยาว ตำบลสั้น อำเภอเมือง จังหวัดสงขลา 90100');

-- --------------------------------------------------------

--
-- Table structure for table `tb_position`
--

CREATE TABLE `tb_position` (
  `pos_id` int(1) NOT NULL,
  `pos_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tb_position`
--

INSERT INTO `tb_position` (`pos_id`, `pos_name`) VALUES
(1, 'user'),
(2, 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `tb_prefix`
--

CREATE TABLE `tb_prefix` (
  `prefix_id` int(1) NOT NULL,
  `prefix_tname` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tb_prefix`
--

INSERT INTO `tb_prefix` (`prefix_id`, `prefix_tname`) VALUES
(1, 'นาง'),
(2, 'นาย');

-- --------------------------------------------------------

--
-- Table structure for table `tb_project`
--

CREATE TABLE `tb_project` (
  `project_id` int(5) NOT NULL,
  `project_name` varchar(50) NOT NULL,
  `project_start` date NOT NULL,
  `project_end` date NOT NULL,
  `user_detail_id` int(5) NOT NULL,
  `comp_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tb_project`
--

INSERT INTO `tb_project` (`project_id`, `project_name`, `project_start`, `project_end`, `user_detail_id`, `comp_id`) VALUES
(1, 'test01', '2023-07-16', '2023-07-22', 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tb_user_detail`
--

CREATE TABLE `tb_user_detail` (
  `user_detail_id` int(5) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `prefix_id` int(1) NOT NULL,
  `user_fname` varchar(50) NOT NULL,
  `user_lname` varchar(50) NOT NULL,
  `pos_id` int(1) NOT NULL,
  `user_email` varchar(50) NOT NULL,
  `user_tel` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tb_user_detail`
--

INSERT INTO `tb_user_detail` (`user_detail_id`, `username`, `password`, `prefix_id`, `user_fname`, `user_lname`, `pos_id`, `user_email`, `user_tel`) VALUES
(2, 'markzxc12', '$2y$10$6gOFcv781W4ebDHFUnFcyOUiDbxA2MBPpfe3MR1jvMT29kmpHHUzG', 2, 'Eden', 'Hazard', 2, 'phongsakorn801@rmutsvmail.com', '0985548326'),
(3, 'markzxc', '$2y$10$sp7iOHH5gDqVFXHoe3fSvOLcSpxYEmjGyWfTumwRDz0dyRkWmW.O.', 2, 'Mason', 'Mount', 2, 'phongsakorn801@rmutsvmail.com', '0985548326'),
(5, 'markz', '$2y$10$J1JF0c6Oe3ufSdVwKRwB9OOipStmDFaXAbOGf4bOwS2v7XvlEGBzG', 2, 'พงศกร', 'บุปผา', 2, 'phongsakorn801@rmutsvmail.com', '0985548326'),
(6, 'karm', '$2y$10$NW7YOns5HKHc5t2SFhmyIOWv7gB2.MFnkET/XLmndsolPFwNsdrbC', 2, 'john', 'doe', 1, 'test@gmail.com', '000000000');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_company`
--
ALTER TABLE `tb_company`
  ADD PRIMARY KEY (`comp_id`);

--
-- Indexes for table `tb_position`
--
ALTER TABLE `tb_position`
  ADD PRIMARY KEY (`pos_id`);

--
-- Indexes for table `tb_prefix`
--
ALTER TABLE `tb_prefix`
  ADD PRIMARY KEY (`prefix_id`);

--
-- Indexes for table `tb_project`
--
ALTER TABLE `tb_project`
  ADD PRIMARY KEY (`project_id`),
  ADD KEY `user_detail_id` (`user_detail_id`),
  ADD KEY `comp_id` (`comp_id`);

--
-- Indexes for table `tb_user_detail`
--
ALTER TABLE `tb_user_detail`
  ADD PRIMARY KEY (`user_detail_id`),
  ADD KEY `prefix_id` (`prefix_id`),
  ADD KEY `pos_id` (`pos_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_company`
--
ALTER TABLE `tb_company`
  MODIFY `comp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tb_position`
--
ALTER TABLE `tb_position`
  MODIFY `pos_id` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tb_prefix`
--
ALTER TABLE `tb_prefix`
  MODIFY `prefix_id` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tb_project`
--
ALTER TABLE `tb_project`
  MODIFY `project_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tb_user_detail`
--
ALTER TABLE `tb_user_detail`
  MODIFY `user_detail_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tb_project`
--
ALTER TABLE `tb_project`
  ADD CONSTRAINT `tb_project_ibfk_1` FOREIGN KEY (`user_detail_id`) REFERENCES `tb_user_detail` (`user_detail_id`),
  ADD CONSTRAINT `tb_project_ibfk_2` FOREIGN KEY (`comp_id`) REFERENCES `tb_company` (`comp_id`);

--
-- Constraints for table `tb_user_detail`
--
ALTER TABLE `tb_user_detail`
  ADD CONSTRAINT `tb_user_detail_ibfk_1` FOREIGN KEY (`prefix_id`) REFERENCES `tb_prefix` (`prefix_id`),
  ADD CONSTRAINT `tb_user_detail_ibfk_2` FOREIGN KEY (`pos_id`) REFERENCES `tb_position` (`pos_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
