import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

export const IP = process.env.IP;
export const PORT = process.env.PORT;
export const DB_HOST = process.env.DB_HOST;
export const DB_USER = process.env.DB_USER;
export const DB_PW = process.env.DB_PW;
export const DB_NAME = process.env.DB_NAME;
export const DB_PORT = parseInt(process.env.DB_PORT as string) || 5432;
