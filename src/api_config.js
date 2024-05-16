import axios from "axios";

export const instance = axios.create({
<<<<<<< HEAD
    baseURL: import.meta.env.VITE_ENDPOINT,
    headers:{
      'Content-type': 'application/json',
    }
  
  });
=======
  baseURL: import.meta.env.VITE_ENDPOINT,
  headers: {
    "Content-type": "application/json",
  },
});

>>>>>>> 29073a68d5dac822b77b0c0af3b7c29c9fe999a1
export const api = axios.create({
  baseURL: import.meta.env.VITE_ENDPOINT1,
  headers: {
    "Content-type": "application/json",
  },
});
<<<<<<< HEAD
=======

export const apipdf = axios.create({
  baseURL: import.meta.env.VITE_ENDPOINTPDF,
  headers: {
    "Content-type": "application/json",
  },
});


>>>>>>> 29073a68d5dac822b77b0c0af3b7c29c9fe999a1

