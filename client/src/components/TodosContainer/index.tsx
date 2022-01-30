import React from 'react';
import TodoInput from '../TodoInput';
import TodoLists from '../TodoLists';
import { Wrapper } from './styles';

//New todo item input field and list fields for 
//existing todos items bundled together 
const TodosContainer: React.FC = () => {
    return (
        <Wrapper>
            <TodoInput />
            <TodoLists />
        </Wrapper>
    );
};

export default TodosContainer;
