import React from 'react';
import { useTodoContext } from '../../context/TodoContext';
import { AppHeader, HeaderSection, UserDiv, LogoutDiv } from './styles';

const Header: React.FC = () => {
    const todoContext = useTodoContext()!;
    const username = todoContext.user;

    const handleLogout = () => {
        todoContext.logoutHandler();
    };

    return (
        <AppHeader>
            <HeaderSection>
                <UserDiv>{username ? username : ''}</UserDiv>
                {username && <LogoutDiv onClick={handleLogout}>Logout</LogoutDiv>}
            </HeaderSection>
        </AppHeader>
    );
};

export default Header;
