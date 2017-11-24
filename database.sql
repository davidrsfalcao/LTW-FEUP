CREATE TABLE User (
    username VARCHAR(64) PRIMARY KEY,
    first_name VARCHAR(16) NOT NULL,
    last_name VARCHAR(16) NOT NULL,
    password VARCHAR(32) NOT NULL
);
