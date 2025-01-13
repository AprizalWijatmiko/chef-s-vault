-- MySQL dump 10.13  Distrib 8.0.39, for Win64 (x86_64)
--
-- Host: localhost    Database: recipe_db
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `recipes`
--

DROP TABLE IF EXISTS `recipes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `cook_time` varchar(255) DEFAULT NULL,
  `servings` int DEFAULT NULL,
  `cuisine` varchar(100) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ingredients` text NOT NULL,
  `steps` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipes`
--

LOCK TABLES `recipes` WRITE;
/*!40000 ALTER TABLE `recipes` DISABLE KEYS */;
INSERT INTO `recipes` VALUES (63,'1','1','/uploads/29a13c1c331c9a1224a741e9ea15f1fe','1',1,NULL,NULL,'2024-10-16 17:16:16','2024-10-16 17:16:16','[\"1\",\"2\",\"1\"]','[\"1\",\"3\",\"2\"]'),(64,'1','1','/uploads/869dcfcc1b627d0656c816f6fe4cb6c4','1',1,NULL,NULL,'2024-10-16 17:20:06','2024-10-16 17:20:06','[\"1\",\"2\",\"3\",\"4\"]','[\"1\",\"2\",\"3\",\"4\"]'),(65,'ya','enak','/uploads/0c458d514edb8101ab3640cbd377b347','1 jam 30 menit',1,NULL,NULL,'2024-10-16 17:34:35','2024-10-16 17:34:35','[\"1\",\"3\",\"4\",\"5\"]','[\"1\",\"3\",\"4\",\"5\"]'),(66,'test desctiption','xedtcfyvgvuvvvvbbbvvsdhbaisobdhSBDOIYAsdoabsdouiasbdioCBASYDNCcayudsbuOSHBDOvuaSVDYUvasodyasvdoYAISVDOaiysvdayidvaSBIDOAIBYSVDAbsdaSBDAUsdbaIYSVDAydaSDNUiasICNqowdhoqnwiudhOCQIsudhnIQUSODIuasdibduoiqVDYIWVDQiubdASJKDBoiuavdsdyqODWqdwbqwiUDBqwdiwqdw','/uploads/4c85921aea57970a6922d66d492b20e8','1 jam 30 menit',2,NULL,NULL,'2024-10-17 06:38:38','2024-10-17 06:38:38','[\"1\",\"2\",\"3\",\"4\"]','[\"2\",\"3\",\"4\",\"5\"]'),(67,'2','2','/uploads/45b9c31aeae16009dca76389d3e8fc19','2 jam 30 menit',12,NULL,NULL,'2024-10-17 13:45:39','2024-10-17 13:45:39','[\"3\",\"4\",\"5\"]','[\"1\",\"3\",\"4\",\"5\"]'),(68,'1','1','/uploads/304406a57daa0b1850cae6407d1f5b76','1',1,NULL,NULL,'2024-10-17 13:59:24','2024-10-17 13:59:24','[\"1\"]','[\"1\"]'),(69,'1','1','/uploads/404463a1944d284532bd35ae1fd0ed0b','1',1,NULL,NULL,'2024-10-18 07:03:40','2024-10-18 07:03:40','[\"1\"]','[\"1\"]'),(70,'1','1','/uploads/0cd6da8d083b85fa8dc66b64562c325f','1',1,NULL,NULL,'2024-10-18 07:03:55','2024-10-18 07:03:55','[\"1\"]','[\"1\"]'),(71,'1','1','/uploads/a531294dd783ce49686afbc4096e58ec','1',1,NULL,NULL,'2024-10-18 07:04:07','2024-10-18 07:04:07','[\"1\"]','[\"1\"]'),(72,'1','1','/uploads/7684b7a961783d5b19c14c675a0e4739','1',1,NULL,NULL,'2024-10-18 07:04:22','2024-10-18 07:04:22','[\"1\"]','[\"1\"]');
/*!40000 ALTER TABLE `recipes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-26  7:59:43
