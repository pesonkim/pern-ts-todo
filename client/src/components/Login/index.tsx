import React, { useState } from 'react';
import { useTodoContext } from '../../context/TodoContext';
import { Layout } from './styles';
import {
    InputWrapper,
    InputHeader,
    InputForm,
    InputField,
    InputButton,
    DisabledButton,
} from '../TodoInput/styles';

//Login/choose username prompt, repurposed styling
//from TodoInput component
const LoginPrompt: React.FC = () => {
    const todoContext = useTodoContext()!;
    const [inputText, setInputText] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        todoContext.loginHandler(inputText);
        setInputText('');
    };

    return (
        <Layout>
            <InputWrapper>
                <InputHeader>Choose a username</InputHeader>
                <InputForm onSubmit={handleSubmit}>
                    <InputField
                        type="text"
                        placeholder="Type a name to continue"
                        value={inputText}
                        maxLength={20}
                        onChange={(e) => setInputText(e.target.value)}
                    />
                    {inputText.length ? (
                        <InputButton type="submit">Submit</InputButton>
                    ) : (
                        <DisabledButton disabled={true}>Submit</DisabledButton>
                    )}
                </InputForm>
            </InputWrapper>
        </Layout>
    );
};

export default LoginPrompt;
