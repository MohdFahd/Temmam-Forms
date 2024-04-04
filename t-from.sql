-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 04, 2024 at 02:30 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `t-from`
--

-- --------------------------------------------------------

--
-- Table structure for table `forms`
--

CREATE TABLE `forms` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` mediumtext NOT NULL,
  `end_at` varchar(10) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `forms`
--

INSERT INTO `forms` (`id`, `title`, `description`, `end_at`, `created_at`) VALUES
(47, 'nrw', '', '2020-05-06', '2024-04-03 13:03:20'),
(48, 'sdaasdsadasdsdsad', '', '2024-04-1', '2024-04-03 13:05:17'),
(49, 'Untitled form', '', '2024-04-03', '2024-04-03 13:14:58'),
(50, 'Untitled form', '', '2024-04-12', '2024-04-03 13:15:15'),
(51, 'New Form', 'nothing to say', '2024-04-19', '2024-04-04 09:58:22'),
(52, 'New', 'sad', '', '2024-04-04 10:10:44'),
(53, 'Title', 'sasad', '', '2024-04-04 10:51:12'),
(54, 'Untitled form', '', '', '2024-04-04 10:53:31'),
(55, 'Simple Form', 'Test', '', '2024-04-04 11:54:43');

-- --------------------------------------------------------

--
-- Table structure for table `options`
--

CREATE TABLE `options` (
  `id` int(11) NOT NULL,
  `option_text` varchar(255) NOT NULL,
  `question_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `options`
--

INSERT INTO `options` (`id`, `option_text`, `question_id`, `created_at`) VALUES
(122, 'Optiondsad', 66, '2024-04-03 13:03:20'),
(123, 'Option', 67, '2024-04-03 13:05:17'),
(124, 'Option', 68, '2024-04-03 13:15:15'),
(125, 'Father', 69, '2024-04-04 09:58:22'),
(126, 'Soccer', 70, '2024-04-04 09:58:22'),
(127, 'Option', 71, '2024-04-04 09:58:22'),
(128, 'Mother', 69, '2024-04-04 09:58:22'),
(129, 'Brother', 69, '2024-04-04 09:58:22'),
(130, 'Tennis', 70, '2024-04-04 09:58:22'),
(131, 'BsketBall', 70, '2024-04-04 09:58:22'),
(132, 'Optionasd', 73, '2024-04-04 10:10:44'),
(133, 'sadsa', 73, '2024-04-04 10:10:44'),
(134, 'Optiondsa', 72, '2024-04-04 10:10:44'),
(135, 'Option', 74, '2024-04-04 10:10:44'),
(136, 'sada', 73, '2024-04-04 10:10:44'),
(137, 'sadsad', 72, '2024-04-04 10:10:44'),
(138, 'dsad', 72, '2024-04-04 10:10:44'),
(139, 'father', 75, '2024-04-04 10:51:12'),
(140, 'mother', 75, '2024-04-04 10:51:12'),
(141, 'Option', 76, '2024-04-04 10:51:12'),
(142, 'Optionsadads', 77, '2024-04-04 10:51:12'),
(143, 'asd', 77, '2024-04-04 10:51:12'),
(144, 'sd', 77, '2024-04-04 10:51:12'),
(145, 'Option', 78, '2024-04-04 10:53:31'),
(146, 'Brother', 79, '2024-04-04 11:54:43'),
(147, 'Mother', 79, '2024-04-04 11:54:43'),
(148, 'Father', 79, '2024-04-04 11:54:43'),
(149, 'Option', 80, '2024-04-04 11:54:43'),
(150, 'Soccer', 81, '2024-04-04 11:54:43'),
(151, 'Tennis', 81, '2024-04-04 11:54:43'),
(152, 'BasketBall', 81, '2024-04-04 11:54:43');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT 'false',
  `form_id` int(11) NOT NULL,
  `addOthers` tinyint(1) NOT NULL DEFAULT 0,
  `required` tinyint(1) NOT NULL DEFAULT 0,
  `type` varchar(255) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `require` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `name`, `form_id`, `addOthers`, `required`, `type`, `create_at`, `require`) VALUES
(66, 'Untitled Questionsad', 47, 0, 0, 'Multiple choice', '2024-04-03 13:03:20', 0),
(67, 'Untitled Questionsda', 48, 0, 0, 'Multiple choice', '2024-04-03 13:05:17', 0),
(68, 'Untitled Questionsad', 50, 0, 0, 'Multiple choice', '2024-04-03 13:15:15', 0),
(69, 'How your role model ??', 51, 1, 0, 'Multiple choice', '2024-04-04 09:58:22', 0),
(70, 'How do you like to paly ?', 51, 0, 0, 'CheckBoxes', '2024-04-04 09:58:22', 0),
(71, 'Tell us about You ?', 51, 0, 0, 'Paragraph', '2024-04-04 09:58:22', 0),
(72, 'dasd', 52, 1, 0, 'CheckBoxes', '2024-04-04 10:10:44', 0),
(73, 'asddasd', 52, 0, 0, 'Multiple choice', '2024-04-04 10:10:44', 0),
(74, 'dsadsadsa', 52, 0, 0, 'Paragraph', '2024-04-04 10:10:44', 0),
(75, 'how is your role model?', 53, 1, 0, 'Multiple choice', '2024-04-04 10:51:12', 0),
(76, 'tell us about you?', 53, 0, 0, 'Paragraph', '2024-04-04 10:51:12', 0),
(77, 'Untitled Question', 53, 0, 0, 'CheckBoxes', '2024-04-04 10:51:12', 0),
(78, 'Untitled Question', 54, 1, 0, 'CheckBoxes', '2024-04-04 10:53:31', 0),
(79, 'How is your Role Model?', 55, 1, 0, 'Multiple choice', '2024-04-04 11:54:43', 0),
(80, 'Tell us about you ?', 55, 0, 0, 'Paragraph', '2024-04-04 11:54:43', 0),
(81, 'What do you prefer to play ?', 55, 0, 0, 'CheckBoxes', '2024-04-04 11:54:43', 0);

-- --------------------------------------------------------

--
-- Table structure for table `response`
--

CREATE TABLE `response` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `from_id` int(11) NOT NULL,
  `qes_id` int(11) NOT NULL,
  `answer` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `response`
--

INSERT INTO `response` (`id`, `user_id`, `from_id`, `qes_id`, `answer`, `created_at`) VALUES
(133, 2, 50, 68, 'Option', '2024-04-04 09:49:16'),
(134, 2, 51, 70, 'Soccer', '2024-04-04 09:58:45'),
(135, 2, 51, 69, 'Father', '2024-04-04 09:58:45'),
(136, 2, 51, 70, 'Tennis', '2024-04-04 09:58:45'),
(137, 2, 51, 71, 'nothing ', '2024-04-04 09:58:45'),
(138, 2, 51, 69, 'Brother', '2024-04-04 10:00:01'),
(139, 2, 51, 70, 'Soccer', '2024-04-04 10:00:01'),
(140, 2, 51, 71, 'asdsadasd', '2024-04-04 10:00:01'),
(141, 1, 51, 69, 'Father', '2024-04-04 10:09:43'),
(142, 1, 51, 70, 'Tennis', '2024-04-04 10:09:43'),
(143, 1, 51, 70, 'Soccer', '2024-04-04 10:09:43'),
(144, 1, 51, 71, 'sadsdad', '2024-04-04 10:09:43'),
(145, 1, 52, 72, 'Optiondsa', '2024-04-04 10:10:56'),
(146, 1, 52, 74, 'sadsad', '2024-04-04 10:10:56'),
(147, 1, 52, 73, 'Optionasd', '2024-04-04 10:10:56'),
(148, 2, 52, 72, 'Optiondsa', '2024-04-04 10:11:38'),
(149, 2, 52, 72, 'sadsad', '2024-04-04 10:11:38'),
(150, 2, 52, 74, 'dsad', '2024-04-04 10:11:38'),
(151, 2, 52, 73, 'sadsa', '2024-04-04 10:11:38'),
(152, 2, 52, 72, 'sadsad', '2024-04-04 10:17:51'),
(153, 2, 52, 73, 'Optionasd', '2024-04-04 10:17:51'),
(154, 2, 52, 74, '123we', '2024-04-04 10:17:51'),
(155, 2, 52, 74, 'sda', '2024-04-04 10:25:18'),
(156, 2, 52, 72, 'Optiondsa', '2024-04-04 10:25:18'),
(157, 2, 52, 73, 'Optionasd', '2024-04-04 10:25:18'),
(158, 1, 52, 72, 'sadsad', '2024-04-04 10:25:46'),
(159, 1, 52, 73, 'Optionasd', '2024-04-04 10:25:46'),
(160, 1, 52, 74, 'sad', '2024-04-04 10:25:46'),
(161, 2, 53, 75, 'father', '2024-04-04 10:52:27'),
(162, 2, 53, 76, 'asdasd', '2024-04-04 10:52:27'),
(163, 2, 53, 77, 'Optionsadads', '2024-04-04 10:52:27'),
(164, 1, 55, 79, 'Brother', '2024-04-04 12:17:19'),
(165, 1, 55, 80, 'Im Mohammed Al-Sulami', '2024-04-04 12:17:19'),
(166, 1, 55, 81, 'Soccer', '2024-04-04 12:17:19'),
(167, 1, 55, 81, 'Tennis', '2024-04-04 12:17:19'),
(168, 2, 55, 79, 'Father', '2024-04-04 12:18:33'),
(169, 2, 55, 80, 'Im A user', '2024-04-04 12:18:33'),
(170, 2, 55, 81, 'BasketBall', '2024-04-04 12:18:33'),
(171, 2, 55, 81, 'Tennis', '2024-04-04 12:18:33');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'mohammed', 'admin@gamil.com', '123', 'admin', '2024-03-23 13:51:52'),
(2, 'user', 'user@gamil.com', '123', 'user', '2024-04-03 08:35:41'),
(3, 'Sam', 'Sam@gmail.com', 'sam', 'user', '2024-04-03 08:35:41');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `forms`
--
ALTER TABLE `forms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `form_id` (`form_id`);

--
-- Indexes for table `response`
--
ALTER TABLE `response`
  ADD PRIMARY KEY (`id`),
  ADD KEY `qes_id` (`qes_id`),
  ADD KEY `from_id` (`from_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `forms`
--
ALTER TABLE `forms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `options`
--
ALTER TABLE `options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=153;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `response`
--
ALTER TABLE `response`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=172;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `options`
--
ALTER TABLE `options`
  ADD CONSTRAINT `options_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`form_id`) REFERENCES `forms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `response`
--
ALTER TABLE `response`
  ADD CONSTRAINT `response_ibfk_1` FOREIGN KEY (`qes_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `response_ibfk_2` FOREIGN KEY (`from_id`) REFERENCES `forms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `response_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
