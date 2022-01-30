import styled from 'styled-components';

export const InputWrapper = styled.div`
    max-width: 640px;
    width: 100%;
    margin: 0 auto;
    padding: 0 20px;
    background-color: #fff;
    box-shadow: rgb(0 0 0 / 15%) 0px 10px 20px 5px;
    border-radius: 5px;
`;

export const InputHeader = styled.header`
    font-size: 25px;
    margin-bottom: 20px;
    padding-top: 20px;
`;

export const InputForm = styled.form`
    margin: 10px 0;
    width: 100%;
    height: 40px;
    display: flex;
    padding-bottom: 20px;
`;

export const InputField = styled.input`
    width: 100%;
    outline: none;
    font-size: 15px;
    padding-left: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    transition: all 0.3s ease;

    :focus {
        background-color: #f7fafc;
    }
`;

export const InputButton = styled.button`
    width: 20%;
    height: 100%;
    margin-left: 10px;
    font-size: 15px;
    border: none;
    cursor: pointer;
    color: #fff;
    background-color: #68d391;
    border-radius: 5px;

    :hover {
        transition: all 0.3s ease;
        background-color: #38a169;
    }
`;

//Disabled submit button if input value = ''
export const DisabledButton = styled(InputButton)`
    background-color: #cbd5e0;
    cursor: default;
    :hover {
        background-color: #cbd5e0;
    }
`;
