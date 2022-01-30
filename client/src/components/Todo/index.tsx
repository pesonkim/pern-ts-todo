import React from 'react';
import { ListItem, DeleteButton } from './styles';
import { FaTrashAlt } from 'react-icons/fa';
import { useTodoContext } from '../../context/TodoContext';

interface Props {
    id: number;
    task: string;
}

const Todo: React.FC<Props> = ({ id, task }) => {
    const todoContext = useTodoContext()!;

    const handleDelete = () => {
        todoContext.deleteHandler(id);
    };

    const dragStart = (event: React.DragEvent) => {
        const todoId = (event.target as Element).id;
        event.dataTransfer!.setData('text/plain', todoId);
        event.dataTransfer!.effectAllowed = 'move';
    };

    return (
        <ListItem id={id.toString()} draggable={true} onDragStart={dragStart}>
            <span>{task}</span>
            <DeleteButton onClick={handleDelete}>
                <FaTrashAlt size={28} />
            </DeleteButton>
        </ListItem>
    );
};

export default Todo;
