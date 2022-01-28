import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { pool } from '../utils/db';

enum TodoStatus {
    TODO,
    DOING,
    DONE,
}

type Todo = {
    id: number;
    task: string;
    status: TodoStatus;
};

//GET
export const getTodos = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const client = await pool.connect();

    const sql = 'SELECT * FROM todo;';
    const { rows } = await client.query(sql);
    const todos: Todo[] = rows;

    client.release();

    return res.status(200).json(todos);
});

//POST
export const createTodo = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const task = (req.body as { task: string }).task;

    if (!task || task === '') {
        return res.status(400).end();
    }

    const client = await pool.connect();

    const sql = 'INSERT INTO todo(task) VALUES($1) RETURNING *;';
    const { rows } = await client.query(sql, [task]);
    const newTodo: Todo = rows[0];

    client.release();

    return res.status(201).json(newTodo);
});

//PUT:id
export const updateTodo = asyncHandler(
    async (req: Request<{ id: string }>, res: Response): Promise<any> => {
        const todoId = req.params.id;
        const updatedTask = (req.body as { task: string }).task;
        const updatedStatus = (req.body as { status: string }).status;

        const client = await pool.connect();

        const sql = 'UPDATE todo SET task=$1, status=$2 WHERE id=$3 RETURNING *;';
        const { rows } = await client.query(sql, [updatedTask, updatedStatus, todoId]);
        const updatedTodo: Todo = rows[0];

        client.release();

        if (updatedTodo) {
            return res.status(200).json(updatedTodo);
        } else {
            return res.status(400).end();
        }
    }
);

//DELETE:id
export const deleteTodo = asyncHandler(
    async (req: Request<{ id: string }>, res: Response): Promise<any> => {
    const todoId = req.params.id;

    const client = await pool.connect();

    const sql = 'DELETE FROM todo WHERE id=$1 RETURNING *;';
    const { rowCount } = await client.query(sql, [todoId]);

    client.release();

    if (rowCount) {
        return res.status(200).end();
    } else {
        return res.status(400).end();
    }
});
