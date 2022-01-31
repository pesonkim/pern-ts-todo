import React from 'react';
import TodoItem from '../TodoItem';
import { ListSection, ListColumn, ListTitle, StyledList } from './styles';
import { TodoStatus } from '../../models/TodoModel';
import { useTodoContext } from '../../context/TodoContext';

//Component for todo item colums, and partial drag and drop function logic
const TodoLists: React.FC = () => {
    const todoContext = useTodoContext()!;

    const todoTasks = todoContext.todos.filter((todo) => todo.status === 'todo');
    const doingTasks = todoContext.todos.filter((todo) => todo.status === 'doing');
    const doneTasks = todoContext.todos.filter((todo) => todo.status === 'done');

    //Changes target column color to signal it is valid drop action target.
    //Default event needs to be canceled in 'dragover' actions for 'ondrop'
    //to trigger later. The default action is not to drop elements after dragging.
    const dragOver = (event: React.DragEvent) => {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const elemId = event.currentTarget as HTMLElement;
            elemId.style.backgroundColor = '#adc4dd';
        }
    };

    //Removes column color highlights if outside dropppable target
    const dragLeave = (event: React.DragEvent) => {
        const elemId = event.currentTarget as HTMLElement;
        elemId.style.backgroundColor = '#e2e4e6';
    };

    //Handler for only valid drop events inside a droppable target. Fetches
    //dragged todo item id from event object 'dataTransfer' method. Clears
    //remaining color highlights and calls for move handler in todoContext.
    const dragDrop = (event: React.DragEvent) => {
        event.preventDefault();
        const newStatus = (event.currentTarget as HTMLElement).id as TodoStatus;
        const todoId = parseInt(event.dataTransfer!.getData('text/plain'));
        const id = event.currentTarget as HTMLElement;
        id.style.backgroundColor = '#e2e4e6';

        const todo = todoContext.todos.find((todo) => todo.id === todoId);
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
                        <TodoItem key={todo.id} id={todo.id} task={todo.task} />
                    ))}
                </StyledList>
            </ListColumn>
            <ListColumn
                id={'doing'}
                onDragOver={dragOver}
                onDragLeave={dragLeave}
                onDrop={dragDrop}
            >
                <ListTitle>Doing</ListTitle>
                <StyledList>
                    {doingTasks.map((todo) => (
                        <TodoItem key={todo.id} id={todo.id} task={todo.task} />
                    ))}
                </StyledList>
            </ListColumn>
            <ListColumn id={'done'} onDragOver={dragOver} onDragLeave={dragLeave} onDrop={dragDrop}>
                <ListTitle>Done</ListTitle>
                <StyledList>
                    {doneTasks.map((todo) => (
                        <TodoItem key={todo.id} id={todo.id} task={todo.task} />
                    ))}
                </StyledList>
            </ListColumn>
        </ListSection>
    );
};

export default TodoLists;
