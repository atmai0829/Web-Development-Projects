-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               11.5.2-MariaDB-ubu2404 - mariadb.org binary distribution
-- Server OS:                    debian-linux-gnu
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping data for table cheekymanager.users: ~1 rows (approximately)
INSERT IGNORE INTO `users` (`usr_id`, `usr_username`, `usr_first_name`, `usr_last_name`, `usr_password`, `usr_salt`) VALUES
	(1, 'admin', 'ad', 'min', 'e289219c34f9a32ebc82393f09719b7f34872de95463242b5ffe8bb4b11a5fe7d454f9f5d082c8207c5d69b220ba06624b4bb15ffa05cc7d7d53c43f9e96da6a', '801e87294783281ae49fc8287a0fd86779b27d7972d3e84f0fa0d826d7cb67dfefc');

INSERT IGNORE INTO `tasks` (`usr_id`, `task_name`, `task_due`, `task_status`, `task_priority`) 
VALUES 
  -- (1, 'Task 1', '2023-12-12 00:00:00', 'pending', 'low'),
  -- (1, 'Task 2', '2023-12-12 00:00:00', 'pending', 'low'),
  -- (1, 'Task 3', '2023-12-12 00:00:00', 'pending', 'low'),
  -- (1, 'Task 4', '2023-12-12 00:00:00', 'pending', 'low'),
  -- (1, 'Task 5', '2023-12-12 00:00:00', 'pending', 'low'),
  -- (1, 'Task 6', '2023-12-12 00:00:00', 'pending', 'low'),
  -- (1, 'Task 7', '2023-12-12 00:00:00', 'pending', 'low');

  (1, 'Task 1', '2024-11-01 00:00:00', 'pending', 'low'),
  (1, 'Task 2', '2024-11-11 00:00:00', 'pending', 'low'),
  (1, 'Task 3', '2024-11-12 00:00:00', 'pending', 'low'),
  (1, 'Task 4', '2024-11-16 00:00:00', 'pending', 'low'),
  (1, 'Task 5', '2024-11-20 00:00:00', 'pending', 'low'),
  (1, 'Task 6', '2024-11-22 00:00:00', 'pending', 'low'),
  (1, 'Task 7', '2024-11-28 00:00:00', 'pending', 'low');
  (1, 'Task 7', '2024-11-13 00:00:00', 'pending', 'low');




/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;





