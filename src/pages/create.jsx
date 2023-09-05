import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";


import { useSearchParams, useLocation } from "react-router-dom";
import { getTaxMain, getSent } from "../services/tax.services";
import { ValueContext } from "../context/value.context";
import { useState } from "react";


export default function create() {


const { Value, setValue } = React.useContext(ValueContext);
const filter = useLocation();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [taxData, setTaxData] = React.useState([]);
  const [taxCount, setTaxCount] = useState();
  const sendStatus = (data) => {
    return {
      pageNumber: 1,
      pageSize: 20,
      sts: data,
    };
  };
  React.useEffect(() => {
    setTaxData([]);

    if (filter.pathname.split("/")[2] == "all") {
      getTaxMain(sendStatus())
        .then((data) => {
          setTaxData(data.dataaray);
          setTaxCount(data.rowcount);
        })
        .catch((err) => console.log(err));
    }
    if (filter.pathname.split("/")[2] == "notSend") {
      getSent(sendStatus(0))
        .then((data) => {
          setTaxData(data.dataaray);
          setTaxCount(data.rowcount);
        })
        .catch((err) => console.log(err));
    }
    if (filter.pathname.split("/")[2] == "sent") {
      getSent(sendStatus(1))
        .then((data) => {
          setTaxData(data.dataaray);
          setTaxCount(data.rowcount);
        })
        .catch((err) => console.log(err));
    }
  }, [Value]);
  // const [params] = useSearchParams();


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(+event.target.value));
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>2</TableCell>
              <TableCell>3</TableCell>
              <TableCell>4</TableCell>
              <TableCell>5</TableCell>
              <TableCell>6</TableCell>
              <TableCell>7</TableCell>
              <TableCell>8</TableCell>
              <TableCell>9</TableCell>
              <TableCell>10</TableCell>
              <TableCell>11</TableCell>
              <TableCell>12</TableCell>
              <TableCell>13</TableCell>
              <TableCell>14</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {taxData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((val, index) => {
                return (
                  <TableRow role="checkbox" tabIndex={-1} key={index}>
                    <TableCell>{val.TIN}</TableCell>
                    <TableCell>{val.BY_FULL_NM}</TableCell>
                    <TableCell>{val.BY_TIN}</TableCell>
                    <TableCell>{val.EXCISE_AMT}</TableCell>
                    <TableCell>{val.HASH_KEY}</TableCell>
                    <TableCell>{val.HS_CD}</TableCell>
                    <TableCell>{val.INV_DD}</TableCell>
                    <TableCell>{val.INV_NO}</TableCell>
                    <TableCell>{val.SALE_CNCL_AMT}</TableCell>
                    <TableCell>{val.SALE_AMT}</TableCell>
                    <TableCell>{val.SALE_CNCL_CNT}</TableCell>
                    <TableCell>{val.SVC_FEE}</TableCell>
                    <TableCell>{val.SALE_CNT}</TableCell>
                    <TableCell>{val.SUPL_AMT}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 100]}
        component="div"
        count={taxCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}


