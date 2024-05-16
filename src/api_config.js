import axios from "axios";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_ENDPOINT,
  headers: {
    "Content-type": "application/json",
  },
});

export const api = axios.create({
  baseURL: import.meta.env.VITE_ENDPOINT1,
  headers: {
    "Content-type": "application/json",
  },
});
