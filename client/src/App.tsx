import React, { useEffect, useState } from 'react';
import NewTodo from './components/NewTodo';
import TodoList from './components/TodoList';
import { getTodos, addTodo } from './services/todos';
import { Todo } from './models/todo'

const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        async function init() {
            const res = await getTodos();
            setTodos(res);
        }
        
        init()
    }, []);

    const addTodoHandler = async (task: string) => {
        const data = await addTodo(task);
        console.log(data);
        // setTodos((prevState) => [...prevState, { id: todos.length + 1, task: task }[]]);
    };

    // const deleteTodoHandler = (todoId: number) => {};

    return (
        <div>
            <header>
                <h2>Todo</h2>
                <NewTodo addTodo={addTodoHandler} />
                <TodoList todos={todos} />
            </header>
        </div>
    );
};

export default App;
