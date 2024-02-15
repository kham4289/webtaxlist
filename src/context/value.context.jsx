import { createContext, useState } from "react";
import { format } from "date-fns";
import { usePersistData } from "../hooks/usePersistData";
import { useDatafinal } from "../hooks/useDatafinal";
import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
export const ValueContext = createContext();

const firstIntial = {
  TIN: "",
  INV_NO: "",
  INV_DD: "",
  BY_TIN: "",
  BY_FULL_NM: "",
  SALE_CNT: "",
  SUPL_AMT: "",
  SVC_FEE: "",
  EXCISE_AMT: "",
  VAT_AMT: "",
  SALE_AMT: "",
  DISC_AMT: "",
  SALE_CNCL_CNT: "",
  SALE_CNCL_AMT: "",
  CDATE: format(Date.now(), "yyyy-MM-dd hh:mm:ss"),
};

const secondIntial = {
  HS_CD: "",
  HS_NM: "",
  SALE_CNT: "",
  OTH_CD: "",
  UNIT_SALE: "",
  UNIT_SALE_AMT: "",
  SUPL_AMT: "",
  EXCISE_AMT: "",
  VAT_AMT: "",
  SALE_AMT: "",
  CDATE: format(Date.now(), "yyyy-MM-dd hh:mm:ss"),
};

export const ValueProvider = (props) => {
  const { children } = props;
  const [Value, setValue] = useState(1);
  const [currentStep, setStep] = useState(0);
  const [first, setFirst] = useState(firstIntial);
  const [second, setSecond] = useState(secondIntial);
  const [list, setList] = useState([]);
  const { isLoading, mutate, error } = useDatafinal();
  const componentPDF = useRef();
  

  usePersistData({ setFirst, setList, setStep });

  const handleChange1 = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFirst((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitFirst = (e, data) => {
    e.preventDefault();
    setStep(data.nextStep);
    localStorage.setItem("firstData", JSON.stringify(first));
    localStorage.setItem("step", JSON.stringify(data.nextStep));
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setSecond((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmitSecond = (e) => {
    e.preventDefault();
    setList((prev) => [...prev, second]);
    localStorage.setItem("listData", JSON.stringify([...list, second]));
    setSecond(secondIntial);
  };

  const handleSubmitFinal = (e) => {
    e.preventDefault();
    // toast.success("Successfully !", { position: toast.POSITION.TOP_RIGHT });
    const data = {
      CrsPfms: {
        ...first,
        list,
      },
    };
    mutate(data);
  };

   const generatePDF = useReactToPrint({
     content: () => componentPDF.current,
     onAfterPrint: () => {
       toast.success("Successfully !", { position: toast.POSITION.TOP_RIGHT });
       setTimeout(() => {}, 2000);
     },
   });
   
  return (
    <ValueContext.Provider
      value={{
        Value,
        setValue,
        currentStep,
        setStep,
        handleSubmitFirst,
        handleSubmitSecond,
        handleChange1,
        handleChange2,
        first,
        setFirst,
        second,
        setSecond,
        list,
        setList,
        handleSubmitFinal,
        isLoading,
        error,
        generatePDF,
        componentPDF,
      }}
    >
      {children}
    </ValueContext.Provider>
  );
};
