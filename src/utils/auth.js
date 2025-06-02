// src/utils/auth.js
export const isAuthenticated = () => {
    return !!localStorage.getItem('authToken');
}

export const getAuthToken = () => {
    return localStorage.getItem('authToken');
}

export const logout = () => {
    localStorage.removeItem('authToken');
}