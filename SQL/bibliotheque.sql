-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 09 fév. 2026 à 16:31
-- Version du serveur : 8.4.7
-- Version de PHP : 8.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `bibliotheque`
--

-- --------------------------------------------------------

--
-- Structure de la table `bb__authors`
--

DROP TABLE IF EXISTS `bb__authors`;
CREATE TABLE IF NOT EXISTS `bb__authors` (
  `id_author` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_author`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `bb__books`
--

DROP TABLE IF EXISTS `bb__books`;
CREATE TABLE IF NOT EXISTS `bb__books` (
  `id_book` int NOT NULL AUTO_INCREMENT,
  `title` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `content` text COLLATE utf8mb4_general_ci NOT NULL,
  `publish` int NOT NULL,
  `created_at` int NOT NULL,
  `id_author` int NOT NULL,
  PRIMARY KEY (`id_book`),
  KEY `id_author` (`id_author`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `bb__loans`
--

DROP TABLE IF EXISTS `bb__loans`;
CREATE TABLE IF NOT EXISTS `bb__loans` (
  `id_loan` int NOT NULL AUTO_INCREMENT,
  `id_book` int DEFAULT NULL,
  `id_user` int DEFAULT NULL,
  `date_borrowed` int NOT NULL,
  `date_rendered` int NOT NULL,
  PRIMARY KEY (`id_loan`),
  KEY `id_book` (`id_book`),
  KEY `id_user` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `bb__users`
--

DROP TABLE IF EXISTS `bb__users`;
CREATE TABLE IF NOT EXISTS `bb__users` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `firstname` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `birth` int NOT NULL,
  `created_at` int NOT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `bb__books`
--
ALTER TABLE `bb__books`
  ADD CONSTRAINT `bb__books_ibfk_1` FOREIGN KEY (`id_author`) REFERENCES `bb__authors` (`id_author`);

--
-- Contraintes pour la table `bb__loans`
--
ALTER TABLE `bb__loans`
  ADD CONSTRAINT `bb__loans_ibfk_1` FOREIGN KEY (`id_book`) REFERENCES `bb__books` (`id_book`),
  ADD CONSTRAINT `bb__loans_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `bb__users` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
