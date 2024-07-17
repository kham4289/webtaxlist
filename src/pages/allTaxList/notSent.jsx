import {
  Chip,
  Divider,
  IconButton,
  TextField,
  Tooltip,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import Details from "../../components/Details";
// import Postpait_Details from "../../components/Postpaid_Details";
import * as React from "react";
import { Stack } from "@mui/system";
import { useSearchParams, useLocation } from "react-router-dom";
import { getSent, getDetail } from "../../services/tax.services";
import { format } from "date-fns";
import { useState, useContext } from "react";
import { Pagination } from "@mui/material";
import { useNavigate, createSearchParams } from "react-router-dom";
import { useLayoutEffect, useEffect } from "react";
import { NumericFormat } from "react-number-format";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { ValueContext } from "../../context/value.context";
import { useCancel } from "../../hooks/useDatafinal";
import IconCancel from "../../assets/picture/cancel/icons8-cancel-48.png";

export default function NotSent() {
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("md");

  const navigate = useNavigate();
  const filter = useLocation();

  const [page, setPage] = useState(1);
  const [taxData, setTaxData] = React.useState([]);
  const [searchParams] = useSearchParams();
  const getPageNumber = Number(searchParams.get("page" || 1));
  const [taxCount, setTaxCount] = useState(0);
  const [searchData, setSearchData] = useState("");
  const [formDate, setFormDate] = useState("");
  const [toDate, setToDate] = useState("");
  const multiPrint = useContext(ValueContext);
  const [showDetailById, setShowDetailById] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [val, setVal] = useState({});
  const { loading, mutate } = useCancel();

  const sendStatus = (data) => {
    return {
      pageNumber: data.value,
      pageSize: 20,
      searchInvNo: data.searchData,
      sts: data.status,
      fromDate: data.formDate,
      toDate: data.toDate,
      byDataType: "ALL",
      cancelBill: "0",
    };
  };

  const handleCancel = (e, val) => {
    e.preventDefault();
    const data = {
      INV_NO: val.INV_NO,
      Transid: JSON.stringify(val.Transid),
    };
    mutate(data);
  };

  useLayoutEffect(() => {
    setPage(getPageNumber);
    setTaxData([]);

    // if (filter.pathname.split("/")[2] == "notSend") {
    getSent(
      sendStatus({
        status: 0,
        value: getPageNumber,
        searchData,
        formDate,
        toDate,
      })
    )
      .then((data) => {
        setTaxData(data.dataaray);
        setTaxCount(data.rowcount);
        // console.log(data);
      })
      .catch((err) => console.log(err));

    // }
  }, [getPageNumber, setPage, searchData, formDate, toDate]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleConfirm = () => {
    setConfirm(false);
  };
  const handleOpenConfirm = (e, val) => {
    setVal(val);
    setConfirm(true);
  };
  const Table = () => (
    <>
      <table>
        <thead>
          <tr>
            <th>Taxpayer ID</th>
            <th>Invoice</th>
            <th>Buyer</th>
            <th>Count of Dertail Lists</th>
            <th>Total Sale Amount Before Tax</th>
            <th>Service Fee</th>
            <th>Total Excise Tax</th>
            <th>Total VAT</th>
            <th>Total Sale Amount include Tax</th>
            <th>Discount</th>
            <th>Created</th>
            <th>Sent</th>
            <th>ສະຖານະ</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {taxData.map((val, index) => {
            return (
              <tr key={index}>
                <td>{val.TIN}</td>
                <td>
                  <p>{val.INV_NO}</p>
                </td>
                <td>
                  <p>{val.BY_TIN}</p>
                  <p>{val.BY_FULL_NM}</p>
                </td>
                <td>
                  <NumericFormat
                    value={val.SALE_CNT}
                    displayType="text"
                    allowNegative
                    thousandSeparator=","
                  />
                </td>
                <td>
                  <NumericFormat
                    value={val.SUPL_AMT}
                    displayType="text"
                    allowNegative
                    thousandSeparator=","
                    decimalScale={2}
                    fixedDecimalScale={true}
                  />
                </td>
                <td>
                  <NumericFormat
                    value={val.SVC_FEE}
                    displayType="text"
                    allowNegative
                    thousandSeparator=","
                  />
                </td>
                <td>
                  <NumericFormat
                    value={val.EXCISE_AMT}
                    displayType="text"
                    allowNegative
                    thousandSeparator=","
                  />
                </td>
                <td>
                  <NumericFormat
                    value={val.VAT_AMT}
                    displayType="text"
                    allowNegative
                    thousandSeparator=","
                    decimalScale={2}
                    fixedDecimalScale={true}
                  />
                </td>
                <td>
                  <NumericFormat
                    value={val.SALE_AMT}
                    displayType="text"
                    allowNegative
                    thousandSeparator=","
                    decimalScale={2}
                    fixedDecimalScale={true}
                  />
                </td>
                <td>
                  <NumericFormat
                    value={val.DISC_AMT}
                    displayType="text"
                    allowNegative
                    thousandSeparator=","
                  />
                </td>
                <td>{format(new Date(val.CDATE), "dd/MM/yyyy")}</td>
                <td>
                  {val?.Send_Date
                    ? format(new Date(val.Send_Date), "dd/MM/yyyy")
                    : ""}
                </td>

                <td>
                  {val.Send_STATUS ? (
                    <Chip color="success" label="ສົ່ງແລ້ວ" />
                  ) : (
                    <Chip color="error" label="ຍັງບໍທັນສົ່ງ" />
                  )}
                </td>

                <td>
                  {val.cancel_bill === true ? (
                    <IconButton
                      disabled
                      onClick={(e) => {
                        handleOpenConfirm(e, val);
                      }}
                    >
                      <Chip disabled color="warning" label="ຍົກເລີກ" />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={(e) => {
                        handleOpenConfirm(e, val);
                      }}
                    >
                      <Chip color="success" label="ຍົກເລີກ" />
                    </IconButton>
                  )}
                </td>
                <td>
                  <Tooltip title="ເບິ່ງລາຍລະອຽດ">
                    <IconButton
                      onClick={() => {
                        setShowDetailById(val.INV_NO);
                        setOpen(true);
                      }}
                    >
                      <RemoveRedEyeIcon />
                    </IconButton>
                  </Tooltip>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        style={{ width: "100%" }}
        count={Math.ceil(taxCount / 20)}
        page={page}
        onChange={(e, value) => {
          setPage(value);
          navigate({
            pathname: filter.pathname,
            search: `?${createSearchParams({
              page: value.toString(),
            })}`,
          });
        }}
        variant="outlined"
      />
    </>
  );
  return (
    <div className="box">
      <Stack direction={"column"} spacing={2}>
        <h2 style={{ textAlign: "center", paddingBottom: 15 }}>
          ສະແດງລາຍການລໍຖ້າສົ່ງ TAX
        </h2>
        <Stack direction="row" justifyContent={"space-around"}>
          <Stack direction="row" spacing={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  slotProps={{ textField: { size: "small" } }}
                  sx={{ m: 1, minWidth: 100 }}
                  onChange={(value) => {
                    setFormDate(value);
                    navigate({
                      pathname: filter.pathname,
                      search: `?${createSearchParams({
                        page: 1,
                      })}`,
                    });
                  }}
                  label="ເລືອກວັນທີເດືອນປີ"
                />
                <label style={{ fontSize: 20, paddingTop: 5 }}>ຫາ</label>
                <DatePicker
                  slotProps={{ textField: { size: "small" } }}
                  onChange={(value) => {
                    setToDate(value);
                    navigate({
                      pathname: filter.pathname,
                      search: `?${createSearchParams({
                        page: 1,
                      })}`,
                    });
                  }}
                  label="ເລືອກວັນທີເດືອນປີ"
                />
              </DemoContainer>
            </LocalizationProvider>
          </Stack>
          <Stack direction="row" paddingTop="8px" spacing={2}>
            <TextField
              onChange={(e) => {
                setSearchData(e.target.value);
                navigate({
                  pathname: filter.pathname,
                  search: `?${createSearchParams({
                    page: 1,
                  })}`,
                });
              }}
              label="ຄົ້ນຫາ...! ເລກອິນວອຍ"
              size="small"
            />
          </Stack>
          <Dialog
            open={open}
            onClose={handleClose}
            fullWidth={fullWidth}
            maxWidth={maxWidth}
          >
            <div style={{ width: "100%", height: "100%" }}>
              <DialogContent>
                <DialogContentText>
                  <Details data={showDetailById} />
                  {/* <Postpait_Details data={showDetailById} /> */}
                </DialogContentText>
              </DialogContent>
            </div>

            <DialogActions>
              <Button onClick={multiPrint.generatePDF}>Print</Button>
              <Button onClick={handleClose}>close</Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={confirm}
            onClose={handleConfirm}
            style={{ textAlign: "center" }}
          >
            <DialogContent>
              <DialogContentText>
                <span
                  style={{
                    display: "flex",
                    alignContent: "center",
                    alignItems: "center",
                    gap: "1px",
                  }}
                >
                  {/* <CancelOutlined/> */}
                  <img src={IconCancel} style={{ width: "33px" }} />
                  <h3>ທ່ານແນ່ໃຈແລ້ວບໍ່ວ່າຕ້ອງການຍົກເລີກ.?</h3>
                </span>
                <Button style={{ fontSize: "18px" }} onClick={handleConfirm}>
                  <Chip color="warning" label="ຍ້ອນກັບ" />
                </Button>
                <Button
                  color="success"
                  style={{ fontSize: "18px", background: "primary" }}
                  onClick={(e) => {
                    handleCancel(e, val);
                  }}
                >
                  <Chip color="primary" label="ຍືນຍັນ" />
                </Button>
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </Stack>
        <div>
          <Divider />
        </div>
        <Table />
      </Stack>
    </div>
  );
}
