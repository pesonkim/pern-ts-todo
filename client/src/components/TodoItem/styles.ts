import styled from 'styled-components';

//Todo item <li> element inside parent column <ul>
export const TodoItem = styled.li`
    position: relative;
    font-size: 15px;
    background-color: #fff;
    padding: 10px 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    word-wrap: break-word;
    hyphens: auto;
    overflow-wrap: break-word;
    word-break: break-word;
    overflow: hidden;
    cursor: grab;
    transition: all 0.3s ease;

    :hover {
        background-color: #eee;
    }
`;

//Todo item delete button, only visible/clickable when hovering
//over items and not dragging them
export const DeleteButton = styled.button`
    position: absolute;
    display: none;
    top: 50%;
    transform: translateY(-50%);
    right: 5px;
    border-radius: 3px;
    cursor: pointer;
    padding: 0 5px;
    height: 35px;
    border: none;
    color: #fff;
    background-color: #e53e3e;

    ${TodoItem}:hover & {
        display: block;
    }

    ${TodoItem}:active & {
        display: none;
    }

    :hover {
        background-color: #9b2c2c;
    }

    :hover:active {
        display: block;
    }
`;