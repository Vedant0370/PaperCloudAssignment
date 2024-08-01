import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const getForms = async() => {
    try {
        return await axios.get(`${API_BASE_URL}/forms`);
    } catch (error) {
        console.log(error)
    }
}
export const getForm = async(id) =>{
    try {
        return await axios.get(`${API_BASE_URL}/forms/${id}`);
    } catch (error) {
        console.log(error)
    }
}
    
export const createForm = async(form) => {
    try {
        return await axios.post(`${API_BASE_URL}/forms`, form);

    } catch (error) {
        console.log(error)
    }
}
export const updateForm = async(id, form) =>{
    try {
        return await axios.put(`${API_BASE_URL}/forms/${id}`, form);

    } catch (error) {
        console.log(error)
    }
}
export const deleteForm = async(id) =>{
    try {
        return await axios.delete(`${API_BASE_URL}/forms/${id}`);
    } catch (error) {
        console.log(error)
    }
} 
