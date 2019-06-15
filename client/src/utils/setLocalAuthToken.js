import axois from 'axios';

const setLocalAuthToken = token => {
    if (token) {
        //apply local authorization token to every request if logged in 
        Axios.defaults.headers.common['Local Authorization'] = token;
    } else {
        //delete auth header
        delete axios.defaults.headers.common['Local Authorization'];
    }
};

export default setLocalAuthToken;