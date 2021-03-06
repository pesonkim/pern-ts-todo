import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { pool } from '../utils/db';
import jsonwebtoken from 'jsonwebtoken';

enum TodoStatus {
    TODO,
    DOING,
    DONE,
}

type Todo = {
    user: string;
    id: number;
    task: string;
    status: TodoStatus;
};

//Http request handlers and corresponding CRUD actions.
//Usernames for requests are stored and passed with JWT tokens in authentication headers.
//'express-async-handler' will automatically throw errors and call next(value) without 
//extra wrappers around db queries.

//GET request for user todo items
export const getTodos = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const authorization = req.get('authorization')!;
    let user;
    
    try {
        user = jsonwebtoken.verify(authorization.substring(7), 'Secret');
    } catch (error) {
        return res.status(401).send({ error: 'Token error' });
    }

    const client = await pool.connect();

    const sql = 'SELECT * FROM todo WHERE username=$1 ORDER BY id;';
    const { rows } = await client.query(sql, [user]);
    const todos: Todo[] = rows;

    client.release();

    return res.status(200).json(todos);
});

//POST request for a new todo item 
export const createTodo = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const authorization = req.get('authorization')!;
    let user;
    
    try {
        user = jsonwebtoken.verify(authorization.substring(7), 'Secret');
    } catch (error) {
        return res.status(401).send({ error: 'Token error' });
    }
    
    const task = (req.body as { task: string }).task;
    if (!task || task === '') {
        return res.status(400).end();
    }

    const client = await pool.connect();

    const sql = 'INSERT INTO todo(task, username) VALUES($1, $2) RETURNING *;';
    const { rows } = await client.query(sql, [task, user]);
    const newTodo: Todo = rows[0];

    client.release();

    return res.status(201).json(newTodo);
});

//PUT:id request for updating a todo status after drag and drop
export const updateTodo = asyncHandler(
    async (req: Request<{ id: string }>, res: Response): Promise<any> => {
        const authorization = req.get('authorization')!;
        let user;
        
        try {
            user = jsonwebtoken.verify(authorization.substring(7), 'Secret');
        } catch (error) {
            return res.status(401).send({ error: 'Token error' });
        }

        const todoId = req.params.id;
        const updatedStatus = (req.body as { status: string }).status;

        const client = await pool.connect();

        const sql = 'UPDATE todo SET status=$1 WHERE id=$2 AND username=$3 RETURNING *;';
        const { rows } = await client.query(sql, [updatedStatus, todoId, user]);
        const updatedTodo: Todo = rows[0];

        client.release();

        if (updatedTodo) {
            return res.status(200).json(updatedTodo);
        } else {
            return res.status(400).end();
        }
    }
);

//DELETE:id request for deleting a todo item
export const deleteTodo = asyncHandler(
    async (req: Request<{ id: string }>, res: Response): Promise<any> => {
        const authorization = req.get('authorization')!;
        let user;
        
        try {
            user = jsonwebtoken.verify(authorization.substring(7), 'Secret');
        } catch (error) {
            return res.status(401).send({ error: 'Token error' });
        }

        const todoId = req.params.id;

        const client = await pool.connect();

        const sql = 'DELETE FROM todo WHERE id=$1 AND username=$2 RETURNING *;';
        const { rowCount } = await client.query(sql, [todoId, user]);

        client.release();

        if (rowCount) {
            return res.status(200).end();
        } else {
            return res.status(400).end();
        }
    }
);
