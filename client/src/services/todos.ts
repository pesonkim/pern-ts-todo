import axios from 'axios';
import { Todo } from '../models/todo';

const baseUrl = 'http://localhost:5000/api/todo';

export const getTodos = async () => {
    const { data } = await axios.get<Todo[]>(baseUrl);
    return data;
};

export const addTodo = async (task: string) => {
    const { data } = await axios.post<Todo>(baseUrl, { task: task });
    return data;
};
