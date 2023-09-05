import React from 'react'
import { Button } from "@mui/material";
import { Stack } from "@mui/system";
// var axios = require("axios").default;
import { useReducer } from "react";
import { useState } from "react";

import MyTextField from "../components/textField";
import postTextreducer from "../reducers/postTax.reducer";

import CircularProgress from "@mui/material/CircularProgress";
import { format } from "date-fns";

const firstIntial ={
            TIN: "",
            INV_NO: "",
            // INV_DD: "",
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
            CDATE:format(Date.now(), 'yyyy-MM-dd hh:mm:ss'),
}

const secondIntial ={
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
            CDATE: format(Date.now(), 'yyyy-MM-dd hh:mm:ss')
}

function insertData() {
    const [first, setFirst] = useState(firstIntial)
    const [second, setSecond] = useState(secondIntial)
    const [list, setList] = useState([])

     const [state, dispatch] = useReducer(postTextreducer, {
        success: false,
        err: false,
        loading: false,
    });

const handleChange1 =(e)=>{
    const { name, value } = e.target;
    setFirst((prev) => ({ ...prev, [name]: value }));
   
}

const handleChange2 =(e)=>{
    const { name, value } = e.target;
    setSecond((prev) => ({ ...prev, [name]: value }));
}
const handleSubmitFirst = (e) =>{
     e.preventDefault();
        if (state.loading) {
            return;
        }
        // alert(JSON.stringify(data));
        console.log(first);
}
const handleSubmitSecond = (e) =>{
     e.preventDefault();
        setList(prev=>([...prev,second])
        
        )

}
console.log(list[0]);
// useEffect(()=>{
    
// },[])

const final={
    HASH_KEY: import.meta.env.VITE_HASH_KEY,
    CrsPfms:{
            ...first, list:list
    }
}

  return (
    <div>
        <form
                onSubmit={handleSubmitFirst}
            >
                <Stack direction={"column"} spacing={2}>
                    <div className="box" style={{padding: "0px"}}>
                        <div className="form">
                            <MyTextField
                                label="Taxpayer ID"
                                name="TIN"
                                value={first.TIN}
                                onChange={handleChange1}
                                required
                            />
                            <MyTextField
                                label="Invioce NO"
                                name="INV_NO"
                                value={first.INV_NO}
                                onChange={handleChange1}
                                required
                            />
                            <MyTextField
                                label="Invoice Date"
                                name="INV_DD"
                                value={first.INV_DD}
                                onChange={handleChange1}
                                required
                            />
                            <MyTextField
                                label="Buyer TIN"
                                 name="BY_TIN"
                                value={first.BY_TIN}
                                onChange={handleChange1}
                                required={true}
                            />
                            <MyTextField
                                label="Buyer Name"
                                 name="BY_FULL_NM"
                                value={first.BY_FULL_NM}
                                onChange={handleChange1}
                                required
                            />
                            <MyTextField
                                label="Count of Detail Lists"
                                 name="SALE_CNT"
                                value={first.SALE_CNT}
                                onChange={handleChange1}
                                required
                            />
                             <MyTextField
                                label="SUPL_AMT "
                                 name="SUPL_AMT"
                                value={first.SUPL_AMT}
                                onChange={handleChange1}
                                required={true}
                            />
                             <MyTextField
                                label="Service Fee"
                                name="SVC_FEE"
                                value={first.SVC_FEE}
                                onChange={handleChange1}
                                required
                            />
                             <MyTextField
                                label="EXCISE_AMT"
                                 name="EXCISE_AMT"
                                value={first.EXCISE_AMT}
                                onChange={handleChange1}
                                required
                            />
                             <MyTextField
                                label="VAT_AMT"
                                 name="VAT_AMT"
                                value={first.VAT_AMT}
                                onChange={handleChange1}
                                required
                            />
                             <MyTextField
                                label="SALE_AMT"
                                 name="SALE_AMT"
                                value={first.SALE_AMT}
                                onChange={handleChange1}
                                required
                            />
                             <MyTextField
                                label="DISC_AMT"
                                 name="DISC_AMT"
                                value={first.DISC_AMT}
                                onChange={handleChange1}
                                required
                            />
                             <MyTextField
                                label="SALE_CNCL_CNT"
                                 name="SALE_CNCL_CNT"
                                value={first.SALE_CNCL_CNT}
                                onChange={handleChange1}
                                required
                            />
                             <MyTextField
                                label="SALE_CNCL_AMT"
                                name="SALE_CNCL_AMT"
                                value={first.SALE_CNCL_AMT}
                                onChange={handleChange1}
                                required
                            />
                            <MyTextField
                                placeholder="YYYYMMDD"
                                label="CDATE"
                                name="CDATE"
                                value={first.CDATE}
                                onChange={handleChange1}
                                required
                            />
                            
                        </div>
                        <br />
                        <div className="bottom-form">
                            <Button
                                type="submit"
                                // onClick={(e)=> handleSubmit(e)}
                                disableElevation
                                variant="contained"
                                sx={{ minWidth: "5rem", height: "2.9rem" }}
                            >
                                <Stack direction="row" spacing={2} alignItems="center">
                                    {state.loading ? (
                                        <CircularProgress size={25} color="inherit" />
                                    ) : null}

                                    <span>ຕົກລົງ</span>
                                </Stack>
                            </Button>
                        </div>
                    </div>
                </Stack>
            </form><br /><br /><br />
            
            <form
                onSubmit={handleSubmitSecond}
            >
                <Stack direction={"column"} spacing={2}>
                    <div className="box" style={{padding: "0px"}}>
                        <div className="form">
                            <MyTextField
                                label="HS_CD"
                                name="HS_CD"
                                value={second.HS_CD}
                                onChange={handleChange2}
                                required={true}
                            />
                            <MyTextField
                                label="HS_NM"
                                name="HS_NM" 
                                value={second.HS_NM}
                                onChange={handleChange2}
                                required={true}
                            />
                                 <MyTextField
                                label="SALE_CNT"
                                name="SALE_CNT" 
                                value={second.SALE_CNT}
                                onChange={handleChange2}
                                required={true}
                            />
                            <MyTextField
                                label="OTH_CD"
                                name="OTH_CD"
                                value={second.OTH_CD}
                                onChange={handleChange2}
                                required={true}
                            />
                            <MyTextField
                                label="UNIT_SALE"
                               name="UNIT_SALE"
                                value={second.UNIT_SALE}
                                onChange={handleChange2}
                                required={true}
                            />
                            <MyTextField
                                label="UNIT_SALE_AMT"
                                name="UNIT_SALE_AMT"
                                value={second.UNIT_SALE_AMT}
                                onChange={handleChange2}
                                required={true}
                            />
                            <MyTextField
                                label="SUPL_AMT"
                                name="SUPL_AMT"
                                value={second.SUPL_AMT}
                                onChange={handleChange2}
                                required={true}
                            />
                             <MyTextField
                                label="EXCISE_AMT"
                                name="EXCISE_AMT"
                                value={second.EXCISE_AMT}
                                onChange={handleChange2}
                                required={true}
                            />
                             <MyTextField
                                label="VAT_AMT"
                                name="VAT_AMT"
                               value={second.VAT_AMT}
                                onChange={handleChange2}
                                required={true}
                            />
                             <MyTextField
                                label="SALE_AMT"
                                name="SALE_AMT"
                                value={second.SALE_AMT}
                                onChange={handleChange2}
                                required={true}
                            />
                             <MyTextField
                                label="CDATE"
                                placeholder="YYYYMMDD"
                                name="CDATE"
                                value={second.CDATE}
                                onChange={handleChange2}
                                required={true}
                            />
                             
                        </div>
                        <br />
                        <div className="bottom-form">
                            <Button
                                type="submit"
                                // onClick={(e)=> handleSubmit(e)}
                                disableElevation
                                variant="contained"
                                sx={{ minWidth: "5rem", height: "2.9rem" }}
                            >
                                <Stack direction="row" spacing={2} alignItems="center">
                                    {state.loading ? (
                                        <CircularProgress size={25} color="inherit" />
                                    ) : null}

                                    <span>ຕົກລົງ</span>
                                </Stack>
                            </Button>
                        </div>
                    </div>
                </Stack>
            </form>

{/* setepper */}


    
    </div>
  )
}

export default insertData


