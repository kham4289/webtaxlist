import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { api, instance } from "../api_config";

export const useDatafinal = () => {
  // const navigate = useNavigate();

  return useMutation({
    mutationKey: ["insertData"],
    mutationFn: async (data) => {
      const result = await instance.post("/taxTplus", data);
      return result.data;
    },
    onError: (error) => {
      return toast.error(error.response?.data?.resultDesc, {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
    onSuccess: () => {
      localStorage.removeItem("firstData");
      localStorage.removeItem("listData");
      toast.success("Successfully !", { position: toast.POSITION.TOP_RIGHT });
      setTimeout(() => {
        window.location.reload();
      }, 4000);
    },
  });
};

export const useCancel = () => {
  return useMutation({
    mutationKey: ["cancelBil"],
    mutationFn: async (data) => {
      const res = await instance.post("/taxTplus/cancelBill", data);
      return res.data;
    },
    onSuccess: (_cancel) => {
      toast.success("ຍົກເລີກສຳເລັດ...", { position: toast.POSITION.TOP_RIGHT });
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    },
    onError: (_error) => {
      toast.error("error");
    },
  });
};

export const getCBS = (setPhone) => {
  return useMutation({
    mutationKey: ["getcbs"],
    mutationFn: async (data) => {
      const res = await api.post("/customerID", data);
      return res.data.detail;
    },
    onSuccess: (response) => {
      setPhone(response);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
};

// export const getCBS = (setPhone) => {
//   return useMutation({
//     mutationKey: ["getcbs"],
//     mutationFn: async (data) => {
//       const res = await api.post("/tplusbcservices/QueryCustomerInfo", data);
//       console.log(res)
//       return res.data.Envelope.Body.QueryCustomerInfoResultMsg
//         .QueryCustomerInfoResult.Account.AcctInfo.AcctCode;
//     },
//     onSuccess: (getResponse) => {
//       setPhone(getResponse);
//     },
//     onError: (error) => {
//       toast.error(error.message);
//       console.log(error);
//     },
//   });
// };
