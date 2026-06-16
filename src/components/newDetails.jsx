import React, { useContext, useEffect, useState } from "react";
import { getDetail } from "../services/tax.services";
import {
    Typography,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
import { ValueContext } from "../context/value.context";
import Bg from "../assets/picture/bg-new-confirm.png";
import Footer from "../assets/picture/footer.png";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export default function Details({ data }) {
    const [taxData, setTaxData] = useState([]);
    const [updateFullName, setUpdateFullName] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const multiPrint = useContext(ValueContext);
    const currentDate = new Date();
    const date = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

    useEffect(() => {
        setTaxData([{}]); // Give it 1 empty item so your design ALWAYS shows up!
        getDetail({ searchTransid: data })
            .then((resData) => {
                if (resData && resData.dataDetail && resData.dataDetail.length > 0) {
                    setTaxData(resData.dataDetail);
                } else {
                    setTaxData([{ INV_NO: data, Transid: data }]);
                }
            })
            .catch((err) => {
                console.log(err);
                setTaxData([{ INV_NO: data, Transid: data }]);
            });
    }, [data]);



    const handleUpdate = (e) => {
        const { value } = e.target;
        setIsTyping(true);
        setUpdateFullName(value);
    };
    const PARA_MB = "0px";
    const ROW_MT = "5px";

    const baseInput = {
        border: "none",
        borderBottom: "1px dotted #000",
        outline: "none",
        background: "transparent",
        fontWeight: "bold",
        fontSize: "10px",
        padding: "0px",
        margin: "0px",
        height: "14px",
        lineHeight: "1",
        width: "100%",
    };


    return (
        <>
            <div ref={multiPrint.componentPDF}>
                {taxData.map((val, index) => {
                    return (
                        <Typography
                            key={index}
                            style={{
                                padding: 0,
                                margin: 0,
                                outline: "none",
                                fontSize: "12px",
                                color: "#333",
                            }}
                        >
                            {/*
                             * A4 page wrapper.
                             * position: "relative" is the anchor for the footer image
                             * which uses position: "absolute", bottom: 0
                             */}
                            <div
                                className="a4-page"
                                style={{
                                    width: "210mm",
                                    height: "297mm",
                                    display: "flex",
                                    flexDirection: "column",
                                    overflow: "hidden",
                                    pageBreakAfter: "always",
                                    position: "relative",   // ← footer anchors to this
                                    color: "#333",
                                }}
                            >

                                {/* ========== First Section: Tax Invoice ========== */}
                                <div
                                    className="tax-invoice-container"
                                    style={{
                                        width: "100%",
                                        backgroundImage: `url(${Bg})`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "100% 100%",
                                        backgroundPosition: "center",
                                        WebkitPrintColorAdjust: "exact",
                                        printColorAdjust: "exact",
                                        overflow: "hidden",
                                        paddingTop: "10px",
                                        flex: 72,
                                    }}
                                >
                                    <div style={{ padding: "0rem 2.2rem", paddingBottom: "45px", display: "flex", flexDirection: "column", height: "100%" }}>

                                        {/* Header */}
                                        <div className="header relative flex items-center justify-center">
                                            <img src="/tplus.png" alt="img" className="absolute left-0 logo" style={{ top: "55px", left: "0px", margin: "0px" }} />
                                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", textAlign: "center" }}>
                                                <h2 style={{ fontSize: "22px", fontWeight: "bold", color: "#000", margin: 0 }}>
                                                    ໃບເກັບເງິນ / TAX INVOICE
                                                </h2>
                                                <p style={{ fontSize: "14px", fontWeight: "bold", color: "#000", margin: 0 }}>
                                                    (ອາກອນມູນຄ່າເພີ່ມ VAT)
                                                </p>
                                            </div>
                                        </div>

                                        {/* Company + Invoice Info */}
                                        <div style={{ paddingBottom: "3px", fontWeight: "bold" }}>
                                            <Box sx={{ width: "100%", fontWeight: "bold" }}>
                                                <Grid container rowSpacing={0} justifyContent="space-between">

                                                    {/* ── LEFT: Company Info ── */}
                                                    <Grid item xs={5} style={{ paddingRight: "10px" }}>

                                                        {/* Spacer to push entire block down */}
                                                        <div style={{ marginBottom: ROW_MT, fontSize: "10px" }}>&nbsp;</div>

                                                        {/* Company Name - row 1 */}
                                                        <div style={{ fontSize: "13px", marginTop: "0px", marginBottom: ROW_MT, fontWeight: "bold" }}>
                                                            ບໍລິສັດທີພລັດ ດີຈີຕອນ ຈຳກັດຜູ້ດຽວ
                                                        </div>

                                                        {/* Address - row 2 */}
                                                        <div style={{ fontWeight: "bold", marginBottom: ROW_MT, fontSize: "10px" }}>
                                                            ຖະໜົນສາຍລົມ, ມະຄອນຫຼວງວຽງຈັນ, ສ.ປ.ປ. ລາວ
                                                        </div>

                                                        {/* Phone - row 3 */}
                                                        <div style={{ fontWeight: "bold", marginBottom: ROW_MT, fontSize: "10px" }}>
                                                            ໂທ: +856 20 7780 0700
                                                        </div>

                                                        {/* TIN - row 4 */}
                                                        <div style={{ fontWeight: "bold", marginBottom: ROW_MT, fontSize: "10px" }}>
                                                            ເລກປະຈຳຕົວຜູ້ເສຍອາກອນ, TIN 556102964900
                                                        </div>

                                                        {/* Bank Name - row 5 */}
                                                        <div style={{ display: "flex", alignItems: "flex-end", marginBottom: ROW_MT, fontSize: "10px" }}>
                                                            <span style={{ whiteSpace: "nowrap", paddingRight: "4px", fontWeight: "bold" }}>ຊື່ທະນາຄານ/Bank Name:</span>
                                                            <span style={{ fontWeight: "bold", whiteSpace: "nowrap" }}>BANQUE POUR LE COMMERCE EXTERIEUR LAO PUBLIC</span>
                                                        </div>

                                                        {/* Acc Name - row 6 */}
                                                        <div style={{ display: "flex", alignItems: "flex-end", marginBottom: ROW_MT, fontSize: "10px" }}>
                                                            <span style={{ whiteSpace: "nowrap", paddingRight: "4px", fontWeight: "bold" }}>ຊື່ບັນຊີ/ Acc Name:</span>
                                                            <span style={{ fontWeight: "bold", whiteSpace: "nowrap" }}>TPLUS DIGITAL SOLE CO.,LTD_OTHERS BRANCH</span>
                                                        </div>

                                                        {/* Account Number - row 7 */}
                                                        <div style={{ display: "flex", alignItems: "flex-end", marginBottom: ROW_MT, fontWeight: "bold", fontSize: "10px" }}>
                                                            <span style={{ whiteSpace: "nowrap", fontWeight: "bold", paddingRight: "6px" }}>ເລກບັນຊີ:</span>
                                                            <span style={{ fontWeight: "bold" }}>010110000387946001</span>
                                                        </div>
                                                    </Grid>

                                                    {/* ── RIGHT: Invoice Details ── */}
                                                    <Grid item xs={5} style={{ fontSize: "10px" }}>

                                                        {/* No - row 1 */}
                                                        <div style={{ marginBottom: ROW_MT, fontWeight: "bold" }}>
                                                            ເລກທີ / No: {val.Transid}
                                                        </div>

                                                        {/* Date - row 2 */}
                                                        <div style={{ marginBottom: ROW_MT, fontWeight: "bold" }}>
                                                            ວັນທີ / Date: {date}
                                                        </div>

                                                        {/* ຊື່ວິສາຫະກິດ (ຜູ້ຊື້) - row 3 */}
                                                        <div style={{ display: "flex", alignItems: "flex-end", marginBottom: ROW_MT }}>
                                                            <span style={{ whiteSpace: "nowrap", paddingRight: "6px" }}>ຊື່ວິສາຫະກິດ (ຜູ້ຊື້)</span>
                                                            <input
                                                                onChange={handleUpdate}
                                                                name="BY_FULL_NM"
                                                                className="inputtax"
                                                                style={{ ...baseInput, flex: 1 }}
                                                                value={updateFullName !== "" || isTyping ? updateFullName : val.BY_FULL_NM}
                                                            />
                                                        </div>

                                                        {/* ເລກປະຈຳຕົວຜູ້ເສຍອາກອນ - row 4 */}
                                                        <div style={{ display: "flex", alignItems: "flex-end", marginBottom: ROW_MT }}>
                                                            <span style={{ whiteSpace: "nowrap", paddingRight: "6px" }}>ເລກປະຈຳຕົວຜູ້ເສຍອາກອນ</span>
                                                            <span style={{ borderBottom: "1px dotted #000", flex: 1, fontWeight: "normal" }}>
                                                                {val.BY_TIN}
                                                            </span>
                                                        </div>

                                                        {/* ທີ່ຕັ້ງ: ຖະໜົນ / ບ້ານ - row 5 */}
                                                        <div style={{ display: "flex", alignItems: "flex-end", marginBottom: ROW_MT, gap: "3px" }}>
                                                            <span style={{ whiteSpace: "nowrap" }}>ທີ່ຕັ້ງ: ຖະໜົນ</span>
                                                            <input autoComplete="off" style={{ ...baseInput, flex: 1 }} />
                                                            <span style={{ whiteSpace: "nowrap" }}>ບ້ານ</span>
                                                            <input autoComplete="off" style={{ ...baseInput, flex: 1 }} />
                                                        </div>

                                                        {/* ເມືອງ / ແຂວງ - row 6 */}
                                                        <div style={{ display: "flex", alignItems: "flex-end", marginBottom: ROW_MT, gap: "3px" }}>
                                                            <span style={{ whiteSpace: "nowrap" }}>ເມືອງ</span>
                                                            <input autoComplete="off" style={{ ...baseInput, flex: 1 }} />
                                                            <span style={{ whiteSpace: "nowrap" }}>ແຂວງ</span>
                                                            <input autoComplete="off" style={{ ...baseInput, flex: 1 }} />
                                                        </div>

                                                        {/* ໂທລະສັບ / ແຟັກ - row 7 */}
                                                        <div style={{ display: "flex", alignItems: "flex-end", marginBottom: ROW_MT, gap: "3px" }}>
                                                            <span style={{ whiteSpace: "nowrap" }}>ໂທລະສັບ:</span>
                                                            <span style={{
                                                                borderBottom: "1px dotted #000",
                                                                flex: 1.5,
                                                                paddingLeft: "3px",
                                                                fontWeight: "normal"
                                                            }}>
                                                                {val.TIN}
                                                            </span>
                                                            <span style={{ whiteSpace: "nowrap" }}>ແຟັກ</span>
                                                            <span style={{ borderBottom: "1px dotted #000", flex: 1 }}></span>
                                                        </div>

                                                        {/* ຊື່ບັນຊີ / Acc Name - row 8 */}
                                                        <div style={{ display: "flex", alignItems: "flex-end", marginBottom: ROW_MT }}>
                                                            <span style={{ whiteSpace: "nowrap", paddingRight: "6px" }}>ຊື່ບັນຊີ / Acc Name:</span>
                                                            <span style={{ borderBottom: "1px dotted #000", flex: 1 }}></span>
                                                        </div>
                                                        {/* ເລກບັນຊີ / Acc - row 10 */}
                                                        <div style={{ display: "flex", alignItems: "flex-end", marginBottom: ROW_MT }}>
                                                            <span style={{ whiteSpace: "nowrap", paddingRight: "6px" }}>ເລກບັນຊີ / Acc No:</span>
                                                            <span style={{ borderBottom: "1px dotted #000", flex: 1 }}></span>
                                                        </div>

                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </div>
                                        {/* ========== MAIN TABLE ========== */}
                                        <div style={{ marginTop: "4px" }}>
                                            <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #000", marginTop: "8px", fontSize: "10px" }}>
                                                <thead>
                                                    <tr>
                                                        <th style={{ width: "5%", border: "1px solid #000", padding: "3px 4px", textAlign: "center" }}>
                                                            ລ/ດ<br /><span style={{ fontWeight: "normal", fontSize: "9px" }}>No.</span>
                                                        </th>
                                                        <th style={{ width: "28%", border: "1px solid #000", padding: "3px 4px", textAlign: "center" }}>
                                                            ເນື້ອໃນລາຍການ<br /><span style={{ fontWeight: "normal", fontSize: "9px" }}>Description</span>
                                                        </th>
                                                        <th style={{ width: "10%", border: "1px solid #000", padding: "3px 4px", textAlign: "center" }}>
                                                            ຫົວໜ່ວຍ<br /><span style={{ fontWeight: "normal", fontSize: "9px" }}>Unit</span>
                                                        </th>
                                                        <th style={{ width: "10%", border: "1px solid #000", padding: "3px 4px", textAlign: "center" }}>
                                                            ຈຳນວນ<br /><span style={{ fontWeight: "normal", fontSize: "9px" }}>Quantity</span>
                                                        </th>
                                                        <th style={{ width: "14%", border: "1px solid #000", padding: "3px 4px", textAlign: "center" }}>
                                                            ລາຄາຕໍ່ໜ່ວຍ<br /><span style={{ fontWeight: "normal", fontSize: "9px" }}>Unit Price</span>
                                                        </th>
                                                        <th style={{ width: "18%", border: "1px solid #000", padding: "3px 4px", textAlign: "center" }}>
                                                            ລວມເປັນເງິນ<br /><span style={{ fontWeight: "normal", fontSize: "9px" }}>Amount (LAK)</span>
                                                        </th>
                                                        <th style={{ width: "12%", border: "1px solid #000", padding: "3px 4px", textAlign: "center" }}>
                                                            ໝາຍເຫດ
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                                        <tr key={num} style={{ height: "12px" }}>
                                                            <td style={{ border: "1px solid #000", padding: "0px 4px", textAlign: "center" }}>{num}</td>
                                                            <td style={{ border: "1px solid #000", padding: "0px 4px" }}>&nbsp;</td>
                                                            <td style={{ border: "1px solid #000", padding: "0px 4px" }}>&nbsp;</td>
                                                            <td style={{ border: "1px solid #000", padding: "0px 4px" }}>&nbsp;</td>
                                                            <td style={{ border: "1px solid #000", padding: "0px 4px", textAlign: "right" }}>&nbsp;</td>
                                                            <td style={{ border: "1px solid #000", padding: "0px 4px", textAlign: "right" }}>&nbsp;</td>
                                                            <td style={{ border: "1px solid #000", padding: "0px 4px" }}>&nbsp;</td>
                                                        </tr>
                                                    ))}

                                                    {/* Summary rows */}
                                                    <tr>
                                                        <td style={{ border: "1px solid #000", padding: "2px 4px" }}>&nbsp;</td>
                                                        <td colSpan="4" style={{ border: "1px solid #000", padding: "2px 4px", textAlign: "right", fontWeight: "bold" }}>ມູນຄ່າລວມບໍ່ລວມອາກອນ:</td>
                                                        <td style={{ border: "1px solid #000", padding: "2px 4px", textAlign: "right" }}>
                                                            <NumericFormat value={val.SUPL_AMT || 0} displayType="text" thousandSeparator="," />
                                                        </td>
                                                        <td style={{ border: "1px solid #000", padding: "2px 4px" }}>&nbsp;</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ border: "1px solid #000", padding: "2px 4px" }}>&nbsp;</td>
                                                        <td colSpan="4" style={{ border: "1px solid #000", padding: "2px 4px", textAlign: "right", fontWeight: "bold" }}>ອັດຕາອາກອນມູນຄ່າເພີ່ມ/VAT ເປັນຈຳນວນເງິນ:</td>
                                                        <td style={{ border: "1px solid #000", padding: "2px 4px", textAlign: "right" }}>
                                                            <NumericFormat value={val.VAT_AMT || 0} displayType="text" thousandSeparator="," />
                                                        </td>
                                                        <td style={{ border: "1px solid #000", padding: "2px 4px" }}>&nbsp;</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ border: "1px solid #000", padding: "2px 4px" }}>&nbsp;</td>
                                                        <td colSpan="4" style={{ border: "1px solid #000", padding: "2px 4px", textAlign: "right", fontWeight: "bold" }}>ລວມມູນຄ່າທັງໝົດລວມອາກອນ:</td>
                                                        <td style={{ border: "1px solid #000", padding: "2px 4px", textAlign: "right" }}>
                                                            <NumericFormat value={val.SALE_AMT || 0} displayType="text" thousandSeparator="," />
                                                        </td>
                                                        <td style={{ border: "1px solid #000", padding: "2px 4px" }}>&nbsp;</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ border: "1px solid #000", padding: "2px 4px" }}>&nbsp;</td>
                                                        <td colSpan="4" style={{ border: "1px solid #000", padding: "2px 4px", textAlign: "right", fontWeight: "bold" }}>ສ່ວນຫຼຸດ/ Discount:</td>
                                                        <td style={{ border: "1px solid #000", padding: "2px 4px", textAlign: "right" }}>&nbsp;</td>
                                                        <td style={{ border: "1px solid #000", padding: "2px 4px" }}>&nbsp;</td>
                                                    </tr>

                                                    {/* Section I */}
                                                    <tr>
                                                        <td style={{ border: "1px solid #000", padding: "5px 4px", textAlign: "center", fontWeight: "bold", color: "#000", fontSize: "14px" }}>I.</td>
                                                        <td colSpan="4" style={{ border: "1px solid #000", padding: "5px 4px", fontWeight: "bold", color: "#000", fontSize: "14px" }}>ລວມມູນຄ່າຂາຍ</td>
                                                        <td style={{ border: "1px solid #000", padding: "5px 4px", textAlign: "right", fontWeight: "bold", fontSize: "12px" }}>
                                                            <NumericFormat value={val.SALE_AMT || 0} displayType="text" thousandSeparator="," />
                                                        </td>
                                                        <td style={{ border: "1px solid #000", padding: "5px 4px" }}>&nbsp;</td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            {/* Section 1 footer text */}
                                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px", marginBottom: "15px", fontSize: "10px" }}>
                                                {/* Left Column */}
                                                <div>
                                                    <div style={{ fontWeight: "bold", marginBottom: "3px" }}>ໃບອະນຸຍາດນຳໃຊ້ ເຄື່ອງບັນທຶກການຂາຍສິນຄ້າ ແລະ ບໍລິການ</div>
                                                    <div style={{ display: "flex", alignItems: "center" }}>
                                                        <span style={{ fontWeight: "bold", paddingRight: "6px" }}>ເລກທີ:</span>
                                                        <span style={{ borderBottom: "1px dotted #000", height: "0", width: "170px" }}>&nbsp;</span>
                                                    </div>
                                                </div>
                                                {/* Right Column */}
                                                <div style={{ fontWeight: "bold", textAlign: "center" }}>
                                                    <div style={{ marginBottom: "3px" }}>ພັດທະນາໂດຍ</div>
                                                    <div>ບໍລິສັດທີພລັດ ດີຈີຕອນ ຈຳກັດຜູ້ດຽວ</div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>{/* end first section */}

                                {/* ========== Second Section: Service Fee Receipt ========== */}
                                <div
                                    className="tax-invoice-container"
                                    style={{
                                        width: "100%",
                                        backgroundImage: `url(${Bg})`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "100% 100%",
                                        backgroundPosition: "center",
                                        WebkitPrintColorAdjust: "exact",
                                        printColorAdjust: "exact",
                                        pageBreakInside: "avoid",
                                        breakInside: "avoid",
                                        overflow: "hidden",
                                        paddingTop: "10px",
                                        flex: 28,
                                    }}
                                >
                                    <div style={{ padding: "0rem 2.5rem" }}>
                                        <div style={{ marginTop: "10px" }}>

                                            {/* Title */}
                                            <div style={{ textAlign: "center", marginBottom: "4px", marginTop: "6px" }}>
                                                <h2 style={{ margin: 0, fontSize: "22px", fontWeight: "bold", color: "#000" }}>ໃບເກັບເງິນຄ່າບໍລິການ</h2>
                                            </div>

                                            <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
                                                <span style={{ fontSize: "12px" }}>ເລກທີ / No: {val.Transid}-S</span>
                                            </div>

                                            {/* Section II table */}
                                            <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #000", fontSize: "12px" }}>
                                                <thead>
                                                    <tr>
                                                        <th style={{ width: "8%", border: "1px solid #000", padding: "4px 6px", textAlign: "center", fontWeight: "bold" }}>ລ/ດ</th>
                                                        <th style={{ width: "64%", border: "1px solid #000", padding: "4px 6px", textAlign: "center", fontWeight: "bold" }}>ເນື້ອໃນ</th>
                                                        <th style={{ width: "28%", border: "1px solid #000", padding: "4px 6px", textAlign: "center", fontWeight: "bold" }}>ຈຳນວນເງິນ</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td style={{ border: "1px solid #000", padding: "5px 6px", textAlign: "center", fontWeight: "bold", color: "#000", fontSize: "14px" }}>II.</td>
                                                        <td style={{ border: "1px solid #000", padding: "5px 6px", fontWeight: "bold", color: "#000", fontSize: "13px" }}>ຄ່າຮັກສາຄວາມປອດໄພ</td>
                                                        <td style={{ border: "1px solid #000", padding: "5px 6px", textAlign: "right" }}>
                                                            <NumericFormat value={val.SecurityFee} displayType={"text"} thousandSeparator="," />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            {/* Section III table */}
                                            <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #000", fontSize: "12px", marginTop: "25px" }}>
                                                <tbody>
                                                    <tr>
                                                        <td style={{ width: "8%", border: "1px solid #000", padding: "5px 6px", textAlign: "center", fontWeight: "bold", color: "#000", fontSize: "14px" }}>III.</td>
                                                        <td style={{ width: "64%", border: "1px solid #000", padding: "5px 6px", fontWeight: "bold", color: "#000", fontSize: "13px" }}>
                                                            ລວມມູນຄ່າທັງໝົດທີ່ຕ້ອງຊຳລະ = I+II
                                                        </td>
                                                        <td style={{ width: "28%", border: "1px solid #000", padding: "5px 6px", textAlign: "right", fontWeight: "bold" }}>
                                                            <NumericFormat value={(Number(val.SALE_AMT) || 0) + (Number(val.SecurityFee) || 0)} displayType={"text"} thousandSeparator="," />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="3" style={{ border: "1px solid #000", padding: "3px 6px", fontSize: "11px" }}>
                                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                                <span style={{ fontWeight: "bold", paddingRight: "6px", whiteSpace: "nowrap" }}>ຈຳນວນເງິນເປັນໂຕໜັງສື:</span>
                                                                <span style={{ borderBottom: "1px dotted #000", flex: 1, height: "0" }}></span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            {/* Section 2 footer text */}
                                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "22px", marginBottom: "15px", fontSize: "10px" }}>
                                                {/* Left Column */}
                                                <div>
                                                    <div style={{ fontWeight: "bold", marginBottom: "3px" }}>ໃບອະນຸຍາດນຳໃຊ້ ເຄື່ອງບັນທຶກການຂາຍສິນຄ້າ ແລະ ບໍລິການ</div>
                                                    <div style={{ display: "flex", alignItems: "center" }}>
                                                        <span style={{ fontWeight: "bold", paddingRight: "6px" }}>ເລກທີ:</span>
                                                        <span style={{ borderBottom: "1px dotted #000", height: "0", width: "170px" }}>&nbsp;</span>
                                                    </div>
                                                </div>
                                                {/* Right Column */}
                                                <div style={{ fontWeight: "bold", textAlign: "center" }}>
                                                    <div style={{ marginBottom: "3px" }}>ພັດທະນາໂດຍ</div>
                                                    <div>ບໍລິສັດທີພລັດ ດີຈີຕອນ ຈຳກັດຜູ້ດຽວ</div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>{/* end second section */}
                                {/* ========== Page Footer Bar ========== */}
                                <div
                                    style={{
                                        width: "100%",
                                        marginTop: "-1px",             // Pull it up to eliminate any native image gap
                                        padding: "8px 18px",           // Equal top and bottom padding to center it

                                        boxSizing: "border-box",
                                        WebkitPrintColorAdjust: "exact",
                                        printColorAdjust: "exact",
                                        backgroundColor: "#b74e4eff",
                                    }}
                                >
                                    <div
                                        style={{
                                            border: "2px solid #cc0000",
                                            borderRadius: "20px",
                                            height: "45px",
                                            backgroundColor: "#fff",
                                            padding: "6px 16px",        // ⬆ was "4px 16px"
                                            fontSize: "10px",            // ⬆ was "8.5px"
                                            fontWeight: "bold",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: "14px",                 // ⬆ was "10px"
                                        }}
                                    >

                                        <span>ສຳນັກງານໃຫຍ່, ບ້ານສາຍລົມ, ຖະໜົນສາຍລົມ, ມະຄອນຫຼວງວຽງຈັນ, ສ.ປ.ປ. ລາວ</span>

                                        {/* Globe / Website */}
                                        <span style={{ display: "inline-flex", alignItems: "center", gap: "3px" }}>
                                            <span style={{
                                                border: "1.5px solid #333",
                                                borderRadius: "50%",
                                                width: "13px",
                                                height: "13px",
                                                display: "inline-flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontSize: "8px",
                                            }}>🌐</span>
                                            <span>TPLUS.LA</span>
                                        </span>

                                        {/* Phone */}
                                        <span style={{ display: "inline-flex", alignItems: "center", gap: "3px" }}>
                                            <span style={{
                                                backgroundColor: "#cc0000",
                                                color: "#fff",
                                                borderRadius: "3px",
                                                width: "13px",
                                                height: "13px",
                                                display: "inline-flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontSize: "8px",
                                            }}>📞</span>
                                            <span>123</span>
                                        </span>

                                        {/* Facebook */}
                                        <span style={{ display: "inline-flex", alignItems: "center", gap: "3px" }}>
                                            <span style={{
                                                backgroundColor: "#1877F2",
                                                color: "#fff",
                                                borderRadius: "3px",
                                                width: "13px",
                                                height: "13px",
                                                display: "inline-flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontSize: "9px",
                                                fontWeight: "bold",
                                            }}>f</span>
                                            <span>TPLUSLAO</span>
                                        </span>
                                    </div>
                                </div>

                            </div>{/* end a4-page */}
                        </Typography>
                    );
                })}
            </div>
        </>
    );
}