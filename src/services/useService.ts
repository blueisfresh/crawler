import axios from "axios";

const API_URL = "http://192.168.1.12:5104/";

export const fetchAllAsync = async () => {
  try {
    const response = await axios.get(`${API_URL}api/Todo`);
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

export const fetchByIdAsync = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}api/Todo/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching todo with ID ${id}:`, error);
    throw error;
  }
};

export const createAsync = async (todo: any) => {
  try {
    const response = await axios.post(`${API_URL}api/Todo`, todo);
    return response.data;
  } catch (error) {
    console.error("Error creating todo:", error);
    throw error;
  }
};

export const updateAsync = async (id: number, todo: any) => {
  try {
    const response = await axios.put(`${API_URL}api/Todo/${id}`, todo);
    return response.data;
  } catch (error) {
    console.error(`Error updating todo with ID ${id}:`, error);
    throw error;
  }
};
export const deleteAsync = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}api/Todo/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting todo with ID ${id}:`, error);
    throw error;
  }
};
export const deleteAllAsync = async () => {
  try {
    const response = await axios.delete(`${API_URL}api/Todo`);
    return response.data;
  } catch (error) {
    console.error("Error deleting all todos:", error);
    throw error;
  }
};
