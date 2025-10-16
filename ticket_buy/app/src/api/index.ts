import axios from 'axios';

const API_BASE_URL = 'http://192.168.18.7:8080/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});