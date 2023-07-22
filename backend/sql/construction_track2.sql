-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 22, 2023 at 04:59 PM
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
-- Table structure for table `tb_daily_report`
--

CREATE TABLE `tb_daily_report` (
  `dr_id` int(11) NOT NULL,
  `dr_time` date NOT NULL,
  `problem` varchar(255) NOT NULL,
  `project_id` int(5) NOT NULL,
  `user_detail_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tb_daily_report`
--

INSERT INTO `tb_daily_report` (`dr_id`, `dr_time`, `problem`, `project_id`, `user_detail_id`) VALUES
(1, '2023-07-20', 'ปัญหาเยอะมาก', 1, 2),
(2, '2023-07-14', 'ปัญหาเยอะมาก เมื่อไรปัญหาจะหมดไปสักที', 2, 3),
(4, '2023-07-19', 'dddd', 1, 2),
(5, '2023-07-14', 'ปัญหาเยอะมาก เมื่อไรปัญหาจะหมดไปสัก', 1, 2),
(6, '2023-07-14', 'ปัญหาเยอะมาก', 1, 2),
(7, '2023-07-14', 'ปัญหาเยอะมาก เมื่อไรปัญหาจะหมดไป', 1, 2),
(11, '2023-07-20', '1. มีปัญหามากๆเลย\n2. มีปัญหาฉิบหาย\n3. มีปัญหาอะไรเยอะแยะ', 1, 2),
(12, '2023-07-20', '12345', 2, 3),
(13, '2023-07-22', '123456789', 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `tb_inspection`
--

CREATE TABLE `tb_inspection` (
  `inspec_id` int(11) NOT NULL,
  `inspec_result_id` int(1) NOT NULL,
  `dr_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tb_inspection`
--

INSERT INTO `tb_inspection` (`inspec_id`, `inspec_result_id`, `dr_id`) VALUES
(2, 2, 1),
(3, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tb_inspec_result`
--

CREATE TABLE `tb_inspec_result` (
  `inspec_result_id` int(1) NOT NULL,
  `inspec_result` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tb_inspec_result`
--

INSERT INTO `tb_inspec_result` (`inspec_result_id`, `inspec_result`) VALUES
(1, 'เร็วกว่ากำหนด'),
(2, 'ปกติ'),
(3, 'ช้ากว่ากำหนด');

-- --------------------------------------------------------

--
-- Table structure for table `tb_labor`
--

CREATE TABLE `tb_labor` (
  `labor_id` int(11) NOT NULL,
  `labor_name` varchar(50) NOT NULL,
  `labor_num` varchar(10) NOT NULL,
  `dr_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tb_labor`
--

INSERT INTO `tb_labor` (`labor_id`, `labor_name`, `labor_num`, `dr_id`) VALUES
(6, 'วิศวกรควบคุม', '1', 1),
(7, 'ช่างก่อสร้าง', '10', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tb_material`
--

CREATE TABLE `tb_material` (
  `mat_id` int(11) NOT NULL,
  `mat_name` varchar(50) NOT NULL,
  `mat_num` varchar(10) NOT NULL,
  `unit_id` int(11) NOT NULL,
  `dr_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tb_material`
--

INSERT INTO `tb_material` (`mat_id`, `mat_name`, `mat_num`, `unit_id`, `dr_id`) VALUES
(3, 'เหล็ก', '1', 3, 1),
(4, 'ผ้า', '1', 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tb_period`
--

CREATE TABLE `tb_period` (
  `period_id` int(1) NOT NULL,
  `period_name` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tb_period`
--

INSERT INTO `tb_period` (`period_id`, `period_name`) VALUES
(1, 'เช้า'),
(2, 'บ่าย');

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
(1, 'test01', '2023-07-23', '2023-07-29', 5, 1),
(2, 'test02', '2023-07-01', '2023-07-31', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tb_request`
--

CREATE TABLE `tb_request` (
  `req_id` int(11) NOT NULL,
  `req_problem` varchar(255) DEFAULT NULL,
  `req_daily` varchar(255) DEFAULT NULL,
  `req_license` varchar(255) DEFAULT NULL,
  `req_certificate` varchar(255) DEFAULT NULL,
  `user_detail_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_sta_weather`
--

CREATE TABLE `tb_sta_weather` (
  `sta_id` int(1) NOT NULL,
  `sta_name` varchar(20) NOT NULL,
  `sta_time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tb_sta_weather`
--

INSERT INTO `tb_sta_weather` (`sta_id`, `sta_name`, `sta_time`) VALUES
(1, 'ปลอดโปร่ง', '00:00:00'),
(2, 'มืดครึ้ม', '00:00:00'),
(3, 'ฝนตก', '00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `tb_strike`
--

CREATE TABLE `tb_strike` (
  `strike_id` int(11) NOT NULL,
  `strike_detail` varchar(100) DEFAULT NULL,
  `strike_cause` varchar(100) DEFAULT NULL,
  `dr_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tb_strike`
--

INSERT INTO `tb_strike` (`strike_id`, `strike_detail`, `strike_cause`, `dr_id`) VALUES
(2, '-', '-', 1),
(3, '-', '-', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tb_tool`
--

CREATE TABLE `tb_tool` (
  `tool_id` int(11) NOT NULL,
  `tool_name` varchar(20) NOT NULL,
  `tool_num` varchar(10) NOT NULL,
  `unit_id` int(11) NOT NULL,
  `dr_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tb_tool`
--

INSERT INTO `tb_tool` (`tool_id`, `tool_name`, `tool_num`, `unit_id`, `dr_id`) VALUES
(1, 'รถปูน', '1', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tb_unit`
--

CREATE TABLE `tb_unit` (
  `unit_id` int(11) NOT NULL,
  `unit_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tb_unit`
--

INSERT INTO `tb_unit` (`unit_id`, `unit_name`) VALUES
(1, 'คัน'),
(2, 'เครื่อง'),
(3, 'ห่อ');

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
(6, 'karm', '$2y$10$NW7YOns5HKHc5t2SFhmyIOWv7gB2.MFnkET/XLmndsolPFwNsdrbC', 2, 'john', 'doe', 1, 'test@gmail.com', '000000000'),
(7, 'test01', '$2y$10$L2Rch7OmFqdqBzz7Zfila.PPTtg/4NudsUXq8hWerPiCgVd82XhIi', 2, 'Hola', 'Amigo', 1, 'test01@gmail.com', '0123456789');

-- --------------------------------------------------------

--
-- Table structure for table `tb_weather`
--

CREATE TABLE `tb_weather` (
  `weather_id` int(11) NOT NULL,
  `period_id` int(1) NOT NULL,
  `sta_id` int(1) NOT NULL,
  `dr_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tb_weather`
--

INSERT INTO `tb_weather` (`weather_id`, `period_id`, `sta_id`, `dr_id`) VALUES
(12, 1, 1, 1),
(13, 2, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tb_work`
--

CREATE TABLE `tb_work` (
  `work_id` int(11) NOT NULL,
  `work_num` int(2) NOT NULL,
  `work_detail` varchar(100) NOT NULL,
  `dr_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tb_work`
--

INSERT INTO `tb_work` (`work_id`, `work_num`, `work_detail`, `dr_id`) VALUES
(8, 1, 'ก่อสร้างตึก', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_company`
--
ALTER TABLE `tb_company`
  ADD PRIMARY KEY (`comp_id`);

--
-- Indexes for table `tb_daily_report`
--
ALTER TABLE `tb_daily_report`
  ADD PRIMARY KEY (`dr_id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `user_detail_id` (`user_detail_id`);

--
-- Indexes for table `tb_inspection`
--
ALTER TABLE `tb_inspection`
  ADD PRIMARY KEY (`inspec_id`),
  ADD KEY `dr_id` (`dr_id`),
  ADD KEY `inspec_result_id` (`inspec_result_id`);

--
-- Indexes for table `tb_inspec_result`
--
ALTER TABLE `tb_inspec_result`
  ADD PRIMARY KEY (`inspec_result_id`);

--
-- Indexes for table `tb_labor`
--
ALTER TABLE `tb_labor`
  ADD PRIMARY KEY (`labor_id`),
  ADD KEY `dr_id` (`dr_id`);

--
-- Indexes for table `tb_material`
--
ALTER TABLE `tb_material`
  ADD PRIMARY KEY (`mat_id`),
  ADD KEY `dr_id` (`dr_id`),
  ADD KEY `unit_id` (`unit_id`);

--
-- Indexes for table `tb_period`
--
ALTER TABLE `tb_period`
  ADD PRIMARY KEY (`period_id`);

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
-- Indexes for table `tb_request`
--
ALTER TABLE `tb_request`
  ADD PRIMARY KEY (`req_id`),
  ADD KEY `user_detail_id` (`user_detail_id`);

--
-- Indexes for table `tb_sta_weather`
--
ALTER TABLE `tb_sta_weather`
  ADD PRIMARY KEY (`sta_id`);

--
-- Indexes for table `tb_strike`
--
ALTER TABLE `tb_strike`
  ADD PRIMARY KEY (`strike_id`),
  ADD KEY `dr_id` (`dr_id`);

--
-- Indexes for table `tb_tool`
--
ALTER TABLE `tb_tool`
  ADD PRIMARY KEY (`tool_id`),
  ADD KEY `unit_id` (`unit_id`),
  ADD KEY `dr_id` (`dr_id`);

--
-- Indexes for table `tb_unit`
--
ALTER TABLE `tb_unit`
  ADD PRIMARY KEY (`unit_id`);

--
-- Indexes for table `tb_user_detail`
--
ALTER TABLE `tb_user_detail`
  ADD PRIMARY KEY (`user_detail_id`),
  ADD KEY `prefix_id` (`prefix_id`),
  ADD KEY `pos_id` (`pos_id`);

--
-- Indexes for table `tb_weather`
--
ALTER TABLE `tb_weather`
  ADD PRIMARY KEY (`weather_id`),
  ADD KEY `period_id` (`period_id`),
  ADD KEY `sta_id` (`sta_id`),
  ADD KEY `dr_id` (`dr_id`);

--
-- Indexes for table `tb_work`
--
ALTER TABLE `tb_work`
  ADD PRIMARY KEY (`work_id`),
  ADD KEY `dr_id` (`dr_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_company`
--
ALTER TABLE `tb_company`
  MODIFY `comp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tb_daily_report`
--
ALTER TABLE `tb_daily_report`
  MODIFY `dr_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `tb_inspection`
--
ALTER TABLE `tb_inspection`
  MODIFY `inspec_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tb_inspec_result`
--
ALTER TABLE `tb_inspec_result`
  MODIFY `inspec_result_id` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tb_labor`
--
ALTER TABLE `tb_labor`
  MODIFY `labor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tb_material`
--
ALTER TABLE `tb_material`
  MODIFY `mat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tb_period`
--
ALTER TABLE `tb_period`
  MODIFY `period_id` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
  MODIFY `project_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tb_request`
--
ALTER TABLE `tb_request`
  MODIFY `req_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_sta_weather`
--
ALTER TABLE `tb_sta_weather`
  MODIFY `sta_id` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tb_strike`
--
ALTER TABLE `tb_strike`
  MODIFY `strike_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tb_tool`
--
ALTER TABLE `tb_tool`
  MODIFY `tool_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tb_unit`
--
ALTER TABLE `tb_unit`
  MODIFY `unit_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tb_user_detail`
--
ALTER TABLE `tb_user_detail`
  MODIFY `user_detail_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tb_weather`
--
ALTER TABLE `tb_weather`
  MODIFY `weather_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `tb_work`
--
ALTER TABLE `tb_work`
  MODIFY `work_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tb_daily_report`
--
ALTER TABLE `tb_daily_report`
  ADD CONSTRAINT `tb_daily_report_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `tb_project` (`project_id`),
  ADD CONSTRAINT `tb_daily_report_ibfk_2` FOREIGN KEY (`user_detail_id`) REFERENCES `tb_user_detail` (`user_detail_id`);

--
-- Constraints for table `tb_inspection`
--
ALTER TABLE `tb_inspection`
  ADD CONSTRAINT `tb_inspection_ibfk_1` FOREIGN KEY (`dr_id`) REFERENCES `tb_daily_report` (`dr_id`),
  ADD CONSTRAINT `tb_inspection_ibfk_2` FOREIGN KEY (`inspec_result_id`) REFERENCES `tb_inspec_result` (`inspec_result_id`);

--
-- Constraints for table `tb_labor`
--
ALTER TABLE `tb_labor`
  ADD CONSTRAINT `tb_labor_ibfk_1` FOREIGN KEY (`dr_id`) REFERENCES `tb_daily_report` (`dr_id`);

--
-- Constraints for table `tb_material`
--
ALTER TABLE `tb_material`
  ADD CONSTRAINT `tb_material_ibfk_1` FOREIGN KEY (`dr_id`) REFERENCES `tb_daily_report` (`dr_id`),
  ADD CONSTRAINT `tb_material_ibfk_2` FOREIGN KEY (`unit_id`) REFERENCES `tb_unit` (`unit_id`),
  ADD CONSTRAINT `tb_material_ibfk_3` FOREIGN KEY (`unit_id`) REFERENCES `tb_unit` (`unit_id`);

--
-- Constraints for table `tb_project`
--
ALTER TABLE `tb_project`
  ADD CONSTRAINT `tb_project_ibfk_1` FOREIGN KEY (`user_detail_id`) REFERENCES `tb_user_detail` (`user_detail_id`),
  ADD CONSTRAINT `tb_project_ibfk_2` FOREIGN KEY (`comp_id`) REFERENCES `tb_company` (`comp_id`);

--
-- Constraints for table `tb_request`
--
ALTER TABLE `tb_request`
  ADD CONSTRAINT `tb_request_ibfk_1` FOREIGN KEY (`user_detail_id`) REFERENCES `tb_user_detail` (`user_detail_id`);

--
-- Constraints for table `tb_strike`
--
ALTER TABLE `tb_strike`
  ADD CONSTRAINT `tb_strike_ibfk_1` FOREIGN KEY (`dr_id`) REFERENCES `tb_daily_report` (`dr_id`);

--
-- Constraints for table `tb_tool`
--
ALTER TABLE `tb_tool`
  ADD CONSTRAINT `tb_tool_ibfk_1` FOREIGN KEY (`unit_id`) REFERENCES `tb_unit` (`unit_id`),
  ADD CONSTRAINT `tb_tool_ibfk_2` FOREIGN KEY (`dr_id`) REFERENCES `tb_daily_report` (`dr_id`);

--
-- Constraints for table `tb_user_detail`
--
ALTER TABLE `tb_user_detail`
  ADD CONSTRAINT `tb_user_detail_ibfk_1` FOREIGN KEY (`prefix_id`) REFERENCES `tb_prefix` (`prefix_id`),
  ADD CONSTRAINT `tb_user_detail_ibfk_2` FOREIGN KEY (`pos_id`) REFERENCES `tb_position` (`pos_id`);

--
-- Constraints for table `tb_weather`
--
ALTER TABLE `tb_weather`
  ADD CONSTRAINT `tb_weather_ibfk_1` FOREIGN KEY (`period_id`) REFERENCES `tb_period` (`period_id`),
  ADD CONSTRAINT `tb_weather_ibfk_2` FOREIGN KEY (`sta_id`) REFERENCES `tb_sta_weather` (`sta_id`),
  ADD CONSTRAINT `tb_weather_ibfk_3` FOREIGN KEY (`dr_id`) REFERENCES `tb_daily_report` (`dr_id`);

--
-- Constraints for table `tb_work`
--
ALTER TABLE `tb_work`
  ADD CONSTRAINT `tb_work_ibfk_1` FOREIGN KEY (`dr_id`) REFERENCES `tb_daily_report` (`dr_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
