import axios from 'axios';

const API_URL = 'http://192.168.0.10:8080/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});