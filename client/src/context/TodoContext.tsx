import { createContext, useContext, useEffect, useState, ReactChild, ReactChildren } from 'react';
import todoService from '../services/TodoService';
import { Todo, TodoStatus } from '../models/TodoModel';
import auth from '../services/authService';

//Interface for createContext()
interface ITodoContext {
    user: string | null;
    todos: Todo[];
    errorMessage: string | null;
    loginHandler: (username: string) => void;
    logoutHandler: () => void;
    addHandler: (task: string) => void;
    deleteHandler: (todoId: number) => void;
    moveHandler: (todoId: number, newStatus: TodoStatus) => void;
}

//Interface for props.children
interface IProps {
    children: ReactChild | ReactChildren;
}

//Context for storing todo items and handlers instead of prop drilling
export const TodoContext = createContext<ITodoContext | null>(null);

//Context provider wrapper for App component
export const TodoProvider: React.FC<IProps> = ({ children }) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [user, setUser] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    //Checks if browser local storage has a user token saved, and
    //reapplies it after refreshes
    useEffect(() => {
        const todoUser = window.localStorage.getItem('todo-user');

        if (todoUser) {
            auth.setToken(JSON.parse(todoUser).token);
            setUser(JSON.parse(todoUser).username);
        } else {
            window.localStorage.clear();
        }
    }, []);

    //Effect for fetching user todo items after login or refresh,
    //after username is changed from initialstate(null)
    useEffect(() => {
        async function init(user: string) {
            todoService
                .getTodos()
                .then((res) => {
                    setTodos(res);
                })
                .catch((err) => {
                    window.localStorage.clear();
                    setUser(null);
                    setErrorMessage(err.message)
                });
        }
        if (user) {
            init(user);
        }
    }, [user]);

    //Requests jwt token after login
    const loginHandler = async (username: string) => {
        auth.getToken(username)
            .then(() => {
                window.location.href = '/todo';
            })
            .catch((err) => {
                setErrorMessage(err.message)
            });
    };

    //Logout handler and redirect, also used in most error cases
    //if database is not reachable
    const logoutHandler = () => {
        window.localStorage.clear();
        window.location.href = '/';
    };

    //Handler for creating new todo items
    const addHandler = async (task: string) => {
        todoService
            .addTodo(task)
            .then((res) => {
                setTodos((prevState) => [...prevState, res]);
            })
            .catch((err) => {
                logoutHandler();
            });
    };

    //Handler for drag and drop actions and item updates
    const moveHandler = async (todoId: number, newStatus: TodoStatus) => {
        todoService
            .moveTodo(todoId, newStatus)
            .then((res) => {
                setTodos((prevState) => {
                    return prevState.map((todo) =>
                        todo.id === todoId ? { ...todo, status: res.status } : todo
                    );
                });
            })
            .catch((err) => {
                window.localStorage.clear();
                setUser(null);
                setErrorMessage(err.message)
            });
    };

    //Handler for deleting todo items
    const deleteHandler = async (todoId: number) => {
        todoService
            .deleteTodo(todoId)
            .then((res) => {
                setTodos((prevState) => {
                    return prevState.filter((todo) => todo.id !== todoId);
                });
            })
            .catch((err) => {
                window.localStorage.clear();
                setUser(null);
                setErrorMessage(err.message)
            });
    };

    return (
        <TodoContext.Provider
            value={{
                user,
                todos,
                errorMessage,
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

//Prepared hook for using todo context
export const useTodoContext = () => {
    return useContext(TodoContext);
};
