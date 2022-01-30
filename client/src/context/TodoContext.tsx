import { createContext, useContext, useEffect, useState, ReactChild, ReactChildren } from 'react';
import todoService from '../services/TodoService';
import { Todo, TodoStatus } from '../models/TodoModel';
import auth from '../services/authService'

//interface for createContext()
interface ITodoContext {
    user: string | null;
    todos: Todo[];
    loginHandler: (username: string) => void;
    logoutHandler: () => void;
    addHandler: (task: string) => void;
    deleteHandler: (todoId: number) => void;
    moveHandler: (todoId: number, newStatus: TodoStatus) => void;
}

//interface for props.children
interface IProps {
    children: ReactChild | ReactChildren;
}

export const TodoContext = createContext<ITodoContext | null>(null);

//context provider wrapper for App component
export const TodoProvider: React.FC<IProps> = ({ children }) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [user, setUser] = useState<string | null>(null);

    useEffect(() => {
        const todoUser = window.localStorage.getItem('todo-user');

        if (todoUser) {
            auth.setToken(JSON.parse(todoUser).token)
            setUser(JSON.parse(todoUser).username);
        } else {
            window.localStorage.clear();
        }
    }, []);

    useEffect(() => {
        async function init(user: string) {
            const res = await todoService.getTodos();
            setTodos(res);
        }
        if (user) {
            init(user);
        }
    }, [user]);

    const loginHandler = async (username: string) => {
        await auth.getToken(username);
        window.location.href='/todo';
    };

    const logoutHandler = () => {
        window.localStorage.clear();
        window.location.href='/';
    };

    const addHandler = async (task: string) => {
        if (user) {
            const res = await todoService.addTodo(task);
            setTodos((prevState) => [...prevState, res]);
        } else {
            window.location.href='/';
        }
    };

    const moveHandler = async (todoId: number, newStatus: TodoStatus) => {
        if (user) {
            const res = await todoService.moveTodo(todoId, newStatus);
            setTodos((prevState) => {
                return prevState.map((todo) =>
                    todo.id === todoId ? { ...todo, status: res.status } : todo
                );
            });
        }
    };

    const deleteHandler = async (todoId: number) => {
        if (user) {
            await todoService.deleteTodo(todoId);
            setTodos((prevState) => {
                return prevState.filter((todo) => todo.id !== todoId);
            });
        }
    };

    return (
        <TodoContext.Provider
            value={{
                user,
                todos,
                loginHandler,
                logoutHandler,
                addHandler,
                deleteHandler,
                moveHandler,
            }}
        >
            {children}
        </TodoContext.Provider>
    );
};

//custom hook for calling useContext
export const useTodoContext = () => {
    return useContext(TodoContext);
};
