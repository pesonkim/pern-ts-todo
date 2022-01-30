import styled from 'styled-components';

//Navbar/header component
export const AppHeader = styled.header`
    background-color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(5px);
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    padding: 20px 0;
    display: flex;
    justify-content: center;
    z-index: 10;
    box-shadow: 0 2px 10px rgb(0 0 0 / 20%);
`;

//Spacing for header fields
export const HeaderSection = styled.section`
    position: relative;
    display: flex;
    justify-content: center;
    max-width: 1024px;
    width: 100%;
    margin: 0 20px;
`;

//Logged in username message 
export const UserDiv = styled.div`
    border: none;
    border-radius: 10px;
    font-size: 20px;
    cursor: default;
`;

//Message field for database connection error cases
export const ErrorDiv = styled(UserDiv)`
    color: red;
`;

//Logout button
export const LogoutDiv = styled.div`
    position: absolute;
    color: #fff;
    padding: 10px 20px;
    background-color: #2B6CB0;
    border: none;
    border-radius: 10px;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
`;