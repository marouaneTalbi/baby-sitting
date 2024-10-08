
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { useNavigate, Params } from 'react-router';
// const API_BASE_URL = process.env.REACT_APP_SERVER
const API_BASE_URL = "http://localhost:8888"

const axiosInstance = axios.create({
  baseURL: API_BASE_URL
}); 


const sendRequest = async (endpoint, method = 'GET', data = {}, requireAuth = true, params = {}) => {
  const headers = { 'Content-Type': 'application/json' };
  if (requireAuth ) {
    const token = localStorage.getItem('token');
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axiosInstance.defaults.headers.common['Authorization'];
    }
    try {
      const response = await axiosInstance({
        url: endpoint,
        method,
        data,
        params,
        headers
      });
      return response.data;
    } catch (error) {
      console.error('Error with the request:', error.response?.data || error.message);
      throw error;
    }
  } else {
    try {
      const response = await axiosInstance({
        url: endpoint,
        method,
        data,
        params,
        headers
      });
      return response.data;
    } catch (error) {
      console.error('Error with the request:', error.response?.data || error.message);
      throw error;
    }
  }
}

export default sendRequest;