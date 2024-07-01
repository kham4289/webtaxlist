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
import Bg from "../assets/picture/BG12.png";
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

  const handleUpdate = (e) => {
    const { value } = e.target;
    setIsTyping(true);
    setUpdateFullName(value);
  };

  return (
    <>
      <div
        ref={multiPrint.componentPDF}
        style={{
          orientation: "portrait",
          width: "100%",
          height: "1120px",
          backgroundImage: `url(${Bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          marginBottom: 10,
        }}
      >
        {taxData.map((val, index) => {
          return (
            <Typography
              key={index}
              style={{
                padding: "1.5rem 4rem ",
                paddingBottom: "20px",
                outline: "none",
                fontSize: "14px",
              }}
            >
              <h2 style={{ textAlign: "center", paddingTop: "16px" }}>
                ໃບເກັບເງິນອາກອນມູນຄ່າເພີ່ມ/TAX INVOICE
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "end",
                  alignItems: "end",
                  paddingTop: "1px",
                  paddingBottom: "5px",
                  gap: "5px",
                }}
              >
                <span>ເລກທີ: {val.Transid}</span>
                <span style={{ textAlign: "end", paddingBottom: "10px" }}>
                  ວັນທີ: {date}
                </span>
              </div>
              <Box sx={{ width: "100%" }}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  className="detail"
                >
                  <Grid item xs={6}>
                    <p>ຊື່ວິສະຫະກິດ ( ຜູ້ຂາຍ ) :</p>
                    <p style={{ fontWeight: "bold" }}>
                      ທີພລັດ ດີຈີຕອນ ຈຳກັດຜູ້ດຽວ
                    </p>
                    <p>ທີ່ຕັ້ງ: ຖະໜົນ ສາຍລົມ, ບ້ານ: ສາຍລົມ,</p>
                    <p>ເມືອງ: ຈັນທະບູລີ, ນະຄອນຫຼວງວຽງຈັນ</p>
                    <p>ໂທລະສັບ: 020 77800700 </p>
                    <span>ເລກປະຈຳຕົວຜູ້ເສຍອາກອນ: 556102964-900 </span>
                    <p>ຊື່ບັນຊີທະນາຄານ: TPLUS DIGITAL SOLE CO.,LTD_OTHERS BRANCH</p>
                    <p>ເລກບັນຊີທະນາຄານ: 010110000387946001</p>
                  </Grid>

                  <Grid item xs={6}>
                    <div style={{ borderRight: "1px" }}>
                      <p>ຊື່ວິສາຫະກິດ( ຜູ້ຊື້ ) :</p>
                      <input
                        onChange={handleUpdate}
                        name="BY_FULL_NM"
                        className="inputtax"
                        value={
                          updateFullName !== "" || isTyping
                            ? updateFullName
                            : val.BY_FULL_NM
                        }
                      />
                      <p>
                        ທີ່ຕັ້ງ: ຖະໜົນ:
                        <input autoComplete="off" className="address" />
                        , ບ້ານ:
                        <input autoComplete="off" className="address" />
                        , ເມືອງ:
                        <input autoComplete="off" className="address" />
                        , ແຂວງ:
                        <input autoComplete="off" className="province" />
                      </p>
                      <p>ໂທລະສັບ: {val.TIN}</p>
                      <p>ເລກປະຈຳຕົວຜູ້ຊື້: {val.BY_TIN}</p>
                      <p>ຊື່ບັນຊີທະນາຄານ:</p>
                      <p>ເລກບັນຊີທະນາຄານ:</p>
                      <p>ຮູບແບບການສຳລະສະສາງ:</p>
                    </div>
                  </Grid>
                </Grid>
              </Box>
             
              <Table size="small" style={{ fontSize: "14px" }}>
                <TableHead>
                  <TableRow>
                    <TableCell>ລ/ດ</TableCell>
                    <TableCell>ເນື້ອໃນລາຍການ</TableCell>
                    <TableCell align="right">ຫົວໜ່ວຍ</TableCell>
                    <TableCell align="right">ຈຳນວນ</TableCell>
                    <TableCell align="right">ລາຄາຫົວໜ່ວຍ</TableCell>
                    <TableCell align="right">ລວມເປັນເງິນ</TableCell>
                  </TableRow>
                </TableHead>
                {val.list.map((item, index) => {
                  return (
                    <TableBody key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.HS_NM}</TableCell>
                      <TableCell align="center">{item.UNIT_SALE}</TableCell>
                      <TableCell align="center">
                        <NumericFormat
                          value={item.SALE_CNT}
                          displayType="text"
                          thousandSeparator=","
                          allowLeadingZeros
                        />
                      </TableCell>
                      <TableCell align="right">
                        <NumericFormat
                          value={item.UNIT_SALE_AMT}
                          displayType="text"
                          thousandSeparator=","
                          allowLeadingZeros
                        />
                      </TableCell>
                      <TableCell align="right">
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
              
              <p style={{ textAlign: "end" }}>
                ລວມມູນຄ່າຂາຍບໍ່ມີອາກອນ : {""}
                <NumericFormat
                  value={val.SUPL_AMT}
                  suffix={" ກີບ"}
                  displayType={"text"}
                  decimalScale={2}
                  allowLeadingZeros
                  thousandSeparator=","
                />
              </p>
              <p style={{ textAlign: "end" }}>
                ອັດຕາ ອ.ມ.ພ: 10% ເປັນຈຳນວນເງິນ : {""}
                <NumericFormat
                  value={val.VAT_AMT}
                  suffix={" ກີບ"}
                  displayType={"text"}
                  decimalScale={2}
                  allowLeadingZeros
                  thousandSeparator=","
                />
              </p>
              
                <p style={{ textAlign: "end" }}>
                ຄ່າຮັກສາຄວາມປອດໄພ: {""}
                <NumericFormat
                  value={val.SecurityFee}
                  suffix={" ກີບ"}
                  displayType={"text"}
                  decimalScale={2}
                  allowLeadingZeros
                  thousandSeparator=","
                />
              </p>
              
              <h4 style={{ textAlign: "end" }}>
                ລວມມູນຄ່າທັງໝົດ : {""}
                <NumericFormat
                  value={val.SALE_AMT}
                  suffix={" ກີບ"}
                  displayType={"text"}
                  decimalScale={2}
                  allowLeadingZeros
                  thousandSeparator=","
                />
              </h4>
              <p>ຈຳນວນເງິນທີ່ຂຽນເປັນຕົວໜັງສື: {val.amtConvert}</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  with: "100%",
                  alignItems: "flex-end",
                }}
              >
                <p>ວັນທີ:.........................</p>
                <p>ວັນທີ:............................</p>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
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
                  }}
                >
                  <h4>ຜູ້ຂາຍ</h4>
                  <p>(ລາຍເຊັນ ແລະ ປະທັບຕາ)</p>
                </div>
              </div>
            </Typography>
          );
        })}
      </div>
    </>
  );
}
