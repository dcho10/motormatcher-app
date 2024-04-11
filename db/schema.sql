DROP DATABASE IF EXISTS cars_db;
CREATE DATABASE cars_db;

USE cars_db;

CREATE TABLE listings (
id INT,
full_name varchar(50),
email varchar(50),
listing_date date
);