Drop Table if exists User;
Drop Table if exists List;
Drop Table if exists Item;

CREATE TABLE User (
    username VARCHAR(64) PRIMARY KEY,
    first_name VARCHAR(16) NOT NULL,
    last_name VARCHAR(16) NOT NULL,
    password VARCHAR(32) NOT NULL
);

CREATE TABLE List (
    ID INTEGER PRIMARY KEY,
    creator_ID VARCHAR(64) REFERENCES User(username),
    title VARCHAR NOT NULL,
    creation_date DATE NOT NULL,
    reminder_date DATE NOT NULL,
    type CHAR(1) NOT NULL DEFAULT ('t') REFERENCES Type(type)
);

CREATE TABLE Item (
    ID INTEGER PRIMARY KEY,
    visibility BOOLEAN NOT NULL,
    list_ID INTEGER REFERENCES List(ID)

);

CREATE TABLE Type (
    type VARCHAR NOT NULL,
    seq INTEGER
);

INSERT INTO Type(type, seq) VALUES ('c',1); /*checkbox */
INSERT INTO Type(type, seq) VALUES ('t',2); /*text */
INSERT INTO Type(type, seq) VALUES ('p',3); /*photo */
