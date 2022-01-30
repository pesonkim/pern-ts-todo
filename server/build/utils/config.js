"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_PORT = exports.DB_NAME = exports.DB_PW = exports.DB_USER = exports.DB_HOST = exports.PORT = exports.IP = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../../.env') });
exports.IP = process.env.IP;
exports.PORT = process.env.PORT;
exports.DB_HOST = process.env.DB_HOST;
exports.DB_USER = process.env.DB_USER;
exports.DB_PW = process.env.DB_PW;
exports.DB_NAME = process.env.DB_NAME;
exports.DB_PORT = parseInt(process.env.DB_PORT) || 5432;
