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
    user1 VARCHAR(64),
    user2 VARCHAR(64),
    FOREIGN KEY(user1) REFERENCES User(username),
    FOREIGN KEY(user2) REFERENCES User(username)
);

CREATE TABLE Friendship_request(
    ID INTEGER PRIMARY KEY,
    user_from VARCHAR(64),
    user_to VARCHAR(64),
    FOREIGN KEY(user_from) REFERENCES User(username),
    FOREIGN KEY(user_to) REFERENCES User(username)
);

CREATE TABLE Share(
    ID INTEGER PRIMARY KEY,
    list_ID INTEGER,
    user VARCHAR(64),
    FOREIGN KEY(list_ID) REFERENCES List(ID),
    FOREIGN KEY(user) REFERENCES User(username)
);

CREATE TABLE Share_request(
    ID INTEGER PRIMARY KEY,
    list_ID INTEGER,
    user VARCHAR(64),
    FOREIGN KEY(list_ID) REFERENCES List(ID),
    FOREIGN KEY(user) REFERENCES User(username)
);

CREATE TABLE Item (
    ID INTEGER PRIMARY KEY,
    list_ID INTEGER,
    content VARCHAR,
    visibility BOOLEAN NOT NULL,
    FOREIGN KEY(list_ID) REFERENCES List(ID)

);
