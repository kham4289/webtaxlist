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
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { } from "@mui/material";
import Details from "../../components/newDetails";
// import Detail from "../../components/Detail";
import * as React from "react";
import { Stack, width } from "@mui/system";
import { useSearchParams, useLocation } from "react-router-dom";
import { getTaxMain, getSent } from "../../services/tax.services";
import { format } from "date-fns";
import { useState, useLayoutEffect, useContext, useEffect } from "react";
import { Pagination } from "@mui/material";
import { useNavigate, createSearchParams } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { ValueContext } from "../../context/value.context";
import { useCancel } from "../../hooks/useDatafinal";
import IconCancel from "../../assets/picture/cancel/icons8-cancel-48.png";
// import Displays from "../../components/Displays";

export default function AllTax() {
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("md");
  const navigate = useNavigate();
  const filter = useLocation();
  const [page, setPage] = useState(1);
  const nodeRef = React.useRef(null);
  const [taxData, setTaxData] = React.useState([]);
  const [searchParams] = useSearchParams();
  const getPageNumber = Number(searchParams.get("page" || 1));
  const [taxCount, setTaxCount] = useState(0);
  const [searchData, setSearchData] = useState("");
  const [formDate, setFormDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [showDetailById, setShowDetailById] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [val, setVal] = useState({});
  const multiPrint = useContext(ValueContext);
  const { loading, mutate } = useCancel();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const sendStatus = (data) => {
    return {
      pageNumber: data.value,
      pageSize: 20,
      searchInvNo: data.searchData,
      fromDate: data.formDate,
      toDate: data.toDate,
      byDataType: "ALL",
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
    // if (filter.pathname.split("/")[2] == "allTax") {
    getTaxMain(
      sendStatus({ value: getPageNumber, searchData, formDate, toDate })
    )
      .then((data) => {
        setTaxData(data.dataaray);
        setTaxCount(data.rowcount);
      })
      .catch((err) => console.log(err));
    // }
    // if (filter.pathname.split("/")[2] == "notSend") {
    //   getSent(sendStatus(0))
    //     .then((data) => {
    //       setTaxData(data.dataaray);
    //       setTaxCount(data.rowcount);
    //     })
    //     .catch((err) => console.log(err));
    // }
    // if (filter.pathname.split("/")[2] == "sent") {
    //   getSent(sendStatus(1))
    //     .then((data) => {
    //       setTaxData(data.dataaray);
    //       setTaxCount(data.rowcount);
    //     })
    //     .catch((err) => console.log(err));
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
  // React.useEffect(() => {
  //   setTaxData([])

  //   if(filter.pathname.split('/')[2] == 'all' ){
  //     getTaxMain(sendStatus())
  //       .then((data) => {
  //         setTaxData(data.dataaray);
  //         setTaxCount(data.rowcount);
  //         console.log(taxCount);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  //   if (filter.pathname.split("/")[2] == "notSend") {
  //     getSent(sendStatus(0))
  //       .then((data) => {
  //         setTaxData(data.dataaray);
  //         setTaxCount(data.rowcount);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  //   if (filter.pathname.split("/")[2] == "sent") {
  //     getSent(sendStatus(1))
  //       .then((data) => {
  //         setTaxData(data.dataaray);
  //         setTaxCount(data.rowcount);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [Value]);

  // const [params] = useSearchParams();

  const Table = () => (
    <>
      <div style={{ overflowX: 'auto', width: '100%' }}>
        <table style={{ minWidth: isMobile ? '800px' : '100%' }}>
          <thead>
            <tr>
              <th style={{ whiteSpace: 'nowrap' }}>Taxpayer ID</th>
              <th style={{ whiteSpace: 'nowrap' }}>Invoice</th>
              <th style={{ whiteSpace: 'nowrap' }}>Buyer</th>
              <th style={{ whiteSpace: 'nowrap' }}>Count of Dertail Lists</th>
              <th style={{ whiteSpace: 'nowrap' }}>Total Sale Amount Before Tax</th>
              <th style={{ whiteSpace: 'nowrap' }}>Service Fee</th>
              <th style={{ whiteSpace: 'nowrap' }}>Total Excise Tax</th>
              <th style={{ whiteSpace: 'nowrap' }}>Total VAT</th>
              <th style={{ whiteSpace: 'nowrap' }}>Total Sale Amount include Tax</th>
              <th style={{ whiteSpace: 'nowrap' }}>Discount</th>
              <th style={{ whiteSpace: 'nowrap' }}>Created</th>
              <th style={{ whiteSpace: 'nowrap' }}>Sent</th>
              <th style={{ whiteSpace: 'nowrap' }}>Status</th>
              <th style={{ whiteSpace: 'nowrap' }}>Action</th>
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
                    {val.cancel_bill == true ? (
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
      </div>
      <Pagination
        style={{ width: "100%", marginTop: '20px' }}
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
    <div className="box" style={{ padding: isMobile ? '10px' : '20px' }}>
      <Stack direction={"column"} spacing={2}>
        <h2 style={{ textAlign: "center", paddingBottom: 15, fontSize: isMobile ? '1.5rem' : '2rem' }}>
          ສະແດງລາຍການທັງຫມົດ TAX
        </h2>
        <Stack
          direction={isMobile ? "column" : "row"}
          justifyContent={"space-around"}
          spacing={isMobile ? 2 : 0}
        >
          <Stack
            direction={isMobile ? "column" : "row"}
            spacing={2}
            width={isMobile ? "100%" : "auto"}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  slotProps={{ textField: { size: "small", fullWidth: isMobile } }}
                  sx={{ m: 1, minWidth: isMobile ? '100%' : 100 }}
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
                <label style={{ fontSize: 20, paddingTop: 5, display: isMobile ? 'none' : 'block' }}>ຫາ</label>
                <DatePicker
                  slotProps={{ textField: { size: "small", fullWidth: isMobile } }}
                  sx={{ m: 1, minWidth: isMobile ? '100%' : 100 }}
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

          <Stack
            direction="row"
            paddingTop={isMobile ? "0" : "8px"}
            spacing={2}
            width={isMobile ? "100%" : "auto"}
          >
            <TextField
              size="small"
              fullWidth={isMobile}
              onChange={(e) => {
                setSearchData(e.target.value);
                navigate({
                  pathname: filter.pathname,
                  search: `?${createSearchParams({
                    page: 1,
                  })}`,
                });
              }}
              label="ຄົນຫາ...! ເລກອິນວອຍ"
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
                <div style={{ width: "100%" }}>
                  <Details data={showDetailById} />
                </div>
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

        <Table nodeRef={nodeRef} />
      </Stack>
    </div>
  );
}
