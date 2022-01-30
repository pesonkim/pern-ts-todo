import React from 'react';
import { TodoItem, DeleteButton } from './styles';
import { FaTrashAlt } from 'react-icons/fa';
import { useTodoContext } from '../../context/TodoContext';

interface Props {
    id: number;
    task: string;
}

//Individual and draggable todo item component 
const Todo: React.FC<Props> = ({ id, task }) => {
    const todoContext = useTodoContext()!;

    const handleDelete = () => {
        todoContext.deleteHandler(id);
    };

    //Stores dragged task id inside event object dataTransfer
    //method at the start of drag actions
    const dragStart = (event: React.DragEvent) => {
        const todoId = (event.target as Element).id;
        event.dataTransfer!.setData('text/plain', todoId);
        event.dataTransfer!.effectAllowed = 'move';
    };

    return (
        <TodoItem id={id.toString()} draggable={true} onDragStart={dragStart}>
            <span>{task}</span>
            <DeleteButton onClick={handleDelete}>
                <FaTrashAlt size={28} />
            </DeleteButton>
        </TodoItem>
    );
};

export default Todo;
