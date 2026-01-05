import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:2000/api/tasks';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchTasks = async () => {
    try {
        const response = await api.get('/');
        return response.data.data; // Returns array of tasks
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};

export const createTask = async (taskData) => {
    try {
        const response = await api.post('/', taskData);
        return response.data.data;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
};


export const updateTask = async (id, taskData) => {
    try {
        const response = await api.put(`/${id}`, taskData);
        return response.data.data;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
};

export const deleteTask = async (id) => {
    try {
        const response = await api.delete(`/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
};

export default api;
