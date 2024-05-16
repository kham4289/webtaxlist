<<<<<<< HEAD

import { instance, api } from "../api_config";
=======
import { api, instance } from "../api_config";
>>>>>>> 29073a68d5dac822b77b0c0af3b7c29c9fe999a1

export const getTaxMain = async (data) => {
  try {
    let res = await instance.post("/taxTplus/all", data);
    // console.log({ rowcount:res.data.detail.recordCount, dataaray:res.data.detail.dataArray });
    // return res.send({ ...data.detail.recordCount,...data.detail.dataArray})
    return {
      rowcount: res.data.detail.recordCount,
      dataaray: res.data.detail.dataArray,
    };
  } catch (error) {
    return null;
  }
};

export const getSent = async (data) => {
  try {
    let res = await instance.post("/taxTplus/find", data);
    // return res.data.detail.dataArray
    return {
      rowcount: res.data.detail.recordCount,
      dataaray: res.data.detail.dataArray,
    };
  } catch (error) {
    return null;
  }
};

export const getDetail = async (data) => {
  try {
    let res = await instance.post("/taxTplus/details", data);
    return { dataDetail: res.data.detail };
  } catch (error) {
    return null;
  }
};
export const getCBS = async (data) => {
  try {
    let res = await api.post("/customerID", data);

<<<<<<< HEAD
    return { cbsDetail: res.data.detail };
=======
export const getCBS = async (data) => {
  try {
    let res = await api.post("/customerID", data);

    return {cbsDetail: res.data.detail};
>>>>>>> 29073a68d5dac822b77b0c0af3b7c29c9fe999a1
  } catch (err) {
    return null;
  }
};
