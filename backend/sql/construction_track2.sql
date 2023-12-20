-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 20, 2023 at 07:50 AM
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

-- --------------------------------------------------------

--
-- Table structure for table `tb_daily_report`
--

CREATE TABLE `tb_daily_report` (
  `dr_id` int(11) NOT NULL,
  `dr_time` date NOT NULL,
  `project_id` int(5) NOT NULL,
  `user_detail_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_inspection`
--

CREATE TABLE `tb_inspection` (
  `inspec_id` int(11) NOT NULL,
  `inspec_result_id` int(1) NOT NULL,
  `dr_id` int(11) NOT NULL,
  `project_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
  `labor_name_id` int(5) NOT NULL,
  `labor_num` int(2) NOT NULL,
  `dr_id` int(11) NOT NULL,
  `project_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_labor_name`
--

CREATE TABLE `tb_labor_name` (
  `labor_name_id` int(5) NOT NULL,
  `labor_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tb_labor_name`
--

INSERT INTO `tb_labor_name` (`labor_name_id`, `labor_name`) VALUES
(1, 'ไม่มีแรงงานมาทำงาน'),
(2, 'วิศวกร (ผู้ควบคุมงาน)'),
(3, 'หัวหน้าช่าง/โฟร์แมน'),
(4, 'ช่างเทคนิค'),
(5, 'ช่างเขียนแบบ'),
(6, 'ช่างเชื่อม'),
(7, 'พนักงานควบคุมเครื่องจักร'),
(8, 'กรรมกร'),
(9, 'ช่างเหล็ก'),
(10, 'ช่างไม้'),
(11, 'ช่างก่ออิฐ-ฉาบปูน'),
(12, 'ช่างสี'),
(13, 'ช่างไฟฟ้า'),
(14, 'ช่างประปา'),
(15, 'ช่างปูกระเบื้อง/พรม'),
(16, 'ช่างฝ้าเพดาน'),
(17, 'ช่างอลูมิเนียม'),
(18, 'ช่างแอร์'),
(19, 'ช่างทั่วไป'),
(20, 'พนักงานสโตร์');

-- --------------------------------------------------------

--
-- Table structure for table `tb_material`
--

CREATE TABLE `tb_material` (
  `mat_id` int(11) NOT NULL,
  `mat_name_id` int(5) NOT NULL,
  `mat_num` float NOT NULL,
  `dr_id` int(11) NOT NULL,
  `project_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_mat_name`
--

CREATE TABLE `tb_mat_name` (
  `mat_name_id` int(5) NOT NULL,
  `mat_name` varchar(50) NOT NULL,
  `mat_unit` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tb_mat_name`
--

INSERT INTO `tb_mat_name` (`mat_name_id`, `mat_name`, `mat_unit`) VALUES
(1, 'ไม่มีวัสุดที่เข้าหน่วยงาน', '-'),
(2, 'แผ่นพื้นสำเร็จรูป 0.35x0.05x3.95', 'แผ่น'),
(3, 'คอนกรีต ผสมเสร็จ 180 ksc', 'ลบ.ม'),
(4, 'คอนกรีต ผสมเสร็จ 240 ksc', 'ลบ.ม');

-- --------------------------------------------------------

--
-- Table structure for table `tb_overdue`
--

CREATE TABLE `tb_overdue` (
  `od_id` int(1) NOT NULL,
  `od_detail` varchar(255) DEFAULT NULL,
  `dr_id` int(11) NOT NULL,
  `project_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
  `pos_name` varchar(50) NOT NULL,
  `pos_role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tb_position`
--

INSERT INTO `tb_position` (`pos_id`, `pos_name`, `pos_role`) VALUES
(1, 'วิศวกรควบคุมภายนอก(บุคลากรของบริษัท)', 'user'),
(2, 'วิศวกรควบคุมภายใน(บุคลากรของมหาลัย)', 'admin');

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
(1, 'นาย'),
(2, 'นาง'),
(3, 'นางสาว');

-- --------------------------------------------------------

--
-- Table structure for table `tb_problem`
--

CREATE TABLE `tb_problem` (
  `prob_id` int(5) NOT NULL,
  `problem` varchar(100) NOT NULL,
  `dr_id` int(11) NOT NULL,
  `project_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
  `comp_id` int(11) NOT NULL,
  `psta_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_project_status`
--

CREATE TABLE `tb_project_status` (
  `psta_id` int(5) NOT NULL,
  `psta_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tb_project_status`
--

INSERT INTO `tb_project_status` (`psta_id`, `psta_name`) VALUES
(1, 'กำลังดำเนินการ'),
(2, 'เกินกำหนด'),
(3, 'เสร็จสิ้น'),
(4, 'เสร็จสิ้น(เกินกำหนด)');

-- --------------------------------------------------------

--
-- Table structure for table `tb_rain_level`
--

CREATE TABLE `tb_rain_level` (
  `rain_id` int(5) NOT NULL,
  `rain_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tb_rain_level`
--

INSERT INTO `tb_rain_level` (`rain_id`, `rain_name`) VALUES
(1, 'ไม่ตก'),
(2, 'เล็กน้อย'),
(3, 'ปานกลาง'),
(4, 'หนัก');

-- --------------------------------------------------------

--
-- Table structure for table `tb_request`
--

CREATE TABLE `tb_request` (
  `req_id` int(11) NOT NULL,
  `req_date` date NOT NULL,
  `req_problem` varchar(255) DEFAULT NULL,
  `req_daily` varchar(255) DEFAULT NULL,
  `req_license` varchar(255) DEFAULT NULL,
  `req_certificate` varchar(255) DEFAULT NULL,
  `project_id` int(5) NOT NULL,
  `comp_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_sta_weather`
--

CREATE TABLE `tb_sta_weather` (
  `sta_id` int(1) NOT NULL,
  `sta_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tb_sta_weather`
--

INSERT INTO `tb_sta_weather` (`sta_id`, `sta_name`) VALUES
(1, 'ปลอดโปร่ง'),
(2, 'มืดครึ้ม'),
(3, 'ฝนตก');

-- --------------------------------------------------------

--
-- Table structure for table `tb_strike`
--

CREATE TABLE `tb_strike` (
  `strike_id` int(11) NOT NULL,
  `strike_detail` varchar(100) DEFAULT NULL,
  `strike_cause` varchar(100) DEFAULT NULL,
  `dr_id` int(11) NOT NULL,
  `project_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_time_inspect`
--

CREATE TABLE `tb_time_inspect` (
  `time_inspect_id` int(5) NOT NULL,
  `inspect_start` time NOT NULL,
  `inspect_end` time NOT NULL,
  `dr_id` int(11) NOT NULL,
  `project_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_tool`
--

CREATE TABLE `tb_tool` (
  `tool_id` int(11) NOT NULL,
  `tool_name_id` int(5) NOT NULL,
  `tool_num` int(2) NOT NULL,
  `dr_id` int(11) NOT NULL,
  `project_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_tool_name`
--

CREATE TABLE `tb_tool_name` (
  `tool_name_id` int(5) NOT NULL,
  `tool_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tb_tool_name`
--

INSERT INTO `tb_tool_name` (`tool_name_id`, `tool_name`) VALUES
(1, 'ไม่มีเครื่องมือและเครื่องจักร'),
(2, 'รถบรรทุก 6 ล้อ'),
(3, 'รถโมบายเครน'),
(4, 'แบ็คโฮ'),
(5, 'เครื่องดัดเหล็ก'),
(6, 'เครื่องตัดเหล็ก'),
(7, 'เครื่องเชื่อมไฟฟ้า'),
(8, 'เครื่องตัดแก๊ส'),
(9, 'เครื่องตัดไฟเบอร์, เลื่อยวงเดือน'),
(10, 'เครื่องกระแทกไฟฟ้า'),
(11, 'เครื่องจี้คอนกรีต'),
(12, 'กล้องวัดมุม, กล้องระดับ, กล้องวัดระยะเลเซอร์');

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

-- --------------------------------------------------------

--
-- Table structure for table `tb_weather`
--

CREATE TABLE `tb_weather` (
  `weather_id` int(11) NOT NULL,
  `period_id` int(1) NOT NULL,
  `sta_id` int(1) NOT NULL,
  `rain_id` int(5) NOT NULL,
  `rain_start` time NOT NULL,
  `rain_end` time NOT NULL,
  `dr_id` int(11) NOT NULL,
  `project_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_work`
--

CREATE TABLE `tb_work` (
  `work_id` int(11) NOT NULL,
  `work_num` int(2) NOT NULL,
  `work_detail` varchar(100) DEFAULT NULL,
  `dr_id` int(11) NOT NULL,
  `project_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_working_time`
--

CREATE TABLE `tb_working_time` (
  `work_time_id` int(5) NOT NULL,
  `work_start` time NOT NULL,
  `work_end` time NOT NULL,
  `dr_id` int(11) NOT NULL,
  `project_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
  ADD KEY `inspec_result_id` (`inspec_result_id`),
  ADD KEY `project_id` (`project_id`);

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
  ADD KEY `dr_id` (`dr_id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `labor_name_id` (`labor_name_id`);

--
-- Indexes for table `tb_labor_name`
--
ALTER TABLE `tb_labor_name`
  ADD PRIMARY KEY (`labor_name_id`);

--
-- Indexes for table `tb_material`
--
ALTER TABLE `tb_material`
  ADD PRIMARY KEY (`mat_id`),
  ADD KEY `dr_id` (`dr_id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `mat_name_id` (`mat_name_id`);

--
-- Indexes for table `tb_mat_name`
--
ALTER TABLE `tb_mat_name`
  ADD PRIMARY KEY (`mat_name_id`);

--
-- Indexes for table `tb_overdue`
--
ALTER TABLE `tb_overdue`
  ADD PRIMARY KEY (`od_id`),
  ADD KEY `dr_id` (`dr_id`),
  ADD KEY `project_id` (`project_id`);

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
-- Indexes for table `tb_problem`
--
ALTER TABLE `tb_problem`
  ADD PRIMARY KEY (`prob_id`),
  ADD KEY `dr_id` (`dr_id`),
  ADD KEY `project_id` (`project_id`);

--
-- Indexes for table `tb_project`
--
ALTER TABLE `tb_project`
  ADD PRIMARY KEY (`project_id`),
  ADD KEY `user_detail_id` (`user_detail_id`),
  ADD KEY `comp_id` (`comp_id`),
  ADD KEY `psta_id` (`psta_id`);

--
-- Indexes for table `tb_project_status`
--
ALTER TABLE `tb_project_status`
  ADD PRIMARY KEY (`psta_id`);

--
-- Indexes for table `tb_rain_level`
--
ALTER TABLE `tb_rain_level`
  ADD PRIMARY KEY (`rain_id`);

--
-- Indexes for table `tb_request`
--
ALTER TABLE `tb_request`
  ADD PRIMARY KEY (`req_id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `comp_id` (`comp_id`);

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
  ADD KEY `dr_id` (`dr_id`),
  ADD KEY `project_id` (`project_id`);

--
-- Indexes for table `tb_time_inspect`
--
ALTER TABLE `tb_time_inspect`
  ADD PRIMARY KEY (`time_inspect_id`),
  ADD KEY `dr_id` (`dr_id`),
  ADD KEY `project_id` (`project_id`);

--
-- Indexes for table `tb_tool`
--
ALTER TABLE `tb_tool`
  ADD PRIMARY KEY (`tool_id`),
  ADD KEY `dr_id` (`dr_id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `tool_name_id` (`tool_name_id`);

--
-- Indexes for table `tb_tool_name`
--
ALTER TABLE `tb_tool_name`
  ADD PRIMARY KEY (`tool_name_id`);

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
  ADD KEY `dr_id` (`dr_id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `rain_id` (`rain_id`);

--
-- Indexes for table `tb_work`
--
ALTER TABLE `tb_work`
  ADD PRIMARY KEY (`work_id`),
  ADD KEY `dr_id` (`dr_id`),
  ADD KEY `project_id` (`project_id`);

--
-- Indexes for table `tb_working_time`
--
ALTER TABLE `tb_working_time`
  ADD PRIMARY KEY (`work_time_id`),
  ADD KEY `dr_id` (`dr_id`),
  ADD KEY `project_id` (`project_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_company`
--
ALTER TABLE `tb_company`
  MODIFY `comp_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_daily_report`
--
ALTER TABLE `tb_daily_report`
  MODIFY `dr_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_inspection`
--
ALTER TABLE `tb_inspection`
  MODIFY `inspec_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_inspec_result`
--
ALTER TABLE `tb_inspec_result`
  MODIFY `inspec_result_id` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tb_labor`
--
ALTER TABLE `tb_labor`
  MODIFY `labor_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_labor_name`
--
ALTER TABLE `tb_labor_name`
  MODIFY `labor_name_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `tb_material`
--
ALTER TABLE `tb_material`
  MODIFY `mat_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_mat_name`
--
ALTER TABLE `tb_mat_name`
  MODIFY `mat_name_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tb_overdue`
--
ALTER TABLE `tb_overdue`
  MODIFY `od_id` int(1) NOT NULL AUTO_INCREMENT;

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
-- AUTO_INCREMENT for table `tb_problem`
--
ALTER TABLE `tb_problem`
  MODIFY `prob_id` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_project`
--
ALTER TABLE `tb_project`
  MODIFY `project_id` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_project_status`
--
ALTER TABLE `tb_project_status`
  MODIFY `psta_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tb_rain_level`
--
ALTER TABLE `tb_rain_level`
  MODIFY `rain_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
  MODIFY `strike_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_time_inspect`
--
ALTER TABLE `tb_time_inspect`
  MODIFY `time_inspect_id` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_tool`
--
ALTER TABLE `tb_tool`
  MODIFY `tool_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_tool_name`
--
ALTER TABLE `tb_tool_name`
  MODIFY `tool_name_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `tb_user_detail`
--
ALTER TABLE `tb_user_detail`
  MODIFY `user_detail_id` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_weather`
--
ALTER TABLE `tb_weather`
  MODIFY `weather_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_work`
--
ALTER TABLE `tb_work`
  MODIFY `work_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_working_time`
--
ALTER TABLE `tb_working_time`
  MODIFY `work_time_id` int(5) NOT NULL AUTO_INCREMENT;

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
  ADD CONSTRAINT `tb_inspection_ibfk_2` FOREIGN KEY (`inspec_result_id`) REFERENCES `tb_inspec_result` (`inspec_result_id`),
  ADD CONSTRAINT `tb_inspection_ibfk_3` FOREIGN KEY (`project_id`) REFERENCES `tb_project` (`project_id`);

--
-- Constraints for table `tb_labor`
--
ALTER TABLE `tb_labor`
  ADD CONSTRAINT `tb_labor_ibfk_1` FOREIGN KEY (`dr_id`) REFERENCES `tb_daily_report` (`dr_id`),
  ADD CONSTRAINT `tb_labor_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `tb_project` (`project_id`),
  ADD CONSTRAINT `tb_labor_ibfk_3` FOREIGN KEY (`labor_name_id`) REFERENCES `tb_labor_name` (`labor_name_id`);

--
-- Constraints for table `tb_material`
--
ALTER TABLE `tb_material`
  ADD CONSTRAINT `tb_material_ibfk_1` FOREIGN KEY (`dr_id`) REFERENCES `tb_daily_report` (`dr_id`),
  ADD CONSTRAINT `tb_material_ibfk_4` FOREIGN KEY (`project_id`) REFERENCES `tb_project` (`project_id`),
  ADD CONSTRAINT `tb_material_ibfk_5` FOREIGN KEY (`mat_name_id`) REFERENCES `tb_mat_name` (`mat_name_id`);

--
-- Constraints for table `tb_overdue`
--
ALTER TABLE `tb_overdue`
  ADD CONSTRAINT `tb_overdue_ibfk_1` FOREIGN KEY (`dr_id`) REFERENCES `tb_daily_report` (`dr_id`),
  ADD CONSTRAINT `tb_overdue_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `tb_project` (`project_id`);

--
-- Constraints for table `tb_problem`
--
ALTER TABLE `tb_problem`
  ADD CONSTRAINT `tb_problem_ibfk_1` FOREIGN KEY (`dr_id`) REFERENCES `tb_daily_report` (`dr_id`),
  ADD CONSTRAINT `tb_problem_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `tb_project` (`project_id`);

--
-- Constraints for table `tb_project`
--
ALTER TABLE `tb_project`
  ADD CONSTRAINT `tb_project_ibfk_1` FOREIGN KEY (`user_detail_id`) REFERENCES `tb_user_detail` (`user_detail_id`),
  ADD CONSTRAINT `tb_project_ibfk_2` FOREIGN KEY (`comp_id`) REFERENCES `tb_company` (`comp_id`),
  ADD CONSTRAINT `tb_project_ibfk_3` FOREIGN KEY (`psta_id`) REFERENCES `tb_project_status` (`psta_id`);

--
-- Constraints for table `tb_request`
--
ALTER TABLE `tb_request`
  ADD CONSTRAINT `tb_request_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `tb_project` (`project_id`),
  ADD CONSTRAINT `tb_request_ibfk_3` FOREIGN KEY (`comp_id`) REFERENCES `tb_company` (`comp_id`);

--
-- Constraints for table `tb_strike`
--
ALTER TABLE `tb_strike`
  ADD CONSTRAINT `tb_strike_ibfk_1` FOREIGN KEY (`dr_id`) REFERENCES `tb_daily_report` (`dr_id`),
  ADD CONSTRAINT `tb_strike_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `tb_project` (`project_id`);

--
-- Constraints for table `tb_time_inspect`
--
ALTER TABLE `tb_time_inspect`
  ADD CONSTRAINT `tb_time_inspect_ibfk_1` FOREIGN KEY (`dr_id`) REFERENCES `tb_daily_report` (`dr_id`),
  ADD CONSTRAINT `tb_time_inspect_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `tb_project` (`project_id`);

--
-- Constraints for table `tb_tool`
--
ALTER TABLE `tb_tool`
  ADD CONSTRAINT `tb_tool_ibfk_2` FOREIGN KEY (`dr_id`) REFERENCES `tb_daily_report` (`dr_id`),
  ADD CONSTRAINT `tb_tool_ibfk_3` FOREIGN KEY (`project_id`) REFERENCES `tb_project` (`project_id`),
  ADD CONSTRAINT `tb_tool_ibfk_4` FOREIGN KEY (`tool_name_id`) REFERENCES `tb_tool_name` (`tool_name_id`);

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
  ADD CONSTRAINT `tb_weather_ibfk_3` FOREIGN KEY (`dr_id`) REFERENCES `tb_daily_report` (`dr_id`),
  ADD CONSTRAINT `tb_weather_ibfk_4` FOREIGN KEY (`project_id`) REFERENCES `tb_project` (`project_id`),
  ADD CONSTRAINT `tb_weather_ibfk_6` FOREIGN KEY (`rain_id`) REFERENCES `tb_rain_level` (`rain_id`);

--
-- Constraints for table `tb_work`
--
ALTER TABLE `tb_work`
  ADD CONSTRAINT `tb_work_ibfk_1` FOREIGN KEY (`dr_id`) REFERENCES `tb_daily_report` (`dr_id`),
  ADD CONSTRAINT `tb_work_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `tb_project` (`project_id`);

--
-- Constraints for table `tb_working_time`
--
ALTER TABLE `tb_working_time`
  ADD CONSTRAINT `tb_working_time_ibfk_1` FOREIGN KEY (`dr_id`) REFERENCES `tb_daily_report` (`dr_id`),
  ADD CONSTRAINT `tb_working_time_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `tb_project` (`project_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
