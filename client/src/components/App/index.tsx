import React from 'react';
import Header from '../Header';
import TodosContainer from '../TodosContainer';
import LoginPrompt from '../Login';
import { GlobalStyle } from '../../styles/global';
import { AppLayout } from './styles';
import { TodoProvider } from '../../context/TodoContext';
import { Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
    return (
        <TodoProvider>
            <AppLayout>
                <Header />
                <Routes>
                    <Route path="todo" element={<TodosContainer />} />
                    <Route path="/*" element={<LoginPrompt />} />
                </Routes>
                <GlobalStyle />
            </AppLayout>
        </TodoProvider>
    );
};

export default App;
