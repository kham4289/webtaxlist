import { Button } from "@mui/material";
import { Stack } from "@mui/system";
// import axios from "axios";
// var axios = require("axios").default;
import { useReducer } from "react";
import { useState } from "react";
import { instance } from "../api_config";
import AlertDialog from "../components/snackBar";

import MyTextField from "../components/textField";
import postTextreducer from "../reducers/postTax.reducer";

import CircularProgress from "@mui/material/CircularProgress";
import { format } from "date-fns";

export default function Home() {
  const initialList = [
    {
      HS_CD: "32324",
      HS_NM: "tetsee",
      SALE_CNT: "1",
      OTH_CD: "",
      UNIT_SALE: "pices",
      UNIT_SALE_AMT: "2000",
      SUPL_AMT: "1000",
      EXCISE_AMT: "0",
      VAT_AMT: "10",
      SALE_AMT: "1010",
      CDATE: format(Date.now(), "yyyy-MM-dd hh:mm:ss"),
    },
  ];
  const [list, setList] = useState(initialList);
  const initialData = {
    HASH_KEY: import.meta.env.VITE_HASH_KEY,
    CrsPfms: {
      TIN: "123456789001",
      INV_NO: "2343",
      INV_DD: "20210907",
      BY_TIN: "123456789001",
      BY_FULL_NM: "tplus_test",
      SALE_CNT: "1",
      SUPL_AMT: "10001",
      SVC_FEE: "0",
      EXCISE_AMT: "0",
      VAT_AMT: "10",
      SALE_AMT: "1010",
      DISC_AMT: "0",
      SALE_CNCL_CNT: "0",
      SALE_CNCL_AMT: "0",
      ERROR_DESC: "0",
      ERROR_CODE: "0",
      Send_Date: format(Date.now(), "yyyy-MM-dd hh:mm:ss"),
      Send_STATUS: "0",
      CDATE: format(Date.now(), "yyyy-MM-dd hh:mm:ss"),
      list: list,
    },
  };

  const [data, setData] = useState(initialData);

  const [state, dispatch] = useReducer(postTextreducer, {
    success: false,
    err: false,
    loading: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.loading) {
      return;
    }
    // alert(JSON.stringify(data));
    console.log(data);

    dispatch({
      type: "post",
    });

    instance
      .post("/taxTplus", data)
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: "error",
          message: err?.message,
        });
      });
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <AlertDialog
        color="success"
        open={state.success}
        handleClose={() => {
          dispatch({
            type: "reset",
          });
        }}
        label="ສໍາເລັດການສົ່ງ!"
      />
      <AlertDialog
        color="error"
        open={state.err}
        handleClose={() => {
          dispatch({
            type: "reset",
          });
        }}
        label={`ເກີດຂໍ້ຜິດພາດ, ກາລຸນາກວດສອບ!, ${state.message || null}`}
      />

      <form
        onSubmit={(e) => {
          handleSubmit(e);
          // handleXml(e)
          // handleSubmitTest(e)
        }}
      >
        <Stack direction={"column"} spacing={2}>
          <div className="box" style={{ padding: "0px" }}>
            <div className="form">
              <MyTextField
                label="Taxpayer ID"
                // placeholder="Taxpayer ID"
                onChange={() => { }}
                required={true}
              />
              <MyTextField
                label="Invioce ID"
                onChange={() => { }}
                required={true}
              />
              <MyTextField
                label="Invoice Date"
                placeholder="YYYYMMDD"
                onChange={() => { }}
                required={true}
              />
              <MyTextField
                label="Buyer TIN"
                // placeholder="ID"
                onChange={() => { }}
                required={true}
              />
              <MyTextField
                label="Buyer Name"
                // placeholder="ID"
                onChange={() => { }}
                required={true}
              />
              <MyTextField
                label="Count of Detail Lists"
                onChange={() => { }}
                required={true}
              />
              <MyTextField
                label="Total Sale amount Before Tax"
                onChange={() => { }}
                required={true}
              />
              <MyTextField
                label="Service Fee"
                onChange={() => { }}
                required={true}
              />
              <MyTextField
                label="Total Excise Tax"
                onChange={() => { }}
                required={true}
              />
              <MyTextField
                label="Total VAT"
                onChange={() => { }}
                required={true}
              />
              <MyTextField
                label="Total Sale Amount include Taxes"
                onChange={() => { }}
                required={true}
              />
              <MyTextField
                label="Discount Amount"
                onChange={() => { }}
                required={true}
              />
              <MyTextField
                label="Number of Cancel"
                onChange={() => { }}
                required={true}
              />
              <MyTextField
                label="Cancel Amount"
                onChange={() => { }}
                required={true}
              />
            </div>
            <br />
            <div className="bottom-form">
              <Button
                // type="submit"
                onClick={(e) => handleSubmit(e)}
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
    </div>
  );
}
