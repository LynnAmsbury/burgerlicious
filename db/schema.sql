DROP DATABASE IF EXISTS burgerlicious_db;
CREATE DATABASE burgerlicious_db;
USE burgerlicious_db;

-- If the table already exists, remove it before trying to create the table again
DROP TABLE IF EXISTS burgers;

-- Create the burgers table
CREATE TABLE burgers (
    id int AUTO_INCREMENT NOT NULL,
    burger_name varchar(255) NOT NULL,
    devoured BOOL DEFAULT false,
    PRIMARY KEY (id)
);