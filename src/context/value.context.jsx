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
  const componentPDF = useRef(null);


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
    pageStyle: `
     @page {
       size: A4;
       margin: 0;
     }
     @media print {
       html, body {
         margin: 0 !important;
         padding: 0 !important;
         width: 210mm !important;
         background: none !important;
         -webkit-print-color-adjust: exact !important;
         print-color-adjust: exact !important;
         color-adjust: exact !important;
       }

       * {
         -webkit-print-color-adjust: exact !important;
         print-color-adjust: exact !important;
         color-adjust: exact !important;
         box-sizing: border-box !important;
       }

       .a4-page {
         width: 210mm !important;
         height: 297mm !important;
         page-break-after: always !important;
         overflow: hidden !important;
         display: flex !important;
         flex-direction: column !important;
         margin: 0 !important;
         padding: 0 !important;
         position: relative !important;
       }

       .tax-invoice-container {
         width: 210mm !important;
         -webkit-print-color-adjust: exact !important;
         print-color-adjust: exact !important;
         color-adjust: exact !important;
         background-repeat: no-repeat !important;
         background-size: 100% 100% !important;
         background-position: center !important;
         page-break-inside: avoid !important;
         break-inside: avoid !important;
         overflow: hidden !important;
       }

       .page-footer-img {
         -webkit-print-color-adjust: exact !important;
         print-color-adjust: exact !important;
         color-adjust: exact !important;
         position: absolute !important;
         bottom: 0 !important;
         left: 0 !important;
         width: 100% !important;
         height: 80px !important;
         object-fit: fill !important;
         display: block !important;
       }

       .a4-page table {
         font-size: inherit !important;
         width: 100% !important;
         table-layout: fixed !important;
       }
     }
  `,
    onAfterPrint: () => {
      toast.success("Successfully !", { position: toast.POSITION.TOP_RIGHT });
      setTimeout(() => { }, 2000);
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
