import { Chip, Divider, IconButton, TextField, Tooltip } from "@mui/material";
import Detail from "../../components/Detail";
import * as React from "react";
import { Stack } from "@mui/system";

import { useSearchParams, useLocation } from "react-router-dom";
import { getTaxMain, getSent } from "../../services/tax.services";
import { format } from "date-fns";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import { useNavigate, createSearchParams } from "react-router-dom";
import { useLayoutEffect } from "react";
import { NumericFormat } from "react-number-format";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

export default function GetBysun() {
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

  const sendStatus = (data) => {
    return {
      pageNumber: data.value,
      pageSize: 20,
      searchInvNo: data.searchData,
      fromDate: data.formDate,
      toDate: data.toDate,
      byDataType: "SUN",
    };
  };
  useLayoutEffect(() => {
    setPage(getPageNumber);
    setTaxData([]);

    getTaxMain(
      sendStatus({
        value: getPageNumber,
        searchData,
        formDate,
        toDate,
      })
    )
      .then((data) => {
        setTaxData(data.dataaray);
        setTaxCount(data.rowcount);
      })
      .catch((err) => console.log(err));
  }, [getPageNumber, setPage, searchData, formDate, toDate]);

  const Table = () => (
    <>
      <table>
        <thead>
          <tr>
            {/* <th>id</th> */}
            <th>Taxpayer ID</th>
            <th>Invoice</th> {/** invoice id and date in the same column */}
            {/* <th>INV_DD</th> */}
            <th>Buyer</th> {/**buyer tin and name in the same column */}
            {/* <th>BY_FULL_NM</th> */}
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
                {/* <td>{val.Transid}</td> */}
                <td>{val.TIN}</td>
                <td>
                  <p>{val.INV_NO}</p>
                  {/* <p>{val.INV_DD}</p> */}
                </td>
                <td>
                  <p>{val.BY_TIN}</p>
                  <p>{val.BY_FULL_NM}</p>
                </td>
                <td>
                  {/* {val.SALE_CNT} */}
                  <NumericFormat
                    value={val.SALE_CNT}
                    displayType="text"
                    allowNegative
                    thousandSeparator=","
                  />
                </td>
                <td>
                  {/* {val.SUPL_AMT} */}
                  <NumericFormat
                    value={val.SUPL_AMT}
                    displayType="text"
                    allowNegative
                    thousandSeparator=","
                  />
                </td>
                <td>
                  {/* {val.SVC_FEE} */}
                  <NumericFormat
                    value={val.SVC_FEE}
                    displayType="text"
                    allowNegative
                    thousandSeparator=","
                  />
                </td>
                <td>
                  {/* {val.EXCISE_AMT} */}
                  <NumericFormat
                    value={val.EXCISE_AMT}
                    displayType="text"
                    allowNegative
                    thousandSeparator=","
                  />
                </td>
                <td>
                  {/* {val.VAT_AMT} */}
                  <NumericFormat
                    value={val.VAT_AMT}
                    displayType="text"
                    allowNegative
                    thousandSeparator=","
                  />
                </td>
                <td>
                  {/* {val.SALE_AMT} */}
                  <NumericFormat
                    value={val.SALE_AMT}
                    displayType="text"
                    allowNegative
                    thousandSeparator=","
                  />
                </td>
                <td>
                  {/* {val.DISC_AMT} */}
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
                  <Tooltip title="ເບິ່ງລາຍລະອຽດ">
                    <IconButton>
                      <Detail data={val.INV_NO} />
                    </IconButton>
                  </Tooltip>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot></tfoot>
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
          ສະແດງລາຍການ Sun
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
              size="small"
              label="ຄົນຫາ...! ເລກອິນວອຍ"
            />
          </Stack>
        </Stack>
        <div>
          <Divider />
        </div>
        <Table />
      </Stack>
    </div>
  );
}
