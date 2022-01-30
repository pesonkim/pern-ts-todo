import React, { useState } from 'react';
import { useTodoContext } from '../../context/TodoContext';
import {
    InputWrapper,
    InputHeader,
    InputForm,
    InputField,
    InputButton,
    DisabledButton,
} from './styles';

//Input field and handlers for adding new todo items
const TodoInput: React.FC = () => {
    const todoContext = useTodoContext()!;
    const [inputText, setInputText] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        todoContext.addHandler(inputText);
        setInputText('');
    };

    return (
        <InputWrapper>
            <InputHeader>Todos ({todoContext.todos.length})</InputHeader>
            <InputForm onSubmit={handleSubmit}>
                <InputField
                    type="text"
                    placeholder="Add a new todo"
                    value={inputText}
                    maxLength={280}
                    onChange={(e) => setInputText(e.target.value)}
                />
                {inputText.length ? (
                    <InputButton type="submit">Submit</InputButton>
                ) : (
                    <DisabledButton disabled={true}>Submit</DisabledButton>
                )}
            </InputForm>
        </InputWrapper>
    );
};

export default TodoInput;
