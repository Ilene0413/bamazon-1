DROP DATABASE IF EXISTS greatbay_db;
CREATE DATABASE greatbay_db;
USE greatbay_db;

CREATE TABLE greatbay(
 id INTEGER(11) AUTO_INCREMENT NOT NULL,
 itemtype VARCHAR (45) NULL,
 itemname VARCHAR(45) NULL,
 itemdesc VARCHAR(45),
 itemopenprice DECIMAL(10,2),
 itemcurrentbid DECIMAL(10,2),
 itemlowoffer DECIMAL(10,2),
 PRIMARY KEY (id)
);