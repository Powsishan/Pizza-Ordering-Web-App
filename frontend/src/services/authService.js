import axios from 'axios';

const API_URL = 'http://localhost:4001/piz';

// User login (Public route)
export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        // console.log(response.data)
        return response.data; 
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

// User registration (Public route)
export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

// Function to get the token from localStorage
export const getToken = () => {
    return localStorage.getItem('token');
};

// Function to check if the user is logged in
export const isLoggedIn = () => {
    return !!getToken(); // Returns true if token exists
};

// Function to logout the user
export const logout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
};
