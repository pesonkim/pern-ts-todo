DROP DATABASE IF EXISTS todo;

CREATE DATABASE todo;

CREATE TYPE task_status AS ENUM ('todo', 'doing', 'done');

CREATE TABLE todo(
    id SERIAL PRIMARY KEY NOT NULL,
    username varchar(50),
    task text,
    status task_status DEFAULT 'todo'
);
