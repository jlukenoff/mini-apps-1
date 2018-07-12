DROP DATABASE user_data;
CREATE DATABASE user_data;

USE user_data;

CREATE TABLE users(
  id int NOT NULL AUTO_INCREMENT,
  username VARCHAR(40),
  email VARCHAR(40),
  pword VARCHAR(40),
  PRIMARY KEY (ID)
);
 
CREATE TABLE addresses (
  id int NOT NULL AUTO_INCREMENT,
  street_num int NOT NULL,
  street_name VARCHAR(40),
  city VARCHAR(40),
  province VARCHAR(40),
  zip INT NOT NULL,
  phone VARCHAR(40),
  user_id int NOT NULL,
  PRIMARY KEY (ID),
  FOREIGN KEY (user_id)
    REFERENCES users (id)
);

CREATE TABLE payment (
  id int NOT NULL AUTO_INCREMENT,
  cc_num varchar(40),
  exp varchar(40),
  cvv int NOT NULL,
  zip int NOT NULL,
  user_id int NOT NULL,
  PRIMARY KEY (ID),
  FOREIGN KEY (user_id)
    REFERENCES users (id)
);