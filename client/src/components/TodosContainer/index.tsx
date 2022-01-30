import React from 'react';
import NewTodo from '../NewTodo';
import TodoLists from '../TodoLists';
import { Wrapper } from './styles';

const TodosContainter: React.FC = () => {
    return (
        <Wrapper>
            <NewTodo />
            <TodoLists />
        </Wrapper>
    );
};

export default TodosContainter;
