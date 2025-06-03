import { getAuthToken } from '../utils/auth'

export const api = {
  async get(url) {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json'
      }
    });
    return response;
  },

  async post(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response;
  }
  
  // Other methods
}