import styled from 'styled-components';

//Entire three list column section
export const ListSection = styled.section`
    display: flex;
    margin: 20px auto;
    width: 100%;
    overflow-x: auto;
    align-items: start;
    padding-bottom: 10px;
`;

//Individual todo item list
export const ListColumn = styled.div`
    background-color: #e2e4e6;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    width: 100%;
    margin: 0 10px;
    box-shadow: 0 2px 10px rgb(0 0 0 / 20%);
`;

export const ListTitle = styled.h2`
    color: #333;
    padding: 10px;
    font-size: 20px;
`;

//ul element inside column container
export const StyledList = styled.ul`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    list-style: none;
    padding: 0 10px 10px;
`;
