import React from 'react';
import { useTodoContext } from '../../context/TodoContext';
import { AppHeader, HeaderSection, UserDiv, ErrorDiv, LogoutDiv } from './styles';

//Page header component for logout button and indicating
//currently logged in user/error messages 
const Header: React.FC = () => {
    const todoContext = useTodoContext()!;
    const username = todoContext.user;
    const error = todoContext.errorMessage;

    const handleLogout = () => {
        todoContext.logoutHandler();
    };

    return (
        <AppHeader>
            <HeaderSection>
                {error && <ErrorDiv>{error}</ErrorDiv>}
                {username && <UserDiv>{username}</UserDiv>}
                {username && <LogoutDiv onClick={handleLogout}>Logout</LogoutDiv>}
            </HeaderSection>
        </AppHeader>
    );
};

export default Header;
