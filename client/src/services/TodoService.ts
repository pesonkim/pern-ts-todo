import axios from 'axios';
import auth from './authService';
import { Todo, TodoStatus } from '../models/TodoModel';

const baseUrl = '/api/todo';

const getTodos = async () => {
    const { data } = await axios.get<Todo[]>(baseUrl, auth.config());
    return data;
};

const addTodo = async (task: string) => {
    const { data } = await axios.post<Todo>(baseUrl, { task: task }, auth.config());
    return data;
};

const moveTodo = async (todoId: number, newStatus: TodoStatus) => {
    const { data } = await axios.put<Todo>(`${baseUrl}/${todoId}`, { status: newStatus });
    return data;
};

const deleteTodo = async (todoId: number) => {
    const response = await axios.delete(`${baseUrl}/${todoId}`);
    return response.data;
};

const todoService = { getTodos, addTodo, moveTodo, deleteTodo };

export default todoService;
