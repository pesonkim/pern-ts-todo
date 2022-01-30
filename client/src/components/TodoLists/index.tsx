import React from 'react';
import Todo from '../Todo';
import { ListSection, ListColumn, ListTitle, StyledList } from './styles';
import { TodoStatus } from '../../models/TodoModel';
import { useTodoContext } from '../../context/TodoContext';

const TodoLists: React.FC = () => {
    const todoContext = useTodoContext()!;

    const todoTasks = todoContext.todos.filter((todo) => todo.status === 'todo');
    const doingTasks = todoContext.todos.filter((todo) => todo.status === 'doing');
    const doneTasks = todoContext.todos.filter((todo) => todo.status === 'done');

    const dragOver = (event: React.DragEvent) => {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const elemId = event.currentTarget as HTMLElement;
            elemId.style.backgroundColor = '#adc4dd';
        }
    };

    const dragLeave = (event: React.DragEvent) => {
        const elemId = event.currentTarget as HTMLElement;
        elemId.style.backgroundColor = '#e2e4e6';
    };

    const dragDrop = (event: React.DragEvent) => {
        const newStatus = (event.currentTarget as HTMLElement).id as TodoStatus;
        const todoId = parseInt(event.dataTransfer!.getData('text/plain'));
        const id = event.currentTarget as HTMLElement;
        id.style.backgroundColor = '#e2e4e6';

        const todo = todoContext.todos.find(todo => todo.id === todoId)
        if (todo && todo.status !== newStatus) {
            todoContext.moveHandler(todoId, newStatus);
        }
    };

    return (
        <ListSection>
            <ListColumn id={'todo'} onDragOver={dragOver} onDragLeave={dragLeave} onDrop={dragDrop}>
                <ListTitle>Todo</ListTitle>
                <StyledList>
                    {todoTasks.map((todo) => (
                        <Todo key={todo.id} id={todo.id} task={todo.task} />
                    ))}
                </StyledList>
            </ListColumn>
            <ListColumn id={'doing'} onDragOver={dragOver} onDragLeave={dragLeave} onDrop={dragDrop}>
                <ListTitle>Doing</ListTitle>
                <StyledList>
                    {doingTasks.map((todo) => (
                        <Todo key={todo.id} id={todo.id} task={todo.task} />
                    ))}
                </StyledList>
            </ListColumn>
            <ListColumn id={'done'} onDragOver={dragOver} onDragLeave={dragLeave} onDrop={dragDrop}>
                <ListTitle>Done</ListTitle>
                <StyledList>
                    {doneTasks.map((todo) => (
                        <Todo key={todo.id} id={todo.id} task={todo.task} />
                    ))}
                </StyledList>
            </ListColumn>
        </ListSection>
    );
};

export default TodoLists;
