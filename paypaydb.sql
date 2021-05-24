-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 24, 2021 at 02:45 PM
-- Server version: 5.7.31
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `paypaydb`
--

-- --------------------------------------------------------

--
-- Table structure for table `empdetails`
--

DROP TABLE IF EXISTS `empdetails`;
CREATE TABLE IF NOT EXISTS `empdetails` (
  `emp_id` int(50) NOT NULL AUTO_INCREMENT,
  `emp_name` varchar(100) NOT NULL,
  `emp_contact` varchar(50) NOT NULL,
  `emp_roll` varchar(50) NOT NULL,
  PRIMARY KEY (`emp_id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `empdetails`
--

INSERT INTO `empdetails` (`emp_id`, `emp_name`, `emp_contact`, `emp_roll`) VALUES
(1, 'anoop', '9746773904', 'Admin'),
(14, 'antony', '75647856', 'Employee'),
(10, 'angel', '974766', 'Admin'),
(9, 'neenu', '9746773904', 'Employee'),
(12, 'adhinav', '9746773904', 'Employee');

-- --------------------------------------------------------

--
-- Table structure for table `employeetaging`
--

DROP TABLE IF EXISTS `employeetaging`;
CREATE TABLE IF NOT EXISTS `employeetaging` (
  `tag_id` int(50) NOT NULL AUTO_INCREMENT,
  `emp_id` int(50) NOT NULL,
  `provider_id` int(50) NOT NULL,
  PRIMARY KEY (`tag_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employeetaging`
--

INSERT INTO `employeetaging` (`tag_id`, `emp_id`, `provider_id`) VALUES
(1, 14, 9),
(2, 14, 12),
(3, 9, 14),
(4, 9, 10),
(5, 14, 10);

-- --------------------------------------------------------

--
-- Table structure for table `feedbackdetails`
--

DROP TABLE IF EXISTS `feedbackdetails`;
CREATE TABLE IF NOT EXISTS `feedbackdetails` (
  `feedback_id` int(100) NOT NULL AUTO_INCREMENT,
  `emp_id` int(100) NOT NULL,
  `feedback` varchar(500) NOT NULL,
  `provider_id` int(50) NOT NULL,
  `feedback_date` date NOT NULL,
  PRIMARY KEY (`feedback_id`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `feedbackdetails`
--

INSERT INTO `feedbackdetails` (`feedback_id`, `emp_id`, `feedback`, `provider_id`, `feedback_date`) VALUES
(1, 1, 'he is good boy', 12, '2021-05-05'),
(2, 9, 'ZXzXXZX', 1, '2012-05-21'),
(3, 9, 'test for nenu', 1, '2021-05-23'),
(4, 9, 'ssssssssdfsdfdsf', 1, '2021-05-23'),
(5, 12, 'test', 1, '2021-05-23'),
(6, 10, 'good', 1, '2021-05-23'),
(7, 1, 'feedback from myself', 1, '2021-05-23'),
(8, 10, 'very good presentation', 1, '2021-05-23'),
(9, 14, 'you are a very good employee', 1, '2021-05-23'),
(10, 14, 'he is a very good team player. Keep the good work!', 9, '2021-05-23'),
(11, 9, 'very good team player. Try onsite', 14, '2021-05-23'),
(12, 9, 'very good', 10, '2021-05-23'),
(13, 14, 'try for a promotion', 1, '2021-05-23'),
(14, 14, 'test', 9, '2021-05-23'),
(15, 14, 'vergood keep the good wok man', 12, '2021-05-23'),
(16, 14, 'test', 1, '2021-05-23'),
(17, 1, 'vvvv', 1, '2021-05-23');

-- --------------------------------------------------------

--
-- Table structure for table `logindetails`
--

DROP TABLE IF EXISTS `logindetails`;
CREATE TABLE IF NOT EXISTS `logindetails` (
  `login_id` int(50) NOT NULL AUTO_INCREMENT,
  `userName` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `emp_id` int(50) NOT NULL,
  `emp_roll` varchar(50) NOT NULL,
  PRIMARY KEY (`login_id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `logindetails`
--

INSERT INTO `logindetails` (`login_id`, `userName`, `password`, `emp_id`, `emp_roll`) VALUES
(1, 'anoop', 'anoop', 1, 'Admin'),
(2, 'neenu123', '123', 9, 'Employee'),
(3, 'angel', 'angel', 10, 'Admin'),
(7, 'antony', 'antony', 14, 'Employee'),
(5, 'adhi', 'adhi', 12, 'Employee');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
