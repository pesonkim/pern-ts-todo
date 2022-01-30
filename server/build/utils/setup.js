"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const process_1 = require("process");
const config_1 = require("./config");
const setupDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const init = new pg_1.Pool({
        host: config_1.DB_HOST,
        user: config_1.DB_USER,
        password: config_1.DB_PW,
        port: config_1.DB_PORT
    });
    init.connect((err, client, release) => {
        if (err) {
            return console.error('Error acquiring db client. Make sure postgres is running and .env in root dir is configured.', err.message);
        }
        client.query(`DROP DATABASE IF EXISTS ${config_1.DB_NAME}`, (err, result) => {
            if (err) {
                return console.error('Error executing query', err.stack);
            }
            console.log(`Cleared db '${config_1.DB_NAME}'`);
        });
        client.query(`CREATE DATABASE ${config_1.DB_NAME}`, (err, result) => {
            release();
            if (err) {
                return console.error('Error executing query', err.stack);
            }
            console.log(`Created db '${config_1.DB_NAME}'`);
        });
    });
    yield init.end();
    const pool = new pg_1.Pool({
        host: config_1.DB_HOST,
        user: config_1.DB_USER,
        password: config_1.DB_PW,
        database: config_1.DB_NAME,
        port: config_1.DB_PORT
    });
    pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error acquiring db client.', err.message);
        }
        client.query(`CREATE TYPE task_status AS ENUM ('todo', 'doing', 'done')`, (err, result) => {
            if (err) {
                return console.error('Error executing query', err.stack);
            }
            console.log(`Created enum type for 'status'`);
        });
        client.query(`CREATE TABLE todo(
    id SERIAL PRIMARY KEY NOT NULL,
    username varchar(50),
    task text,
    status task_status DEFAULT 'todo'
);`, (err, result) => {
            release();
            if (err) {
                return console.error('Error executing query', err.stack);
            }
            console.log(`Created table 'todo'`);
            console.log(`Finished creating database '${config_1.DB_NAME}'`);
        });
    });
    yield pool.end();
    (0, process_1.exit)();
});
setupDb();
