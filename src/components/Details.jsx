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
// import { Pages } from "@mui/icons-material";
// import Bg from "../assets/picture/BG.11.png";

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
          orientation:"portrait",
          width: "100%",
          height: "1120px",
          //   marginBottom: "20px",
          backgroundImage: `url(${Bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          marginBottom: 10,
          // pageBreakBefore: "always"
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
                ໃບຮັບເງິນອາກອນມູນຄ່າເພີ່ມ/TAX INVOICE
              </h2>
              {/* <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  width: "100%",
                  marginBottom: 20,
                }}
              >
                <div></div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></div> */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "end",
                    alignItems: "end",
                    paddingTop: "1px",
                  }}
                >
                  <span>ເລກທີ: {val.Transid}</span>
                  <p> ເອກະສານອ້າງອີງ: {val.INV_NO} </p>
                  <span style={{ textAlign: "end" }}>ວັນທີ: {date}</span>
                </div>
              {/* </div> */}
              
              <div>
                <h4>ຊື່ວິສະຫະກິດ ( ຜູ້ຂາຍ ) ທີພລັດ ດີຈີຕອນ ຈຳກັດຜູ້ດຽວ</h4>
                <p>
                  ທີ່ຕັ້ງ: ຖະໜົນ ສາຍລົມ, ບ້ານ: ສາຍລົມ, ເມືອງ ຈັນທະບູລີ,
                  ນະຄອນຫຼວງວຽງຈັນ
                </p>
                <p>ໂທລະສັບ: 020 77800700 </p>
                <span>ເລກບັດປະຈຳຕົວຜູ້ເສຍອາກອນ: 5566102964-900 </span>
                <h4>
                  ຊື່ວິສາຫະກິດ( ຜູ້ຊື້ ) :
                  <input
                    onChange={handleUpdate}
                    name="BY_FULL_NM"
                    autoComplete="off"
                    className="inputtax"
                    value={
                      updateFullName !== "" || isTyping
                        ? updateFullName
                        : val.BY_FULL_NM
                    }
                  />
                </h4>
                <p className="flex">
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
                <p>ເລກບັດປະຈຳຕົວຜູ້ຊື້: {val.BY_TIN}</p>
              </div>
              <Table size="small" style={{fontSize: "14px"}}>
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
                      <TableCell align="right">{item.UNIT_SALE}</TableCell>
                      <TableCell align="right">
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
                  allowNegative
                  thousandSeparator=","
                  decimalSeparator="."
                />
              </p>
              <p style={{ textAlign: "end" }}>
                ອັດຕາ ອ.ມ.ພ: 7% ເປັນຈຳນວນເງິນ : {""}
                <NumericFormat
                  value={val.VAT_AMT}
                  suffix={" ກີບ"}
                  displayType={"text"}
                  decimalScale={2}
                  allowLeadingZeros
                  allowNegative
                  thousandSeparator=","
                  decimalSeparator="."
                />
                {/* {val.VAT_AMT} */}
              </p>
              <h4 style={{ textAlign: "end" }}>
                ລວມມູນຄ່າທັງໝົດ : {""}
                <NumericFormat
                  value={val.SALE_AMT}
                  suffix={" ກີບ"}
                  displayType={"text"}
                  decimalScale={2}
                  allowLeadingZeros
                  allowNegative
                  thousandSeparator=","
                  decimalSeparator="."
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
