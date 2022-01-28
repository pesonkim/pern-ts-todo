import React from 'react';
import Todo from './Todo';

interface Props {
    todos: { id: number, task: string }[];
}

const TodoList: React.FC<Props> = ({ todos }) => {
    return (
        <>
            {todos.map(todo => (
                <Todo key={todo.id} id={todo.id} task={todo.task}/>
            ))}
        </>
    )
};

export default TodoList;
