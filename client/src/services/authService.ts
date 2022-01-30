import axios from 'axios';

const baseUrl = '/api/auth';

let token: string = '';

const setToken = (newToken: string) => {
    token = `bearer ${newToken}`;
};

const config = () => ({
    headers: { Authorization: token },
});

const getToken = async (user: string) => {
    const { data } = await axios.post(baseUrl, { user: user });
    window.localStorage.setItem('todo-user', JSON.stringify(data))
    setToken(data.token);
    return data;
};

const auth = { setToken, config, getToken };

export default auth;
