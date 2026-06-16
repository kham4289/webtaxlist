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
import Bg from "../assets/picture/bg-new-confirm.png";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export default function Details({ data }) {
    const [taxData, setTaxData] = useState([]);
    const [updateFullName, setUpdateFullName] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const multiPrint = useContext(ValueContext);
    const currentDate = new Date();
    const date = `${currentDate.getDate()}/${currentDate.getMonth() + 1
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
                                    width: "100%",
                                    minHeight: "297mm",
                                    backgroundImage: `url(${Bg})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "100% 100%",
                                    backgroundPosition: "center",
                                    paddingBottom: "30px",
                                }}
                            >
                                <div style={{ padding: "0rem 1.5rem" }}>
                                    <div className="header relative flex items-center justify-center">
                                        {/* Logo */}
                                        <img src="/tplus.png" alt="img" className="absolute left-0 logo" />

                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", textAlign: "center" }}>
                                            {/* Top Line: Big and Bold */}
                                            <h2 style={{ fontSize: "22px", fontWeight: "bold", color: "#000", margin: 0 }}>
                                                ໃບເກັບເງິນkkk / TAX INVOICE
                                            </h2>

                                            {/* Bottom Line: Smaller, perfectly centered below the top line */}
                                            <p style={{ fontSize: "13px", fontWeight: "500", color: "#000", marginTop: "4px", margin: 0 }}>
                                                (ອາກອນມູນຄ່າເພີ່ມ VAT)
                                            </p>
                                        </div>
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
                                        }}
                                    >
                                        <Box sx={{ width: "100%", fontWeight: "bold" }}>
                                            <Grid
                                                container
                                                rowSpacing={1}
                                                justifyContent="space-between"
                                            >
                                                <Grid item xs={5} style={{ paddingRight: "10px" }}>
                                                    <h3 style={{ fontSize: "14px", marginBottom: "4px", marginTop: "0px", fontWeight: "bold" }}>
                                                        ບໍລິສັດທີພລັດ ດີຈີຕອນ ຈຳກັດຜູ້ດຽວ
                                                    </h3>
                                                    <p style={{ fontWeight: "normal", marginBottom: "4px" }}>
                                                        <span style={{ fontWeight: "bold" }}>ເລກທີ 0100, ຖະໜົນສາຍລົມ, ນະຄອນຫຼວງວຽງຈັນ, ສ. ປ. ປ. ລາວ</span>
                                                    </p>
                                                    <p style={{ fontWeight: "bold", marginBottom: "4px" }}>
                                                        ໂທ:  020 77800700, ແຟັກ: (856-21) 219690
                                                    </p>
                                                    <p style={{ fontWeight: "bold", marginBottom: "4px" }}>
                                                        ເລກປະຈຳຕົວຜູ້ເສຍອາກອນ, ເລກປະຈຳຕົວວິສາຫະກິດ TIN: 556102964-900
                                                    </p>
                                                    <div style={{ display: "flex", alignItems: "flex-end", marginTop: "8px" }}>
                                                        <span style={{ whiteSpace: "nowrap", paddingRight: "8px" }}>ຊື່ທະນາຄານ / Bank Name:</span>
                                                        <span style={{ borderBottom: "1px dotted #000", flex: 1 }}></span>
                                                    </div>
                                                    <div style={{ display: "flex", alignItems: "flex-start", marginTop: "8px" }}>
                                                        <span style={{ whiteSpace: "nowrap", paddingRight: "8px" }}>ຊື່ບັນຊີ / Acc Name:</span>
                                                        <span style={{ fontWeight: "normal", lineHeight: "1.3", flex: 1 }}>
                                                            TPLUS DIGITAL SOLE CO., <br />
                                                            LTD_OTHERS BRANCH
                                                        </span>
                                                    </div>
                                                    <div style={{ display: "flex", alignItems: "flex-end", marginTop: "8px" }}>
                                                        <span style={{ whiteSpace: "nowrap", paddingRight: "8px" }}>ເລກບັນຊີ:</span>
                                                        <span style={{ borderBottom: "1px dotted #000", flex: 1, fontWeight: "normal", lineHeight: "1.3" }}>010110000387946001</span>
                                                    </div>
                                                </Grid>

                                                <Grid item xs={5}>
                                                    <p className="line-spacing">ເລກທີ / No: {val.Transid}</p>
                                                    <p className="line-spacing">ວັນທີ / Date: {date}</p>

                                                    <div style={{ display: "flex", alignItems: "flex-end", marginTop: "8px" }}>
                                                        <span style={{ whiteSpace: "nowrap", paddingRight: "8px" }}>ຊື່ວິສາຫະກິດ (ຜູ້ຊື້)</span>
                                                        <input
                                                            onChange={handleUpdate}
                                                            name="BY_FULL_NM"
                                                            className="inputtax"
                                                            style={{ flex: 1, fontSize: "12px", background: "transparent", borderBottom: "1px dotted #000", outline: "none", fontWeight: "bold", minWidth: "0", padding: 0 }}
                                                            value={
                                                                updateFullName !== "" || isTyping
                                                                    ? updateFullName
                                                                    : val.BY_FULL_NM
                                                            }
                                                        />
                                                    </div>

                                                    <div style={{ display: "flex", alignItems: "flex-end", marginTop: "8px" }}>
                                                        <span style={{ whiteSpace: "nowrap", paddingRight: "8px" }}>ເລກປະຈຳຕົວຜູ້ເສຍອາກອນ</span>
                                                        <span style={{ borderBottom: "1px dotted #000", flex: 1, fontWeight: "normal", lineHeight: "1.3" }}>{val.BY_TIN}</span>
                                                    </div>

                                                    <div style={{ display: "flex", alignItems: "flex-end", marginTop: "8px", gap: "4px" }}>
                                                        <span style={{ whiteSpace: "nowrap" }}>ທີ່ຕັ້ງ: ຖະໜົນ</span>
                                                        <input autoComplete="off" style={{ flex: 1, background: "transparent", border: "none", borderBottom: "1px dotted #000", outline: "none", fontWeight: "bold", minWidth: "0", padding: 0 }} />
                                                        <span style={{ whiteSpace: "nowrap" }}>ບ້ານ</span>
                                                        <input autoComplete="off" style={{ flex: 1, background: "transparent", border: "none", borderBottom: "1px dotted #000", outline: "none", fontWeight: "bold", minWidth: "0", padding: 0 }} />
                                                    </div>

                                                    <div style={{ display: "flex", alignItems: "flex-end", marginTop: "8px", gap: "4px" }}>
                                                        <span style={{ whiteSpace: "nowrap" }}>ເມືອງ</span>
                                                        <input autoComplete="off" style={{ flex: 1, background: "transparent", border: "none", borderBottom: "1px dotted #000", outline: "none", fontWeight: "bold", minWidth: "0", padding: 0 }} />
                                                        <span style={{ whiteSpace: "nowrap" }}>ແຂວງ</span>
                                                        <input autoComplete="off" style={{ flex: 1, background: "transparent", border: "none", borderBottom: "1px dotted #000", outline: "none", fontWeight: "bold", minWidth: "0", padding: 0 }} />
                                                    </div>

                                                    <div style={{ display: "flex", alignItems: "flex-end", marginTop: "8px", gap: "4px" }}>
                                                        <span style={{ whiteSpace: "nowrap" }}>ໂທລະສັບ:</span>
                                                        <span style={{ borderBottom: "1px dotted #000", flex: 1.5, paddingLeft: "4px", fontWeight: "normal", lineHeight: "1.3" }}>{val.TIN}</span>
                                                        <span style={{ whiteSpace: "nowrap" }}>ແຟັກ</span>
                                                        <span style={{ borderBottom: "1px dotted #000", flex: 1 }}></span>
                                                    </div>

                                                    <div style={{ display: "flex", alignItems: "flex-end", marginTop: "8px" }}>
                                                        <span style={{ whiteSpace: "nowrap", paddingRight: "8px" }}>ຊື່ບັນຊີ / Acc Name:</span>
                                                        <span style={{ borderBottom: "1px dotted #000", flex: 1 }}></span>
                                                    </div>

                                                    <div style={{ display: "flex", alignItems: "flex-end", marginTop: "8px" }}>
                                                        <span style={{ whiteSpace: "nowrap", paddingRight: "8px" }}>ເລກທີ / No:</span>
                                                        <span style={{ borderBottom: "1px dotted #000", flex: 1 }}></span>
                                                    </div>

                                                    <div style={{ display: "flex", alignItems: "flex-end", marginTop: "8px" }}>
                                                        <span style={{ whiteSpace: "nowrap", paddingRight: "8px" }}>ເລກບັນຊີ / Acc:</span>
                                                        <span style={{ borderBottom: "1px dotted #000", flex: 1 }}></span>
                                                    </div>

                                                    {/* <div style={{ display: "flex", alignItems: "flex-end", marginTop: "12px" }}>
                            <span style={{ whiteSpace: "nowrap", paddingRight: "8px", fontWeight: "bold" }}>ເປີໃຊລະສັບ / User :</span>
                            <span style={{ fontWeight: "bold" }}>{val.UserCode}</span>
                          </div>
                          <div style={{ display: "flex", alignItems: "flex-end", marginTop: "4px" }}>
                            <span style={{ whiteSpace: "nowrap", paddingRight: "8px", fontWeight: "bold" }}>BillingCode :</span>
                            <span style={{ fontWeight: "bold" }}>{val.BillingCode}</span>
                          </div> */}
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </div>


                                    <div className="" style={{ marginTop: "5px" }}>


                                        <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #000", marginTop: "16px", fontSize: "11px" }}>
                                            <thead>
                                                <tr>
                                                    <th style={{ width: "5%", border: "1px solid #000", padding: "4px 6px", textAlign: "center", whiteSpace: "nowrap" }}>ລ/ດ<br />No.</th>
                                                    <th style={{ width: "30%", border: "1px solid #000", padding: "4px 6px", textAlign: "center", whiteSpace: "nowrap" }}>ເນື້ອໃນລາຍການ<br />Description</th>
                                                    <th style={{ width: "10%", border: "1px solid #000", padding: "4px 6px", textAlign: "center", whiteSpace: "nowrap" }}>ຫົວໜ່ວຍ<br />Unit</th>
                                                    <th style={{ width: "10%", border: "1px solid #000", padding: "4px 6px", textAlign: "center", whiteSpace: "nowrap" }}>ຈໍານວນ<br />Quantity</th>
                                                    <th style={{ width: "15%", border: "1px solid #000", padding: "4px 6px", textAlign: "center", whiteSpace: "nowrap" }}>ລາຄາຫົວໜ່ວຍ<br />Unit Price</th>
                                                    <th style={{ width: "15%", border: "1px solid #000", padding: "4px 6px", textAlign: "center", whiteSpace: "nowrap" }}>ລວມເປັນເງິນ<br />Amount (LAK)</th>
                                                    <th style={{ width: "15%", border: "1px solid #000", padding: "4px 6px", textAlign: "center", whiteSpace: "nowrap" }}>ໝາຍເຫດ</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(() => {
                                                    const renderRows = [];
                                                    for (let i = 0; i < 10; i++) {
                                                        const item = val.list && val.list[i] ? val.list[i] : null;
                                                        renderRows.push(
                                                            <tr key={i} style={{ height: "24px" }}>
                                                                <td style={{ border: "1px solid #000", padding: "4px 6px", textAlign: "center" }}>{i + 1}</td>
                                                                <td style={{ border: "1px solid #000", padding: "4px 6px" }}>{item ? item.HS_NM : ""}</td>
                                                                <td style={{ border: "1px solid #000", padding: "4px 6px", textAlign: "center" }}>{item ? item.UNIT_SALE : ""}</td>
                                                                <td style={{ border: "1px solid #000", padding: "4px 6px", textAlign: "center" }}>
                                                                    {item && item.SALE_CNT ? <NumericFormat value={item.SALE_CNT} displayType="text" thousandSeparator="," /> : ""}
                                                                </td>
                                                                <td style={{ border: "1px solid #000", padding: "4px 6px", textAlign: "right" }}>
                                                                    {item && item.UNIT_SALE_AMT ? <NumericFormat value={item.UNIT_SALE_AMT} displayType="text" thousandSeparator="," /> : ""}
                                                                </td>
                                                                <td style={{ border: "1px solid #000", padding: "4px 6px", textAlign: "right" }}>
                                                                    {item && item.SUPL_AMT ? <NumericFormat value={item.SUPL_AMT} displayType="text" thousandSeparator="," /> : ""}
                                                                </td>
                                                                <td style={{ border: "1px solid #000", padding: "4px 6px" }}></td>
                                                            </tr>
                                                        );
                                                    }
                                                    return renderRows;
                                                })()}

                                                {/* Summary rows */}
                                                <tr>
                                                    <td colSpan="5" style={{ textAlign: "right", paddingRight: "8px", border: "1px solid #000" }}>
                                                        <span style={{ fontWeight: "bold" }}>ລວມມູນຄ່າຂາຍບໍ່ມີອາກອນ:</span>
                                                    </td>
                                                    <td style={{ border: "1px solid #000", textAlign: "right", padding: "4px 6px", fontWeight: "bold" }}>
                                                        <NumericFormat value={val.SUPL_AMT || 0} displayType={"text"} thousandSeparator="," />
                                                    </td>
                                                    <td style={{ border: "1px solid #000" }}></td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="5" style={{ textAlign: "right", paddingRight: "8px", border: "1px solid #000" }}>
                                                        <span style={{ fontWeight: "bold" }}>ອັດຕາອາກອນມູນຄ່າເພີ່ມ/VAT 10% ເປັນຈຳນວນເງິນ:</span>
                                                    </td>
                                                    <td style={{ border: "1px solid #000", textAlign: "right", padding: "4px 6px", fontWeight: "bold" }}>
                                                        <NumericFormat value={val.VAT_AMT || 0} displayType={"text"} thousandSeparator="," />
                                                    </td>
                                                    <td style={{ border: "1px solid #000" }}></td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="5" style={{ textAlign: "right", paddingRight: "8px", border: "1px solid #000" }}>
                                                        <span style={{ fontWeight: "bold" }}>ລວມມູນຄ່າທັງໝົດລວມອາກອນ:</span>
                                                    </td>
                                                    <td style={{ border: "1px solid #000", textAlign: "right", padding: "4px 6px", fontWeight: "bold" }}>
                                                        <NumericFormat value={val.TOTAL_AMT || val.SALE_AMT || 0} displayType={"text"} thousandSeparator="," />
                                                    </td>
                                                    <td style={{ border: "1px solid #000" }}></td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="5" style={{ textAlign: "right", paddingRight: "8px", border: "1px solid #000" }}>
                                                        <span style={{ fontWeight: "bold" }}>ສ່ວນຫຼຸດ/Discount:</span>
                                                    </td>
                                                    <td style={{ border: "1px solid #000", textAlign: "right", padding: "4px 6px", fontWeight: "bold" }}>
                                                        <NumericFormat value={val.Discount || 0} displayType={"text"} thousandSeparator="," />
                                                    </td>
                                                    <td style={{ border: "1px solid #000" }}></td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="6" style={{ textAlign: "left", padding: "4px 8px", border: "1px solid #000" }}>
                                                        <div style={{ display: "flex", alignItems: "flex-end" }}>
                                                            <span style={{ whiteSpace: "nowrap", fontWeight: "bold" }}>ຈຳນວນເງິນເປັນຕົວໜັງສື:</span>
                                                            <span style={{ borderBottom: "1px dotted #000", flex: 1, marginLeft: "8px", fontWeight: "bold" }}>{val.amtConvert}</span>
                                                        </div>
                                                    </td>
                                                    <td style={{ border: "1px solid #000" }}></td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="6" style={{ textAlign: "left", padding: "4px 8px", border: "1px solid #000" }}>
                                                        <div style={{ display: "flex", alignItems: "flex-end" }}>
                                                            <span style={{ whiteSpace: "nowrap", fontWeight: "bold" }}>Amount in Words:</span>
                                                            <span style={{ borderBottom: "1px dotted #000", flex: 1, marginLeft: "8px" }}></span>
                                                        </div>
                                                    </td>
                                                    <td style={{ border: "1px solid #000" }}></td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px", padding: "0 60px" }}>
                                            <div style={{ textAlign: "center" }}>
                                                <h3 style={{ margin: "0 0 4px 0", fontSize: "16px" }}>ຜູ້ຊື້</h3>
                                                <h4 style={{ margin: 0, fontSize: "14px" }}>(ລາຍເຊັນ ແລະ ຈ້ຳກາ)</h4>
                                            </div>
                                            <div style={{ textAlign: "center" }}>
                                                <h3 style={{ margin: "0 0 4px 0", fontSize: "16px" }}>ຜູ້ຂາຍ</h3>
                                                <h4 style={{ margin: 0, fontSize: "14px" }}>(ລາຍເຊັນ ແລະ ຈ້ຳກາ)</h4>
                                            </div>
                                        </div>

                                        <div style={{ marginTop: "40px", marginBottom: "20px" }}>
                                            <p style={{ fontWeight: "bold", marginBottom: "4px", fontSize: "11px" }}>ໃບອະນຸຍາດນຳໃຊ້ ເຄື່ອງບັນທຶກການຂາຍສິນຄ້າ ແລະ ບໍລິການ</p>
                                            <div style={{ display: "flex", alignItems: "flex-end", fontSize: "11px" }}>
                                                <span style={{ fontWeight: "bold", paddingRight: "8px" }}>ເລກທີ:</span>
                                                <span style={{ borderBottom: "1px dotted #000", width: "120px" }}></span>
                                            </div>
                                        </div>

                                        {/* Service Fee Receipt (Sub-Table) */}
                                        <div style={{ textAlign: "center", marginBottom: "16px", marginTop: "30px" }}>
                                            <h2 style={{ margin: 0, fontSize: "20px" }}>ໃບເກັບເງິນຄ່າບໍລິການ</h2>
                                        </div>

                                        <div style={{ padding: "0", fontWeight: "bold", marginBottom: "8px", display: "flex", alignItems: "flex-end" }}>
                                            <p style={{ margin: 0, fontSize: "14px", paddingRight: "8px" }}>ເລກທີ / No: {val.Transid}-S</p>
                                        </div>

                                        <div style={{ padding: "0" }}>
                                            <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #000", fontSize: "14px", fontWeight: "bold", tableLayout: "fixed" }}>
                                                <colgroup>
                                                    <col style={{ width: "8%" }} />
                                                    <col style={{ width: "22%" }} />
                                                    <col style={{ width: "20%" }} />
                                                    <col style={{ width: "10%" }} />
                                                    <col style={{ width: "10%" }} />
                                                    <col style={{ width: "10%" }} />
                                                    <col style={{ width: "15%" }} />
                                                </colgroup>
                                                <thead>
                                                    <tr>
                                                        <th style={{ border: "1px solid #000", padding: "10px 8px", textAlign: "center" }}>ລ/ດ</th>
                                                        <th style={{ border: "1px solid #000", padding: "10px 8px", textAlign: "center" }}>ເນື້ອໃນ</th>
                                                        <th style={{ border: "1px solid #000", padding: "10px 8px", textAlign: "center" }}>Item (English)</th>
                                                        <th colSpan="3" style={{ border: "1px solid #000", padding: "10px 8px", textAlign: "center" }}>ຈຳນວນເງິນ</th>
                                                        <th style={{ border: "1px solid #000", padding: "10px 8px", textAlign: "center" }}>ລວມ</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td style={{ border: "1px solid #000", padding: "10px 8px", textAlign: "center" }}>1</td>
                                                        <td style={{ border: "1px solid #000", padding: "10px 8px", fontWeight: "bold" }}>ຄ່າຮັກສາຄວາມປອດໄພ</td>
                                                        <td style={{ border: "1px solid #000", padding: "10px 8px" }}>Security fee</td>
                                                        <td style={{ border: "1px solid #000", padding: "10px 8px" }}></td>
                                                        <td style={{ border: "1px solid #000", padding: "10px 8px" }}></td>
                                                        <td style={{ border: "1px solid #000", padding: "10px 8px", textAlign: "right" }}>
                                                            <NumericFormat value={val.SecurityFee} displayType={"text"} thousandSeparator="," />
                                                        </td>
                                                        <td style={{ border: "1px solid #000", padding: "10px 8px", textAlign: "right" }}>
                                                            <NumericFormat value={val.SecurityFee} displayType={"text"} thousandSeparator="," />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="2" style={{ border: "1px solid #000", padding: "10px 8px", fontWeight: "bold" }}>ລວມມູນຄ່າທັງໝົດທີ່ຕ້ອງຊຳລະ</td>
                                                        <td style={{ border: "1px solid #000", padding: "10px 8px", fontWeight: "bold" }}>Total Balance</td>
                                                        <td style={{ border: "1px solid #000", padding: "10px 8px" }}></td>
                                                        <td style={{ border: "1px solid #000", padding: "10px 8px" }}></td>
                                                        <td style={{ border: "1px solid #000", padding: "10px 8px" }}></td>
                                                        <td style={{ border: "1px solid #000", padding: "10px 8px", textAlign: "right", fontWeight: "bold" }}>
                                                            <NumericFormat value={val.SALE_AMT} displayType={"text"} thousandSeparator="," />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
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