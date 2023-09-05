import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Typography } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Bg from "../assets/picture/BG12.png";
// import Bg from "../assets/picture/BG.11.png";
import { getDetail } from "../services/tax.services";
import { useState, useEffect } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { toast } from "react-toastify";
import { NumericFormat } from "react-number-format";

export default function Detail({ data }) {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("md");
  const [taxData, setTaxData] = useState([]);
  const [updateFullName, setUpdateFullName] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const currentDate = new Date();
  const date = `${currentDate.getDate()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getFullYear()}`;

  // console.log(taxData);

  useEffect(() => {
    setTaxData([]);
    getDetail({ searchTransid: data })
      .then((data) => {
        setTaxData(data.dataDetail);
      })
      .catch((err) => console.log(err));
  }, [data]);

  // console.log(taxData);
  const componentPDF = useRef();

  const handleClickOpen = () => () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,

    onAfterPrint: () => {
      toast.success("Successfully !", { position: toast.POSITION.TOP_RIGHT })
          setTimeout(() => {
            // window.location.reload();
          }, 3000);
      }
  });

  const handleUpdate = (e) => {
    const { value } = e.target;
    setIsTyping(true);
    setUpdateFullName(value);
    // console.log(updateFullName);
  };

  return (
    <div>
      <Button onClick={handleClickOpen()}>
        <RemoveRedEyeIcon />
      </Button>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <div
          ref={componentPDF}
          style={{
            width: "100%",
            height: "1120px",
            // borderBottom: 0,
            // borderTop: 0,
            // borderRadius: 0,
            marginBottom: 20,
            // marginTop: 25,
            backgroundImage: `url(${Bg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          {taxData.map((val, index) => {
            return (
              <div key={index}>
                <DialogContent
                  style={{
                    padding: "3rem 4rem ",
                    outline: "none",
                  }}
                >
                  <Typography id="modal-modal-title">
                    <h2 style={{ textAlign: "center" }}>
                      ໃບຮັບເງິນອາກອນມູນຄ່າເພີ່ມ/TAX INVOICE
                    </h2>
                    <div
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
                      >
                        {/* <h3>ໃບຮັບເງິນອາກອນມູນຄ່າເພີ່ມ/TAX INVOICE</h3>
                        <p>/TAX INVOICE</p> */}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "end",
                          alignItems: "end",
                          paddingTop: "15px",
                        }}
                      >
                        <p>ເລກທີ: {val.Transid}</p>
                        <p> ເອກະສານອ້າງອີງ: {val.INV_NO} </p>
                      </div>
                    </div>
                    <p style={{ textAlign: "end" }}>ວັນທີ: {date}</p>
                  </Typography>

                  <Typography id="" sx={{ mt: 2 }}>
                    <h4>ຊື່ວິສະຫະກິດ (ຸ ຜູ້ຂາຍ ) ທີພລັດ ດີຈີຕອນ ຈຳກັດຜູ້ດຽວ</h4>
                    <p>
                      ທີ່ຕັ້ງ: ຖະໜົນ ສາຍລົມ, ບ້ານ: ສາຍລົມ, ເມືອງ ຈັນທະບູລີ,
                      ນະຄອນຫຼວງວຽງຈັນ
                    </p>
                    <p>ໂທລະສັບ: 020 77800700 </p>
                    <p>ເລກບັດປະຈຳຕົວຜູ້ເສຍອາກອນ: 5566102964-900 </p>
                  </Typography>
                  <Typography>
                    <h4>
                      ຊື່ວິສາຫະກິດ( ຜູ້ຊື້ ) : {""}
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
                    <p>
                      ໂທລະສັບ: {val.TIN}
                      {/* <input
                        className="inputtax"
                      /> */}
                    </p>
                    <p>
                      ເລກບັດປະຈຳຕົວຜູ້ເສຍອາກອນ:
                      <input autoComplete="off" className="inputtax" />
                    </p>

                    <TableContainer>
                      <Table
                        sx={{ minWidth: "100%",  borderBottom: "none" }}
                        size="small"
                      >
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
                              <TableRow>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell component="th" scope="row">
                                  {item.HS_NM}
                                </TableCell>
                                <TableCell align="right">
                                  {item.UNIT_SALE}
                                </TableCell>
                                <TableCell align="right">
                                  {/* {item.SALE_CNT} */}
                                  <NumericFormat
                                    value={item.SALE_CNT}
                                    displayType={"text"}
                                    decimalScale={2}
                                    allowLeadingZeros
                                    allowNegative
                                    thousandSeparator=","
                                    decimalSeparator="."
                                  />
                                </TableCell>
                                <TableCell align="right">
                                  {/* {item.UNIT_SALE_AMT} */}
                                  <NumericFormat
                                    value={item.UNIT_SALE_AMT}
                                    displayType={"text"}
                                    decimalScale={2}
                                    allowLeadingZeros
                                    allowNegative
                                    thousandSeparator=","
                                    decimalSeparator="."
                                  />
                                </TableCell>
                                <TableCell align="right">
                                  {/* {item.SUPL_AMT} */}
                                  <NumericFormat
                                    value={item.SUPL_AMT}
                                    suffix={" ກີບ"}
                                    displayType={"text"}
                                    decimalScale={2}
                                    allowLeadingZeros
                                    allowNegative
                                    thousandSeparator=","
                                    decimalSeparator="."
                                  />
                                </TableCell>
                              </TableRow>
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
                        {/* {val.SALE_AMT} */}
                      </h4>
                      <p>
                        ຈຳນວນເງິນທີ່ຂຽນເປັນຕົວໜັງສື: {val.amtConvert}
                        {/* <input autoComplete="off" className="inputtax" /> */}
                      </p>
                    </TableContainer>
                  </Typography>

                  <Typography>
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
                </DialogContent>
              </div>
            );
          })}
        </div>
        <DialogActions
          style={{
            paddingBottom: "20px",
            paddingTop: "10px",
          }}
        >
          <Button onClick={generatePDF}>Print</Button>

          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
