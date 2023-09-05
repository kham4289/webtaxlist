import  React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { ValueContext } from "../context/value.context";


const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
  color: "black",
  borderRadius: "1rem",
}));

export const CardItemAlldata = () => {
  const { first } = useContext(ValueContext);

  return (
    <div
      style={{
        marginTop: "2rem",
      }}
    >
      <Box sx={{ flexGrow: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <span className="formtax">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <p>TIN:</p>
                <p>{first.TIN}</p>
              </div>
            </span>
          </Grid>
          <Grid item xs={6}>
            <span className="formtax">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <p>INV_NO:</p>
                <p>{first.INV_NO}</p>
              </div>
            </span>
          </Grid>
          {/* <Grid item xs={6}>
            <span className="formtax">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <p>INV_DD:</p>
                <p>{first.INV_DD}</p>
              </div>
            </span>
          </Grid> */}
          <Grid item xs={6}>
            <span className="formtax">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <p>BY_TIN:</p>
                <p>{first.BY_TIN}</p>
              </div>
            </span>
          </Grid>
          <Grid item xs={6}>
            <span className="formtax">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <p>BY_FULL_NM:</p>
                <p>{first.BY_FULL_NM}</p>
              </div>
            </span>
          </Grid>
          <Grid item xs={6}>
            <span className="formtax">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <p>SALE_CNT:</p>
                <p>{first.SALE_CNT}</p>
              </div>
            </span>
          </Grid>
          <Grid item xs={6}>
            <span className="formtax">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <p>SUPL_AMT:</p>
                <p>{first.SUPL_AMT}</p>
              </div>
            </span>
          </Grid>
          <Grid item xs={6}>
            <span className="formtax">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <p>SVC_FEE:</p>
                <p>{first.SVC_FEE}</p>
              </div>
            </span>
          </Grid>
          <Grid item xs={6}>
            <span className="formtax">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <p>EXCISE_AMT:</p>
                <p>{first.EXCISE_AMT}</p>
              </div>
            </span>
          </Grid>
          <Grid item xs={6}>
            <span className="formtax">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <p>VAT_AMT:</p>
                <p>{first.VAT_AMT}</p>
              </div>
            </span>
          </Grid>
          <Grid item xs={6}>
            <span className="formtax">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <p>SALE_AMT:</p>
                <p>{first.SALE_AMT}</p>
              </div>
            </span>
          </Grid>
          <Grid item xs={6}>
            <span className="formtax">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <p>DISC_AMT:</p>
                <p>{first.DISC_AMT}</p>
              </div>
            </span>
          </Grid>
          <Grid item xs={6}>
            <span className="formtax">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <p>SALE_CNCL_CNT:</p>
                <p>{first.SALE_CNCL_CNT}</p>
              </div>
            </span>
          </Grid>
          <Grid item xs={6}>
            <span className="formtax">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <p>SALE_CNCL_AMT:</p>
                <p>{first.SALE_CNCL_AMT}</p>
              </div>
            </span>
          </Grid>
          <Grid item xs={6}>
            <span className="formtax">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <p>CDATE:</p>
                <p>{first.CDATE}</p>
              </div>
            </span>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
