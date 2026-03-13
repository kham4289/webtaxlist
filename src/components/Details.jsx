import React, { useContext, useEffect, useState } from "react";
import { getDetail } from "../services/tax.services";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
import { ValueContext } from "../context/value.context";
import Bg from "../assets/picture/taxRis_watermark2.png";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export default function Details({ data }) {
  const [taxData, setTaxData] = useState([]);
  const [updateFullName, setUpdateFullName] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const multiPrint = useContext(ValueContext);
  const currentDate = new Date();
  const date = `${currentDate.getDate()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getFullYear()}`;

  useEffect(() => {
    setTaxData([]);
    getDetail({ searchTransid: data })
      .then((data) => {
        setTaxData(data.dataDetail);
      })
      .catch((err) => console.log(err));
  }, [data]);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        .tax-invoice-container {
          height: 66vh !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleUpdate = (e) => {
    const { value } = e.target;
    setIsTyping(true);
    setUpdateFullName(value);
  };

  return (
    <>
      <div ref={multiPrint.componentPDF}>
        {taxData.map((val, index) => {
          return (
            <Typography
              key={index}
              style={{
                padding: "0rem 0rem ",
                paddingBottom: "10px",
                outline: "none",
                fontSize: "12px",
              }}
            >
              <div
                className="tax-invoice-container"
                style={{
                  orientation: "portrait",
                  width: "100%",
                  height: "100vh",
                  backgroundImage: `url(${Bg})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div style={{ padding: "0rem 1.5rem" }}>
                  <div className="header">
                    <img src="/tplus.png" alt="img" className="logo" />
                    <h2 className="header-text">
                      ໃບເກັບເງິນອາກອນມູນຄ່າເພີ່ມ/TAX INVOICE
                    </h2>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "end",
                      alignItems: "end",
                      paddingTop: "0px",
                      padding: "0rem 1.5rem",
                      paddingBottom: "3px",
                      fontWeight: "bold",
                      gap: "5px",
                    }}
                  >
                    <span>ເລກທີ: {val.Transid}</span>
                    <span style={{ textAlign: "end", paddingBottom: "10px" }}>
                      ວັນທີ: {date}
                    </span>
                  </div>
                  <Box sx={{ width: "100%", fontWeight: "bold" }}>
                    <Grid
                      container
                      rowSpacing={1}
                      paddingLeft={2}
                      // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                      className="detail"
                    >
                      <Grid item xs={6}>
                        <div
                          style={{
                            display: "flex",
                            gap: "5px",
                            alignItems: "center",
                            paddingTop: "10px",
                          }}
                        >
                          <span className="line-spacing">
                            ຊື່ວິສະຫະກິດ ( ຜູ້ຂາຍ ) :
                          </span>
                          <span
                            className="line-spacing"
                            style={{ fontWeight: "bold" }}
                          >
                            ທີພລັດ ດີຈີຕອນ ຈຳກັດຜູ້ດຽວ
                          </span>
                        </div>
                        <p className="line-spacing">
                          ທີ່ຕັ້ງ: ຖະໜົນ ສາຍລົມ, ບ້ານ: ສາຍລົມ,
                        </p>
                        <p className="line-spacing">
                          ເມືອງ: ຈັນທະບູລີ, ນະຄອນຫຼວງວຽງຈັນ
                        </p>
                        <p className="line-spacing">ໂທລະສັບ: 020 77800700 </p>
                        <p className="line-spacing">
                          ເລກປະຈຳຕົວຜູ້ເສຍອາກອນ: 556102964-900{" "}
                        </p>
                        <p className="line-spacing">
                          ຊື່ບັນຊີທະນາຄານ: TPLUS DIGITAL SOLE CO.,
                        </p>
                        <p className="line-spacing">LTD_OTHERS BRANCH</p>
                        <p className="line-spacing">
                          ເລກບັນຊີທະນາຄານ: 010110000387946001
                        </p>
                      </Grid>

                      <Grid item xs={6}>
                        <div
                          style={{
                            display: "flex",
                            gap: "5px",
                            alignItems: "center",
                          }}
                        >
                          <span className="line-spacing">
                            ຊື່ວິສາຫະກິດ( ຜູ້ຊື້ ) :
                          </span>
                          <span>
                            <input
                              onChange={handleUpdate}
                              name="BY_FULL_NM"
                              className="inputtax"
                              style={{ fontSize: "12px" }}
                              value={
                                updateFullName !== "" || isTyping
                                  ? updateFullName
                                  : val.BY_FULL_NM
                              }
                            />
                          </span>
                        </div>

                        <div>
                          <span>
                            ທີ່ຕັ້ງ: ຖະໜົນ:
                            <input
                              autoComplete="off"
                              className="address"
                            />{" "}
                          </span>
                          <span>
                            , ບ້ານ:
                            <input autoComplete="off" className="address" />
                          </span>
                          <span>
                            , ເມືອງ:
                            <input autoComplete="off" className="address" />
                          </span>
                          <span>
                            , ແຂວງ:
                            <input autoComplete="off" className="province" />
                          </span>
                        </div>

                        <p className="line-spacing">ໂທລະສັບ: {val.TIN}</p>
                        <p className="line-spacing">
                          ເລກປະຈຳຕົວຜູ້ຊື້: {val.BY_TIN}
                        </p>
                        <p className="line-spacing">ຊື່ບັນຊີທະນາຄານ:</p>
                        <p className="line-spacing">ເລກບັນຊີທະນາຄານ:</p>
                        <p className="line-spacing">ຮູບແບບການສຳລະສະສາງ:</p>
                      </Grid>
                    </Grid>
                  </Box>

                  <div className="detail" style={{ marginTop: "5px" }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          {/* <TableCell
                            style={{ fontSize: "12px", fontWeight: "bold" }}
                          >
                            ລ/ດ
                          </TableCell> */}
                          <TableCell
                            style={{ fontSize: "12px", fontWeight: "bold", padding: "0rem 1rem" }}
                          >
                            ເນື້ອໃນລາຍການ
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{ fontSize: "12px", fontWeight: "bold", padding: "0.1rem 1rem" }}
                          >
                            ຫົວໜ່ວຍ
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{ fontSize: "12px", fontWeight: "bold", padding: "0.1rem 1rem" }}
                          >
                            ຈຳນວນ
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{ fontSize: "12px", fontWeight: "bold", padding: "0.1rem 1rem" }}
                          >
                            ລາຄາຫົວໜ່ວຍ
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{ fontSize: "12px", fontWeight: "bold", padding: "0.1rem 1rem" }}
                          >
                            ລວມເປັນເງິນ
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      {val.list.map((item, index) => {
                        return (
                          <TableBody key={index}>
                            {/* <TableCell
                              style={{ fontSize: "12px", fontWeight: "bold" }}
                            >
                              {index + 1}
                            </TableCell> */}
                            <TableCell
                              style={{ fontSize: "12px", fontWeight: "bold", padding: "0.1rem 1rem" }}
                            >
                              {item.HS_NM}
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{ fontSize: "12px", fontWeight: "bold", padding: "0.1rem 1rem" }}
                            >
                              {item.UNIT_SALE}
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{ fontSize: "12px", fontWeight: "bold", padding: "0.1rem 1rem" }}
                            >
                              <NumericFormat
                                value={item.SALE_CNT}
                                displayType="text"
                                thousandSeparator=","
                                allowLeadingZeros
                              />
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{ fontSize: "12px", fontWeight: "bold", padding: "0.1rem 1rem" }}
                            >
                              <NumericFormat
                                value={item.UNIT_SALE_AMT}
                                displayType="text"
                                thousandSeparator=","
                                allowLeadingZeros
                              />
                            </TableCell>
                            <TableCell
                              align="right"
                              style={{ fontSize: "12px", fontWeight: "bold", padding: "0.1rem 1rem" }}
                            >
                              <NumericFormat
                                value={item.SUPL_AMT}
                                suffix={" ກີບ"}
                                displayType="text"
                                thousandSeparator=","
                                allowLeadingZeros
                                decimalScale={2}
                                fixedDecimalScale={true}
                              />
                            </TableCell>
                          </TableBody>
                        );
                      })}
                    </Table>
  
                  <table style={{borderCollapse: "collapse"}}>
                    <tbody>
                      <tr>
                        <td style={{ fontWeight: "bold", padding: "0.2rem 1rem" }}>
                          ຄ່າໃຊ້ບໍລິການບໍ່ລວມອາກອນ / New charge in Month:
                        </td>
                        <td style={{ textAlign: "right", padding: "0.2rem 1rem", fontWeight: "bold" }}>
                          <NumericFormat
                            value={val.SUPL_AMT}
                            suffix={" ກີບ"}
                            displayType={"text"}
                            decimalScale={2}
                            allowLeadingZeros
                            thousandSeparator=","
                          />
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold", padding: "0.2rem 1rem" }}>
                          ອັດຕາອາກອນມູນຄ່າເພີ່ມ 10% / VAT:
                        </td>
                        <td style={{ textAlign: "right", padding: "0.2rem 1rem", fontWeight: "bold" }}>
                          <NumericFormat
                            value={val.VAT_AMT}
                            suffix={" ກີບ"}
                            displayType={"text"}
                            decimalScale={2}
                            allowLeadingZeros
                            thousandSeparator=","
                          />
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold", padding: "0.2rem 1rem" }}>
                          ມູນຄ່າໃຊ້ບໍລິການລວມອາກອນ / Total Amount Due:
                        </td>
                        <td style={{ textAlign: "right", padding: "0.2rem 1rem", fontWeight: "bold" }}>
                          <NumericFormat
                            value={val.TOTAL_AMT}
                            suffix={" ກີບ"}
                            displayType={"text"}
                            decimalScale={2}
                            allowLeadingZeros
                            thousandSeparator=","
                          />
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold", padding: "0.2rem 1rem" }}>
                          ມູນຄ່າທີ່ຄ້າງຈ່າຍ / Total Previous Debt:
                        </td>
                        <td style={{ textAlign: "right", padding: "0.2rem 1rem", fontWeight: "bold" }}>
                          <NumericFormat
                            value={val.PREVIOUS_DEBT}
                            suffix={" ກີບ"}
                            displayType={"text"}
                            decimalScale={2}
                            allowLeadingZeros
                            thousandSeparator=","
                          />
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold", padding: "0.2rem 1rem" }}>
                          ມູນຄ່າທີ່ຈ່າຍເກີນ / Total Advance:
                        </td>
                        <td style={{ textAlign: "right", padding: "0.2rem 1rem", fontWeight: "bold" }}>
                          <NumericFormat
                            value={val.ADVANCE_PAYMENT}
                            suffix={" ກີບ"}
                            displayType={"text"}
                            decimalScale={2}
                            allowLeadingZeros
                            thousandSeparator=","
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                    {/* <Grid
                      className="line-spacing "
                      display={"flex"}
                      justifyContent={"space-between"}
                    >
                      <Grid padding={"0rem 1rem"} fontWeight={"bold"}>
                        <p>ຄ່າໃຊ້ບໍລິການບໍ່ລວມອາກອນ / New charge in Month:</p>
                        <p>ອັດຕາອາກອນມູນຄ່າເພີ່ມ 10% / VAT:</p>
                        <p>ມູນຄ່າໃຊ້ບໍລິການລວມອາກອນ / Total Amount Due :</p>
                        <p>ມູນຄ່າທີ່ຄ້າງຈ່າຍ / total Pervious Debt:</p>
                        <p>ມູນຄ່າທີ່ຈ່າຍເກີນ / Total Advance:</p>
                      </Grid>
                      
                      <Grid
                        textAlign={"end"}
                        fontWeight={"bold"}
                        padding={"0rem 1rem"}
                      >
                        <p>
                          <NumericFormat
                            value={val.SUPL_AMT}
                            suffix={" ກີບ"}
                            displayType={"text"}
                            decimalScale={2}
                            allowLeadingZeros
                            thousandSeparator=","
                          />
                        </p>
                        <p>
                          <NumericFormat
                            value={val.VAT_AMT}
                            suffix={" ກີບ"}
                            displayType={"text"}
                            decimalScale={2}
                            allowLeadingZeros
                            thousandSeparator=","
                          />
                        </p>
                      </Grid>
                    </Grid> */}
                  </div>
                </div>
              </div>
              <div style={{ padding: "0rem 2.5rem" }}>
                <Grid
                  display={"flex"}
                  justifyContent={"space-between"}
                  fontWeight={"bold"}
                >
                  <Grid className="line-spacing">
                    <p>ຄ່າຮັກສາຄວາມປອດໄພ / Security Fee: {""}</p>
                    <h4>ລວມມູນຄ່າທັງໝົດ / Total Balance : {""}</h4>
                    <h4>ຈຳນວນເງິນທີ່ຂຽນເປັນຕົວໜັງສື: {val.amtConvert}</h4>
                  </Grid>
                  <Grid className="line-spacing" textAlign={"end"}>
                    <p>
                      <NumericFormat
                        value={val.SecurityFee}
                        suffix={" ກີບ"}
                        displayType={"text"}
                        decimalScale={2}
                        allowLeadingZeros
                        thousandSeparator=","
                      />
                    </p>
                    <p>
                      <NumericFormat
                        value={val.SALE_AMT}
                        suffix={" ກີບ"}
                        displayType={"text"}
                        decimalScale={2}
                        allowLeadingZeros
                        thousandSeparator=","
                      />
                    </p>
                  </Grid>
                </Grid>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    with: "100%",
                    alignItems: "flex-end",
                    fontWeight: "bold",
                  }}
                >
                  <p className="line-spacing">
                    ວັນທີ:.........................
                  </p>
                  <p className="line-spacing">
                    ວັນທີ:............................
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    fontWeight: "bold",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      lineHeight: "0.8",
                    }}
                  >
                    <h4>ຜູ້ຊື້</h4>
                    <p>(ລາຍເຊັນ ແລະ ປະທັບຕາ)</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      lineHeight: "0.8",
                    }}
                  >
                    <h4>ຜູ້ຂາຍ</h4>
                    <p>(ລາຍເຊັນ ແລະ ປະທັບຕາ)</p>
                  </div>
                </div>
              </div>
            </Typography>
          );
        })}
      </div>
    </>
  );
}
