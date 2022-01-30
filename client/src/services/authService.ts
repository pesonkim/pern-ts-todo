import axios from 'axios';

//Exposed api for jwt tokens
const baseUrl = '/api/auth';

//Variable for storing authentication string
let token: string = '';

//Sets request header after succesful logins, or after 
//page refreshes if token is saved in browser local storage
const setToken = (newToken: string) => {
    token = `bearer ${newToken}`;
};

//Function call for fetching authentication header for axios requests
const config = () => ({
    headers: { Authorization: token },
});

//POST request for fresh token after user login
const getToken = async (user: string) => {
    try {
        const { data } = await axios.post(baseUrl, { user: user });
        window.localStorage.setItem('todo-user', JSON.stringify(data));
        setToken(data.token);
        return data;
    } catch (error: unknown) {
        throw new Error('Error connecting to database');
    }
};

const auth = { setToken, config, getToken };

export default auth;
