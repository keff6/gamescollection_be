CREATE SCHEMA `gamescollection` ;


CREATE TABLE `gamescollection`.`brand` (
  `id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `origin` VARCHAR(45) NULL,
  `logourl` VARCHAR(255) NULL,
  PRIMARY KEY (`id`));


CREATE TABLE `gamescollection`.`console` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `short_name` VARCHAR(50) NOT NULL,
    `id_brand` VARCHAR(36) NOT NULL,
    `year` VARCHAR(4) NULL,
    `generation` VARCHAR(45) NULL,
    `is_portable` TINYINT NULL,
    `logourl` VARCHAR(255) NULL,
    `consoleurl` VARCHAR(255) NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (id_brand)
        REFERENCES brand (id)
		ON DELETE RESTRICT
);

CREATE TABLE `gamescollection`.`genre` (
  `id` varchar(36) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `gamescollection`.`game` (
  `id` VARCHAR(36) NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `id_console` VARCHAR(36) NOT NULL,
  `saga` JSON NULL,
  `year` VARCHAR(4) NULL,
  `developer` VARCHAR(100) NULL,
  `publisher` VARCHAR(100) NULL,
  `is_new` TINYINT NULL,
  `is_complete` TINYINT NULL,
  `is_wishlist` TINYINT NULL,
  `is_digital` TINYINT NULL,
  `notes` TINYTEXT NULL,
  `coverurl` VARCHAR(255) NULL,
  `is_finished` TINYINT NULL,
  `is_backlog` TINYINT NULL,
  `is_playing` TINYINT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (id_console)
        REFERENCES console (id)
        ON DELETE RESTRICT);
  
  
CREATE TABLE `gamescollection`.`game_x_genre` (
  `id` INT AUTO_INCREMENT,
  `id_game` VARCHAR(36) NOT NULL,
  `id_genre` VARCHAR(36) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_game_x_genre_2_idx` (`id_genre` ASC) VISIBLE,
  CONSTRAINT `fk_game_x_genre_1`
    FOREIGN KEY (`id_game`)
    REFERENCES `gamescollection`.`game` (`id`)
    ON DELETE RESTRICT,
  CONSTRAINT `fk_game_x_genre_2`
    FOREIGN KEY (`id_genre`)
    REFERENCES `gamescollection`.`genre` (`id`)
    ON DELETE RESTRICT);

CREATE TABLE `gamescollection`.`user` (
  `id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `lastname` VARCHAR(50) NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` VARCHAR(45) NULL,
  `refresh_token` VARCHAR(255) NULL,
  PRIMARY KEY (`id`));

