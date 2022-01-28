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
var TodoStatus;
(function (TodoStatus) {
    TodoStatus[TodoStatus["TODO"] = 0] = "TODO";
    TodoStatus[TodoStatus["DOING"] = 1] = "DOING";
    TodoStatus[TodoStatus["DONE"] = 2] = "DONE";
})(TodoStatus || (TodoStatus = {}));
exports.getTodos = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield db_1.pool.connect();
    const sql = 'SELECT * FROM todo;';
    const { rows } = yield client.query(sql);
    const todos = rows;
    client.release();
    return res.status(200).json(todos);
}));
exports.createTodo = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = req.body.task;
    if (!task || task === '') {
        return res.status(400).end();
    }
    const client = yield db_1.pool.connect();
    const sql = 'INSERT INTO todo(task) VALUES($1) RETURNING *;';
    const { rows } = yield client.query(sql, [task]);
    const newTodo = rows[0];
    client.release();
    return res.status(201).json(newTodo);
}));
exports.updateTodo = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todoId = req.params.id;
    const updatedTask = req.body.task;
    const updatedStatus = req.body.status;
    const client = yield db_1.pool.connect();
    const sql = 'UPDATE todo SET task=$1, status=$2 WHERE id=$3 RETURNING *;';
    const { rows } = yield client.query(sql, [updatedTask, updatedStatus, todoId]);
    const updatedTodo = rows[0];
    client.release();
    if (updatedTodo) {
        return res.status(200).json(updatedTodo);
    }
    else {
        return res.status(400).end();
    }
}));
exports.deleteTodo = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todoId = req.params.id;
    const client = yield db_1.pool.connect();
    const sql = 'DELETE FROM todo WHERE id=$1 RETURNING *;';
    const { rowCount } = yield client.query(sql, [todoId]);
    client.release();
    if (rowCount) {
        return res.status(200).end();
    }
    else {
        return res.status(400).end();
    }
}));
