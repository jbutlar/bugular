/*CREATE DATABASE `bugular` !40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' not needed for prod*/;
CREATE TABLE `bugs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descrip` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `bug_id_UNIQUE` (`id`)
);

INSERT INTO bugs (descrip) VALUES ('this is the first bug');
INSERT INTO bugs (descrip) VALUES ('what do you know, a second bug');

CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(30) NOT NULL,
  `first_name`  varchar(75) NOT NULL,
  `last_name`  varchar(75) NOT NULL,
  `email`  varchar(100) NOT NULL,
  `pass_hash` varchar(20) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`)
);