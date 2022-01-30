import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    body {
    font-family: inter-regular,source-code-pro,Menlo,Monaco,Consolas,Courier New,monospace;
    background: #EECDA3;  /* fallback for old browsers */
    background: -webkit-linear-gradient(rgb(238, 205, 163), rgb(239, 98, 159));  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(rgb(238, 205, 163), rgb(239, 98, 159)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }
    * {
        margin: 0;
        padding: 0;
    }
`;
