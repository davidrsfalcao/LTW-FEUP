CREATE TABLE User(
    username VARCHAR(64) PRIMARY KEY,
    first_name VARCHAR(16) NOT NULL,
    last_name VARCHAR(16) NOT NULL,
    password VARCHAR(32) NOT NULL
);

CREATE TABLE List(
    ID INTEGER PRIMARY KEY,
    creator_ID VARCHAR(64),
    title VARCHAR NOT NULL,
    creation_date DATE NOT NULL,
    reminder_date DATE NOT NULL,
    type INTEGER NOT NULL,
    FOREIGN KEY(creator_ID) REFERENCES User(username)
);

CREATE TABLE Friendship(
    ID INTEGER PRIMARY KEY,
    user1 VARCHAR(64) REFERENCES User(username),
    user2 VARCHAR(64) REFERENCES User(username)
);

CREATE TABLE Share(
    ID INTEGER,
    user VARCHAR(64),
    FOREIGN KEY(ID) REFERENCES List(ID),
    FOREIGN KEY(user) REFERENCES User(username),
    PRIMARY KEY(ID,user)
);

CREATE TABLE Item (
    ID INTEGER PRIMARY KEY,
    list_ID INTEGER,
    content VARCHAR,
    visibility BOOLEAN NOT NULL,
    FOREIGN KEY(list_ID) REFERENCES List(ID)

);
