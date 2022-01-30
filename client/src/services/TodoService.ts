import axios from 'axios';
import auth from './authService';
import { Todo, TodoStatus } from '../models/TodoModel';

//exposed api for todo items
const baseUrl = '/api/todo';

//requests all user todos, auth.config() argument in axios calls
//applies authorization header to the request object
const getTodos = async () => {
    try {
        const { data } = await axios.get<Todo[]>(baseUrl, auth.config());
        return data;
    } catch (error) {
        throw new Error('Error connecting to database');
    }
};

//creates new todo for user
const addTodo = async (task: string) => {
    try {
        const { data } = await axios.post<Todo>(baseUrl, { task: task }, auth.config());
        return data;
    } catch (error) {
        throw new Error('Error connecting to database');
    }
};

//updates todo status between different columns
const moveTodo = async (todoId: number, newStatus: TodoStatus) => {
    try {
        const { data } = await axios.put<Todo>(`${baseUrl}/${todoId}`, { status: newStatus }, auth.config());
        return data;
    } catch (error) {
        throw new Error('Error connecting to database');
    }
};

//deletes a single todo
const deleteTodo = async (todoId: number) => {
    try {
        const response = await axios.delete(`${baseUrl}/${todoId}`, auth.config());
        return response.data;
    } catch (error) {
        throw new Error('Error connecting to database');
    }
};

const todoService = { getTodos, addTodo, moveTodo, deleteTodo };

export default todoService;
