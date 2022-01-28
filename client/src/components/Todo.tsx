import React from 'react';

interface Props {
    id: number;
    task: string;
}

const Todo: React.FC<Props> = ({ id, task }) => {
    return (
        <div>
            {id} {task}
        </div>
    );
};

export default Todo;
