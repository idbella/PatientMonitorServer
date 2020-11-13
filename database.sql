CREATE TABLE `user` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255),
  `password` varchar(255),
  `first_name` varchar(255),
  `last_name` varchar(255),
  `phone` varchar(255),
  `creation_date` timestamp,
  `fk_role` int
);

CREATE TABLE `role` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255),
  `permissions` int
);

CREATE TABLE `insurance` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255)
);

CREATE TABLE `patient` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `fk_current_mFile` int,
  `birthday` date,
  `cin` varchar(255),
  `sexe` boolean,
  `address` varchar(255),
  `postalcode` varchar(255),
  `city` varchar(255),
  `country` varchar(255),
  `fk_user` int
);

CREATE TABLE `medical_file` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255),
  `creation_date` timestamp,
  `insurance` text,
  `summary` text,
  `fk_patient` int,
  `fk_doctor` int,
  `fk_insurance_type` int
);

CREATE TABLE `doctor` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `speciality` varchar(255),
  `fk_user` int
);

CREATE TABLE `minor` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `father` varchar(255),
  `mother` varchar(255),
  `fk_patient` int
);

CREATE TABLE `note` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `creation_date` timestamp,
  `notes` text,
  `permissions` int,
  `fk_medical_file` int,
  `fk_user` int
);

CREATE TABLE `attachment` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `creation_date` timestamp,
  `file_name` varchar(255),
  `file_path` varchar(255),
  `title` varchar(255),
  `fk_medical_file` int,
  `fk_user` int,
  `permissions` int
);

CREATE TABLE `questionnaire` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `fk_patient` int
);

CREATE TABLE `question` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `question` text,
  `type` int,
  `fk_questionnaire` int
);

CREATE TABLE `answer` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `answer` text,
  `answer_number` int,
  `fk_question` int
);

CREATE TABLE `predefined_questionnaire` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255),
  `fk_questionnaire` int
);

CREATE TABLE `answer_choice` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `choice` varchar(255),
  `fk_question` int
);

ALTER TABLE `medical_file` ADD FOREIGN KEY (`fk_insurance_type`) REFERENCES `insurance` (`id`) on delete cascade;

ALTER TABLE `doctor` ADD FOREIGN KEY (`fk_user`) REFERENCES `user` (`id`) on delete cascade;

ALTER TABLE `answer_choice` ADD FOREIGN KEY (`fk_question`) REFERENCES `question` (`id`) on delete cascade;

ALTER TABLE `predefined_questionnaire` ADD FOREIGN KEY (`fk_questionnaire`) REFERENCES `questionnaire` (`id`) on delete cascade;

ALTER TABLE `answer` ADD FOREIGN KEY (`fk_question`) REFERENCES `question` (`id`) on delete cascade;

ALTER TABLE `question` ADD FOREIGN KEY (`fk_questionnaire`) REFERENCES `questionnaire` (`id`) on delete cascade;

ALTER TABLE `questionnaire` ADD FOREIGN KEY (`fk_patient`) REFERENCES `patient` (`id`) on delete cascade;

ALTER TABLE `attachment` ADD FOREIGN KEY (`fk_medical_file`) REFERENCES `medical_file` (`id`) on delete cascade;

ALTER TABLE `attachment` ADD FOREIGN KEY (`fk_user`) REFERENCES `user` (`id`) on delete cascade;

ALTER TABLE `note` ADD FOREIGN KEY (`fk_medical_file`) REFERENCES `medical_file` (`id`) on delete cascade;

ALTER TABLE `note` ADD FOREIGN KEY (`fk_user`) REFERENCES `user` (`id`) on delete cascade;

ALTER TABLE `user` ADD FOREIGN KEY (`fk_role`) REFERENCES `role` (`id`) on delete cascade;

ALTER TABLE `patient` ADD FOREIGN KEY (`fk_user`) REFERENCES `user` (`id`) on delete cascade;

ALTER TABLE `medical_file` ADD FOREIGN KEY (`fk_doctor`) REFERENCES `doctor` (`id`) on delete cascade;

ALTER TABLE `patient` ADD FOREIGN KEY (`fk_current_mFile`) REFERENCES `medical_file` (`id`) on delete cascade;

ALTER TABLE `medical_file` ADD FOREIGN KEY (`fk_patient`) REFERENCES `patient` (`id`) on delete cascade;

ALTER TABLE `minor` ADD FOREIGN KEY (`fk_patient`) REFERENCES `patient` (`id`) on delete cascade;



ALTER TABLE `user` CHANGE `creation_date` `creation_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE `note` CHANGE `creation_date` `creation_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE `attachment` CHANGE `creation_date` `creation_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE `medical_file` CHANGE `creation_date` `creation_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE `user` CHANGE `creation_date` `creation_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP;

INSERT INTO `insurance` (`id`, `title`) VALUES (NULL, 'Payante'), (NULL, 'CNOPS'), (NULL, 'Assurances a preciser'), (NULL, 'mutuelle a preciser'); 

INSERT INTO `role` (`id`, `title`, `permissions`) VALUES
(1, 'admin', 16384),
(2, 'doctor', 1792),
(3, 'nurse', 48),
(4, 'patient', 8),
(5, 'receptionist', 0);

INSERT INTO `user`
(`id`, `email`, `password`, 														`first_name`, 	`last_name`, `phone`, `fk_role`)VALUES
(1, 'modir', '$2b$10$yjnvBanGhl8oxpGfxGUlH.VOXszpQChMmoa8N/keihbr9Sd2OAtFa', 		'said', 		'blalla', NULL, 1),
(2, 'doctor', '$2b$10$yjnvBanGhl8oxpGfxGUlH.VOXszpQChMmoa8N/keihbr9Sd2OAtFa',		'tabib', 		'admin', NULL, 2),
(3, 'nurse', '$2b$10$yjnvBanGhl8oxpGfxGUlH.VOXszpQChMmoa8N/keihbr9Sd2OAtFa', 		'momarida', 	'admin', NULL, 3),
(4, 'patient', '$2b$10$yjnvBanGhl8oxpGfxGUlH.VOXszpQChMmoa8N/keihbr9Sd2OAtFa', 		'marid', 		'admin', NULL, 4),
(5, 'receptionist', '$2b$10$yjnvBanGhl8oxpGfxGUlH.VOXszpQChMmoa8N/keihbr9Sd2OAtFa', 'mosta9bil',	'admin', NULL, 5);

INSERT INTO `role`(`title`				,	`permissions`)
					VALUES  ('admin'				,	 16384			),
									('doctor'			  ,	 	1792			),
									('nurse'				,	 		48			),
									('receptionist' ,	 		 0			)
  