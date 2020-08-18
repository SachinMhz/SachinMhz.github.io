CREATE DATABASE todo_database;


-- \c todo_database

CREATE TABLE todo(
    id SERIAL PRIMARY KEY,
    description  VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    is_complete BOOLEAN
);


CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email  VARCHAR(255) UNIQUE,
    hash_password VARCHAR(255)
);