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

-- Dumping structure for table cheekymanager.tasks
CREATE TABLE IF NOT EXISTS `tasks` (
  `task_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `usr_id` int(10) unsigned NOT NULL DEFAULT 0,
  `task_name` varchar(50) NOT NULL DEFAULT '0',
  `task_due` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `task_status` varchar(50) NOT NULL DEFAULT '0',
  `task_priority` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`task_id`),
  KEY `usr_id` (`usr_id`),
  CONSTRAINT `usr_id` FOREIGN KEY (`usr_id`) REFERENCES `users` (`usr_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table cheekymanager.users
CREATE TABLE IF NOT EXISTS `users` (
  `usr_id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`usr_username` VARCHAR(150) NOT NULL DEFAULT '',
	`usr_first_name` VARCHAR(50) NOT NULL DEFAULT '',
	`usr_last_name` VARCHAR(50) NOT NULL DEFAULT '',
	`usr_password` VARCHAR(255) NOT NULL DEFAULT '',
	`usr_salt` VARCHAR(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`usr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Data exporting was unselected.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
