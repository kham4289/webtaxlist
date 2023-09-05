import axios from "axios";

export const instance = axios.create({
    baseURL: import.meta.env.VITE_ENDPOINT,
    //timeout: 30000,
    headers:{
      'Content-type': 'application/json',
    }
  
  });

// export const instance_query = axios.post({
//     baseURL: import.meta.env.VITE_ENDPOINT,
//     timeout: 30000,
//     headers:{
//       'Content-type': 'application/json',
//     }
  
//   });
