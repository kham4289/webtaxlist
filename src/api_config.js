import axios from "axios";

export const instance = axios.create({
    baseURL: import.meta.env.VITE_ENDPOINT,
    headers:{
      'Content-type': 'application/json',
    }
  
  });

