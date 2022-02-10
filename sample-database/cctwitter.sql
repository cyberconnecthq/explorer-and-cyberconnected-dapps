-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.6.5-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for twitter
CREATE DATABASE IF NOT EXISTS `twitter` /*!40100 DEFAULT CHARACTER SET utf8mb3 */;
USE `twitter`;

-- Dumping structure for table twitter.bookmarks
CREATE TABLE IF NOT EXISTS `bookmarks` (
  `id` char(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `uid` varchar(255) NOT NULL,
  `tweetId` char(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`),
  KEY `tweetId` (`tweetId`),
  CONSTRAINT `bookmarks_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bookmarks_ibfk_2` FOREIGN KEY (`tweetId`) REFERENCES `tweets` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table twitter.bookmarks: ~7 rows (approximately)
/*!40000 ALTER TABLE `bookmarks` DISABLE KEYS */;
INSERT IGNORE INTO `bookmarks` (`id`, `uid`, `tweetId`, `createdAt`, `updatedAt`) VALUES
	('0d867852-2f34-401c-af7a-205211a1d474', 'AED0BCCB9293B0F70318FF5F0AE4C4430651AE43', '7d8282e6-ad54-4768-9042-6badce0eef68', '2022-02-05 12:38:48', '2022-02-05 12:38:48'),
	('3628698a-077c-4657-a9ad-c3ac0c18a153', 'FB9ABCAAACC5049F43746A41B8BC8C611514E1FE', '9078a8ac-f459-46d1-8138-7f9305e1994c', '2022-02-05 07:54:17', '2022-02-05 07:54:17'),
	('4f26b597-b02d-48d0-b958-7c1c20fd5281', 'FB9ABCAAACC5049F43746A41B8BC8C611514E1FE', 'cf4d0463-741e-4dd7-8b10-48da5eaa8421', '2022-02-05 22:10:27', '2022-02-05 22:10:27'),
	('989d6136-684a-40ab-98c9-95f16ade9220', '17C30354178C25CF24552AEF352A1D6187C2E656', 'a89fc021-cbf0-47d7-aa9e-3f062fefefac', '2022-02-05 19:54:44', '2022-02-05 19:54:44'),
	('cdc4471a-66cf-4f27-aab1-e4929922f33e', 'FB9ABCAAACC5049F43746A41B8BC8C611514E1FE', '558ed639-14ec-443a-aa2f-a1f6fba0689f', '2022-02-05 22:10:28', '2022-02-05 22:10:28'),
	('d39fec10-013d-4f20-80cc-c50e80728a3f', 'FB9ABCAAACC5049F43746A41B8BC8C611514E1FE', '7d8b08fa-524e-449c-8cad-b3f5091f963f', '2022-02-05 22:10:30', '2022-02-05 22:10:30'),
	('f9933607-e756-4c57-ac2f-1367c07a2d24', 'FB9ABCAAACC5049F43746A41B8BC8C611514E1FE', 'a92ccd74-7291-43bb-8bc5-7cc5f7a8436d', '2022-02-05 22:10:26', '2022-02-05 22:10:26');
/*!40000 ALTER TABLE `bookmarks` ENABLE KEYS */;

-- Dumping structure for table twitter.comments
CREATE TABLE IF NOT EXISTS `comments` (
  `id` char(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `uid` varchar(255) NOT NULL,
  `tweetId` char(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `text` varchar(255) NOT NULL,
  `media` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table twitter.comments: ~4 rows (approximately)
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT IGNORE INTO `comments` (`id`, `uid`, `tweetId`, `text`, `media`, `createdAt`, `updatedAt`) VALUES
	('3dc4da5d-6cab-4da8-b33d-60e09da07b4f', 'AED0BCCB9293B0F70318FF5F0AE4C4430651AE43', '7d8282e6-ad54-4768-9042-6badce0eef68', 'tyitkryjr', NULL, '2022-02-05 12:39:17', '2022-02-05 12:39:17'),
	('84f1ad79-9713-40d0-a418-32cbf2e5b470', 'AED0BCCB9293B0F70318FF5F0AE4C4430651AE43', '7d8282e6-ad54-4768-9042-6badce0eef68', 'ghdfgsdf', NULL, '2022-02-05 12:39:04', '2022-02-05 12:39:04'),
	('aeed736f-0df6-4326-9e6f-0c67df3ea81a', 'AED0BCCB9293B0F70318FF5F0AE4C4430651AE43', '8e98fa9a-ecae-4534-8ecd-dee743563360', 'f', 'https://res.cloudinary.com/strictbeautysoft/image/upload/v1644065718/zz59rhb6ksc4l7tqjbs1.png', '2022-02-05 12:52:48', '2022-02-05 12:52:48'),
	('b87078e6-1b09-4a44-b8a7-e231ecd07031', 'AED0BCCB9293B0F70318FF5F0AE4C4430651AE43', '8e98fa9a-ecae-4534-8ecd-dee743563360', 'tyhj', NULL, '2022-02-05 12:52:36', '2022-02-05 12:52:36');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;

-- Dumping structure for table twitter.followers
CREATE TABLE IF NOT EXISTS `followers` (
  `id` char(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `followed` varchar(255) NOT NULL,
  `follower` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `followed` (`followed`),
  KEY `follower` (`follower`),
  CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`followed`) REFERENCES `users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`follower`) REFERENCES `users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table twitter.followers: ~9 rows (approximately)
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
INSERT IGNORE INTO `followers` (`id`, `followed`, `follower`, `createdAt`, `updatedAt`) VALUES
	('014087ee-82b8-425d-940c-bebce6b40560', '1B2EF9D5DB72EA1103FC24EEDD2226477409383A', 'FB9ABCAAACC5049F43746A41B8BC8C611514E1FE', '2022-02-05 21:37:59', '2022-02-05 21:37:59'),
	('09a1e91e-d9f8-4289-bab6-ef2f31e6bef3', '4124CF34F56FA151E05C91ACE550ADA0DD5AABD7', 'FB9ABCAAACC5049F43746A41B8BC8C611514E1FE', '2022-02-05 21:09:20', '2022-02-05 21:09:20'),
	('273f7096-0b9d-474b-889f-f7a52085d251', '1E25653FF9852119360C9F8D796969FAFC048929', 'FB9ABCAAACC5049F43746A41B8BC8C611514E1FE', '2022-02-05 22:07:46', '2022-02-05 22:07:46'),
	('896a86e6-6369-4b89-8507-15d3228ba7fb', '11E51D7638FAD7F33C5878C27CE6A13BF79EB300', 'FB9ABCAAACC5049F43746A41B8BC8C611514E1FE', '2022-02-07 14:50:55', '2022-02-07 14:50:55'),
	('b625bb1e-d270-48b0-988e-31ec4de1fc85', '33E536E1B620F21A6DC02E00A0F6EF7DF778A547', 'FB9ABCAAACC5049F43746A41B8BC8C611514E1FE', '2022-02-05 22:07:09', '2022-02-05 22:07:09'),
	('b654600f-2440-45bc-b083-cbadd14e9293', '86E6034C0EB6EC8D323C709C345B36219F3D3261', 'FB9ABCAAACC5049F43746A41B8BC8C611514E1FE', '2022-02-05 22:02:49', '2022-02-05 22:02:49'),
	('b8f60ead-e8a4-47b8-9ff6-937624279a94', 'FB9ABCAAACC5049F43746A41B8BC8C611514E1FE', '32A0F7C5ECA9EFD1C695F0E82FABB230F02E97AF', '2022-02-05 10:58:42', '2022-02-05 10:58:42'),
	('e64720f9-dab1-4c64-bd1c-8c15047dcfce', 'AED0BCCB9293B0F70318FF5F0AE4C4430651AE43', '32A0F7C5ECA9EFD1C695F0E82FABB230F02E97AF', '2022-02-05 10:58:37', '2022-02-05 10:58:37'),
	('ebddc5c3-4621-412e-9e6f-9b26cfa08186', '31A50145D7FD1141EC4F4D90F31C6622C0775527', 'FB9ABCAAACC5049F43746A41B8BC8C611514E1FE', '2022-02-05 22:05:18', '2022-02-05 22:05:18'),
	('f5f89eb5-a05b-46dd-8c6c-53942c0bdd6f', '32A0F7C5ECA9EFD1C695F0E82FABB230F02E97AF', 'AED0BCCB9293B0F70318FF5F0AE4C4430651AE43', '2022-02-05 11:56:53', '2022-02-05 11:56:53');
/*!40000 ALTER TABLE `followers` ENABLE KEYS */;

-- Dumping structure for table twitter.likes
CREATE TABLE IF NOT EXISTS `likes` (
  `id` char(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `tweetId` char(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `uid` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tweetId` (`tweetId`),
  KEY `uid` (`uid`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`tweetId`) REFERENCES `tweets` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table twitter.likes: ~3 rows (approximately)
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT IGNORE INTO `likes` (`id`, `tweetId`, `uid`, `createdAt`, `updatedAt`) VALUES
	('3fab4403-c69c-448e-a634-0429bc259198', 'a89fc021-cbf0-47d7-aa9e-3f062fefefac', '17C30354178C25CF24552AEF352A1D6187C2E656', '2022-02-05 19:54:29', '2022-02-05 19:54:29'),
	('6391f788-6df9-4055-95b2-2434cab0ff8d', '9078a8ac-f459-46d1-8138-7f9305e1994c', 'FB9ABCAAACC5049F43746A41B8BC8C611514E1FE', '2022-02-05 22:10:50', '2022-02-05 22:10:50'),
	('70f7112b-04f3-476b-ab5f-39b2f99c4ff0', 'eac677bb-d8a4-4b9a-99f1-a400c4085fc6', 'FB9ABCAAACC5049F43746A41B8BC8C611514E1FE', '2022-02-05 22:09:27', '2022-02-05 22:09:27'),
	('b82e460f-0f32-475c-b97c-57fbdba8e5b0', '7d8282e6-ad54-4768-9042-6badce0eef68', 'AED0BCCB9293B0F70318FF5F0AE4C4430651AE43', '2022-02-05 12:38:20', '2022-02-05 12:38:20');
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;

-- Dumping structure for table twitter.retweets
CREATE TABLE IF NOT EXISTS `retweets` (
  `id` char(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `uid` varchar(255) NOT NULL,
  `tweetId` char(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`),
  KEY `tweetId` (`tweetId`),
  CONSTRAINT `retweets_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `retweets_ibfk_2` FOREIGN KEY (`tweetId`) REFERENCES `tweets` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table twitter.retweets: ~2 rows (approximately)
/*!40000 ALTER TABLE `retweets` DISABLE KEYS */;
INSERT IGNORE INTO `retweets` (`id`, `uid`, `tweetId`, `createdAt`, `updatedAt`) VALUES
	('2580f1ca-f557-45f9-9ba5-bc9001519f90', '17C30354178C25CF24552AEF352A1D6187C2E656', 'a89fc021-cbf0-47d7-aa9e-3f062fefefac', '2022-02-05 19:54:53', '2022-02-05 19:54:53');
/*!40000 ALTER TABLE `retweets` ENABLE KEYS */;

-- Dumping structure for table twitter.tweets
CREATE TABLE IF NOT EXISTS `tweets` (
  `id` char(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `uid` varchar(255) NOT NULL,
  `text` varchar(255) NOT NULL,
  `media` varchar(255) DEFAULT NULL,
  `commentsCount` int(11) DEFAULT 0,
  `retweetsCount` int(11) DEFAULT 0,
  `likesCount` int(11) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`),
  CONSTRAINT `tweets_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table twitter.tweets: ~16 rows (approximately)
/*!40000 ALTER TABLE `tweets` DISABLE KEYS */;
INSERT IGNORE INTO `tweets` (`id`, `uid`, `text`, `media`, `commentsCount`, `retweetsCount`, `likesCount`, `createdAt`, `updatedAt`) VALUES
	('19d327ca-b1da-4e6b-934a-1f4061d62f79', 'AED0BCCB9293B0F70318FF5F0AE4C4430651AE43', 'xcvbxcvb', NULL, 0, 0, 0, '2022-02-05 10:44:58', '2022-02-05 10:44:58'),
	('1cbe6644-0788-42a9-818a-d6957f7c50bf', '32A0F7C5ECA9EFD1C695F0E82FABB230F02E97AF', 'dfghdfgh', NULL, 0, 0, 0, '2022-02-05 10:59:38', '2022-02-05 10:59:38'),
	('4cf2e753-ff56-44d3-a783-558039f67ebc', 'AED0BCCB9293B0F70318FF5F0AE4C4430651AE43', 'asdasvczxvnjd', NULL, 0, 0, 0, '2022-02-05 11:57:12', '2022-02-05 11:57:12'),
	('509b786f-a802-47d2-9628-2f3f30721e9c', 'AED0BCCB9293B0F70318FF5F0AE4C4430651AE43', 'hjk,.hjm,g', NULL, 0, 0, 0, '2022-02-05 11:57:14', '2022-02-05 11:57:14'),
	('558ed639-14ec-443a-aa2f-a1f6fba0689f', '32A0F7C5ECA9EFD1C695F0E82FABB230F02E97AF', 'dfghdfgh', NULL, 0, 0, 0, '2022-02-05 10:59:42', '2022-02-05 10:59:42'),
	('76044fef-3428-49eb-836d-1f8684c94cc4', '32A0F7C5ECA9EFD1C695F0E82FABB230F02E97AF', 'zcfvgsdfv', NULL, 0, 0, 0, '2022-02-05 10:58:31', '2022-02-05 10:58:31'),
	('7d8282e6-ad54-4768-9042-6badce0eef68', 'AED0BCCB9293B0F70318FF5F0AE4C4430651AE43', 'vbnmgtyjkfyjhm', NULL, 2, 0, 1, '2022-02-05 11:57:17', '2022-02-05 12:39:17'),
	('7d8b08fa-524e-449c-8cad-b3f5091f963f', '32A0F7C5ECA9EFD1C695F0E82FABB230F02E97AF', 'dfghdfgh', NULL, 0, 0, 0, '2022-02-05 10:59:40', '2022-02-05 10:59:40'),
	('84b72d28-8567-4832-8b3f-74898890b681', 'AED0BCCB9293B0F70318FF5F0AE4C4430651AE43', 'zxvzsd', NULL, 0, 0, 0, '2022-02-05 11:57:09', '2022-02-05 11:57:09'),
	('8e98fa9a-ecae-4534-8ecd-dee743563360', 'AED0BCCB9293B0F70318FF5F0AE4C4430651AE43', 'f', 'https://res.cloudinary.com/strictbeautysoft/image/upload/v1644065674/hicpfdj6ioifcer00dna.png', 2, 0, 0, '2022-02-05 12:52:04', '2022-02-05 12:52:49'),
	('9078a8ac-f459-46d1-8138-7f9305e1994c', 'FB9ABCAAACC5049F43746A41B8BC8C611514E1FE', 'dfghdfgh', NULL, 0, 0, 1, '2022-02-05 07:27:43', '2022-02-05 22:10:52'),
	('a89fc021-cbf0-47d7-aa9e-3f062fefefac', '17C30354178C25CF24552AEF352A1D6187C2E656', 'sdfgsdfg', NULL, 0, 1, 1, '2022-02-05 19:54:10', '2022-02-05 19:54:53'),
	('a92ccd74-7291-43bb-8bc5-7cc5f7a8436d', '32A0F7C5ECA9EFD1C695F0E82FABB230F02E97AF', 'tyukrdhewwfbxsdfgher63e45345y34ytgwsefgsdfgsdfgsfgs', NULL, 0, 0, 0, '2022-02-05 10:59:51', '2022-02-05 10:59:51'),
	('c2887f17-e021-443b-a540-7090c58de076', '32A0F7C5ECA9EFD1C695F0E82FABB230F02E97AF', 'fghjfghj', NULL, 0, 0, 0, '2022-02-05 10:59:34', '2022-02-05 10:59:34'),
	('cf4d0463-741e-4dd7-8b10-48da5eaa8421', '32A0F7C5ECA9EFD1C695F0E82FABB230F02E97AF', 'dffghdfghsdgbsdvbzsdb', NULL, 0, 0, 0, '2022-02-05 10:59:45', '2022-02-05 10:59:45'),
	('eac677bb-d8a4-4b9a-99f1-a400c4085fc6', 'FB9ABCAAACC5049F43746A41B8BC8C611514E1FE', 'dfghdgh', NULL, 0, 0, 1, '2022-02-05 07:27:37', '2022-02-05 22:09:27');
/*!40000 ALTER TABLE `tweets` ENABLE KEYS */;

-- Dumping structure for table twitter.users
CREATE TABLE IF NOT EXISTS `users` (
  `uid` varchar(255) NOT NULL,
  `domain` varchar(255) NOT NULL,
  `nonce` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT '/images/avatar/default.png',
  `cover` varchar(255) DEFAULT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `birth` date DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table twitter.users: ~18 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT IGNORE INTO `users` (`uid`, `domain`, `nonce`, `email`, `avatar`, `cover`, `bio`, `location`, `birth`, `createdAt`, `updatedAt`) VALUES
	('020CA66C30BEC2C4FE3861A94E4DB4A498A35872', 'machibigbrother.eth', 786, NULL, '/images/avatar/default.png', NULL, NULL, NULL, NULL, '2022-02-05 20:54:52', '2022-02-05 20:54:52'),
	('11E51D7638FAD7F33C5878C27CE6A13BF79EB300', 'ball.action.cctw', 5363, NULL, '/images/avatar/default.png', NULL, NULL, NULL, NULL, '2022-02-05 19:00:36', '2022-02-05 19:00:36'),
	('17C30354178C25CF24552AEF352A1D6187C2E656', 'blind.floor.cctw', 4871, NULL, '/images/avatar/default.png', NULL, NULL, NULL, NULL, '2022-02-05 19:53:57', '2022-02-05 19:54:00'),
	('1B2EF9D5DB72EA1103FC24EEDD2226477409383A', 'brass.twelve.cctw', 7352, NULL, '/images/avatar/default.png', NULL, NULL, NULL, NULL, '2022-02-05 21:06:51', '2022-02-05 21:06:51'),
	('1E25653FF9852119360C9F8D796969FAFC048929', 'ivyli.eth', 8547, NULL, 'https://lh3.googleusercontent.com/MgnHOIOyPhyWkVmFrFXJ3Sb88gvHH-K4CWadkEIQdDNF7K_93-gwiloxcKWSQJ0HuYtW2qSu79als_PRiDr4noq5rnIRoSqcoA4weww=s128', NULL, NULL, NULL, NULL, '2022-02-05 22:07:46', '2022-02-05 22:07:46'),
	('31A50145D7FD1141EC4F4D90F31C6622C0775527', 'coyote.orphan.cctw', 7886, NULL, '/images/avatar/default.png', NULL, NULL, NULL, NULL, '2022-02-05 18:52:24', '2022-02-05 18:52:45'),
	('32A0F7C5ECA9EFD1C695F0E82FABB230F02E97AF', 'crawl.royal.cctw', 3418, NULL, '/images/avatar/default.png', NULL, NULL, NULL, NULL, '2022-02-05 10:53:21', '2022-02-07 15:01:34'),
	('33E536E1B620F21A6DC02E00A0F6EF7DF778A547', 'dilan.eth', 1622, NULL, '/images/avatar/default.png', NULL, NULL, NULL, NULL, '2022-02-05 21:12:04', '2022-02-05 21:12:04'),
	('4124CF34F56FA151E05C91ACE550ADA0DD5AABD7', 'izgnzlz.eth', 1493, NULL, '/images/avatar/default.png', NULL, NULL, NULL, NULL, '2022-02-05 21:09:20', '2022-02-05 21:09:20'),
	('78405AFB7A6E124BCD52AA07E1E31C7F1812521D', 'msv.eth', 9563, NULL, '/images/avatar/default.png', NULL, NULL, NULL, NULL, '2022-02-05 21:06:05', '2022-02-05 21:06:05'),
	('86E6034C0EB6EC8D323C709C345B36219F3D3261', 'gsandly.eth', 4181, NULL, 'https://lh3.googleusercontent.com/XkXORcOUXFY3-_e5SHMF3N7JrgzPEfyIObmXaduaFZRGCa9VOcYCy-LkWRzgEfdL83OKk_f7_ImfnHr_jQvgVcnwPvxf2Hi7kLrUtnM=s128', NULL, NULL, NULL, NULL, '2022-02-05 21:12:56', '2022-02-05 21:12:56'),
	('8864E01E69FCB70DAB85908486B6FC378C527900', 'mask.acoustic.cctw', 5016, NULL, '/images/avatar/default.png', NULL, NULL, NULL, NULL, '2022-02-05 19:43:02', '2022-02-05 19:53:26'),
	('A9B36DA931A19A7619B6BD5835A3765DCCD7C298', 'bmer19.eth', 963, NULL, 'https://lh3.googleusercontent.com/ZKHGKoG6QjRBoR97gDN4vav3ABc2HXBWFc2jA02fBARUfJZ9JGWUr2CuYccCSVOpSmc1Zvk85RoH0iWYNxiC_RLQe469-gqhpNA1Qw=s128', NULL, NULL, NULL, NULL, '2022-02-05 21:09:30', '2022-02-05 21:09:30'),
	('AED0BCCB9293B0F70318FF5F0AE4C4430651AE43', 'put.asthma.cctw', 1121, NULL, '/images/avatar/default.png', NULL, NULL, NULL, NULL, '2022-02-05 10:40:49', '2022-02-05 17:36:48'),
	('B176C54523AD337E777F2DEBA9A44CB9E16901E3', 'ramp.modify.cctw', 6389, NULL, '/images/avatar/default.png', NULL, NULL, NULL, NULL, '2022-02-05 18:57:14', '2022-02-05 18:57:14'),
	('B272A880CA5D104A0E0874D6F1A2B0719DBE82B5', 'stepn.eth', 4858, NULL, 'https://lh3.googleusercontent.com/AfpwQ8AZojJCRO56c1ipYJkMZ4EnZkfaVf6tC3ena1uJfWUL7imXqaEwSsHaQzvfNWzqpI1C1Qrzs0Ol0Tmats_gTPxzSgOdTscfpA=s128', NULL, NULL, NULL, NULL, '2022-02-05 21:12:14', '2022-02-05 21:12:14'),
	('D6DB919FDDDBED1CE19973156B49E51959408E9E', 'guoyu.eth', 5620, NULL, 'https://lh3.googleusercontent.com/g-F89mBwOOHvsCJz4nK-j21qolAjdpxM0bW3ekF77wRnSXOQNVhInl62wCf3wJ-wgzYXQJgY3Ti7fEIr8g8k4UgC4caPpApMAsclQQ=s128', NULL, NULL, NULL, NULL, '2022-02-05 21:12:34', '2022-02-05 21:12:34'),
	('F0D6999725115E3EAD3D927EB3329D63AFAEC09B', 'gmoney.eth', 9570, NULL, '/images/avatar/default.png', NULL, NULL, NULL, NULL, '2022-02-05 21:08:08', '2022-02-05 21:08:08'),
	('FB9ABCAAACC5049F43746A41B8BC8C611514E1FE', 'wine.wing.cctw', 2941, NULL, '/images/avatar/default.png', NULL, NULL, NULL, NULL, '2022-02-05 07:26:23', '2022-02-07 14:37:20');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
