import React, { useState } from 'react';

interface Props {
    addTodo: (task: string) => void;
}

const NewTodo: React.FC<Props> = ({ addTodo }) => {
    const [inputText, setInputText] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        addTodo(inputText);
        setInputText('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="New Task"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
            />
            <button type="submit" disabled={inputText.length ? false : true}>
                Add
            </button>
        </form>
    );
};

export default NewTodo;
