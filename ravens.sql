CREATE TABLE `location`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `meisters`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `location_id` int NOT NULL,
  `name` text NOT NULL,
  `location_pass` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `messages`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `raven_id` int NOT NULL,
  `location_id` int NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `ravens`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `owner` int NOT NULL,
  `location_id` int NOT NULL,
  PRIMARY KEY (`id`)
);

ALTER TABLE `meisters` ADD FOREIGN KEY (`location_id`) REFERENCES `location` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `meisters` ADD CONSTRAINT `pass` FOREIGN KEY (`location_pass`) REFERENCES `location` (`pass`) ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE `messages` ADD CONSTRAINT `raven` FOREIGN KEY (`raven_id`) REFERENCES `ravens` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `messages` ADD CONSTRAINT `loction` FOREIGN KEY (`location_id`) REFERENCES `location` (`id`);
ALTER TABLE `ravens` MODIFY COLUMN ``  NULL AFTER `location_id`;
ALTER TABLE `ravens` ADD CONSTRAINT `owner` FOREIGN KEY (`owner`) REFERENCES `meisters` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `ravens` ADD CONSTRAINT `location` FOREIGN KEY (`location_id`) REFERENCES `location` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

