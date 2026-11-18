
import { instance, api } from "../api_config";

const formatApiDate = (value) => {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value.format === "function") return value.format("YYYY-MM-DD");
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return "";
};

const normalizeTaxListFilters = (data) => ({
  ...data,
  fromDate: formatApiDate(data?.fromDate),
  toDate: formatApiDate(data?.toDate),
});

export const getTaxMain = async (data) => {
  try {
    let res = await instance.post("/taxTplus/all", normalizeTaxListFilters(data));
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
    let res = await instance.post("/taxTplus/find", normalizeTaxListFilters(data));
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
    return { cbsDetail: res.data.detail };
  } catch (err) {
    return null;
  }
};
