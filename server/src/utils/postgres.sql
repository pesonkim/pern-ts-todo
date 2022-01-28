DROP DATABASE IF EXISTS todo;

CREATE DATABASE todo;

CREATE TYPE task_status AS ENUM ('todo', 'doing', 'done');

CREATE TABLE todo(
    id SERIAL PRIMARY KEY NOT NULL,
    task text,
    status task_status DEFAULT 'todo'
);
