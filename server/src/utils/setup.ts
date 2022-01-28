import { Pool } from 'pg';
import { exit } from 'process';
import { DB_HOST, DB_NAME, DB_USER, DB_PW } from './config';

const setupDb = async () => {
    const init = new Pool({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PW,
    });

    init.connect((err, client, release) => {
        if (err) {
            return console.error(
                'Error acquiring db client. Make sure postgres is running and .env in root dir is configured.',
                err.message
            );
        }
        client.query(`DROP DATABASE IF EXISTS ${DB_NAME}`, (err, result) => {
            if (err) {
                return console.error('Error executing query', err.stack);
            }
            console.log(`Cleared db '${DB_NAME}'`);
        });
        client.query(`CREATE DATABASE ${DB_NAME}`, (err, result) => {
            release();
            if (err) {
                return console.error('Error executing query', err.stack);
            }
            console.log(`Created db '${DB_NAME}'`);
        });
    });

    await init.end();

    const pool = new Pool({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PW,
        database: DB_NAME,
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
        client.query(
            `CREATE TABLE todo(
    id SERIAL PRIMARY KEY NOT NULL,
    task text,
    status task_status DEFAULT 'todo'
);`,
            (err, result) => {
                release();
                if (err) {
                    return console.error('Error executing query', err.stack);
                }
                console.log(`Created table 'todo'`);
                console.log(`Finished creating database '${DB_NAME}'`);
            }
        );
    });

    await pool.end();
    exit();
};

setupDb();
