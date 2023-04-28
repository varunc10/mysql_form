CREATE DATABASE sql_db;

use sql_db;

CREATE TABLE users(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  age INT NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  gender VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  message VARCHAR(255) NOT NULL
);