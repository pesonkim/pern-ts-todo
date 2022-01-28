import { Pool } from 'pg';
import { DB_HOST, DB_NAME, DB_USER, DB_PW } from './config';

export const pool = new Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PW,
    database: DB_NAME,
});

