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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodos = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const db_1 = require("../utils/db");
exports.getTodos = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield db_1.pool.connect();
    const sql = 'SELECT * FROM todo;';
    const { rows } = yield client.query(sql);
    client.release();
    res.status(200).json(rows);
}));
const createTodo = (req, res, next) => {
};
exports.createTodo = createTodo;
const updateTodo = (req, res, next) => {
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, res, next) => {
};
exports.deleteTodo = deleteTodo;
