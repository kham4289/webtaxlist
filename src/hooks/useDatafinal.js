
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { instance } from "../api_config";

export const useDatafinal = () =>{
    // const navigate = useNavigate();
   
    return useMutation({
        mutationKey:["insertData"],
        mutationFn:async(data) =>{
            const result = await instance.post("/taxTplus", data)
                return result.data
        },
        onError:(error) =>{
            return toast.error(error.response?.data?.resultDesc, { position: toast.POSITION.TOP_RIGHT });
        },
        onSuccess:() =>{
            localStorage.removeItem("firstData");
            localStorage.removeItem("listData");
            toast.success("Successfully !", { position: toast.POSITION.TOP_RIGHT });
            setTimeout(() => {
                window.location.reload();
            }, 4000);
        } 
    });
}