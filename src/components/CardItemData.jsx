import React,{useContext} from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ValueContext } from "../context/value.context";
export const CardItemData = () => {
  const multiStep = useContext(ValueContext);
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell >HS_CD</TableCell>
              <TableCell >HS_NM</TableCell>
              <TableCell >SALE_CNT</TableCell>
              <TableCell >OTH_CD</TableCell>
              <TableCell >UNIT_SALE</TableCell>
              <TableCell >UNIT_SALE_AMT</TableCell>
              <TableCell >SUPL_AMT</TableCell>
              <TableCell >EXCISE_AMT</TableCell>
              <TableCell >VAT_AMT</TableCell>
              <TableCell >SALE_AMT</TableCell>
              <TableCell >CDATE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {multiStep.list.map((item, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.HS_CD}
                </TableCell>
                <TableCell >{item.HS_NM}</TableCell>
                <TableCell >{item.SALE_CNT}</TableCell>
                <TableCell >{item.OTH_CD}</TableCell>
                <TableCell >{item.UNIT_SALE}</TableCell>
                <TableCell >{item.UNIT_SALE_AMT}</TableCell>
                <TableCell >{item.SUPL_AMT}</TableCell>
                <TableCell >{item.EXCISE_AMT}</TableCell>
                <TableCell >{item.VAT_AMT}</TableCell>
                <TableCell >{item.SALE_AMT}</TableCell>
                <TableCell >{item.CDATE}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <div
      // style={{
      //   backgroundColor: "#ffffff",
      //   border: "2px solid #c4c4c4",
      //   borderRadius: "2rem",
      //   padding: "1rem",
      //   display: "flex",
      //   justifyContent: "center",
      //   alignItems: "center",
      //   height: "4rem",
      // }}
      >
        <div
          className=""
          style={{
            marginRight: "90px",
          }}
        >
          <h4></h4>
        </div>
        <div
          className=""
          style={{
            marginRight: "90px",
          }}
        >
          <h4 className=""></h4>
        </div>
        <div
          className=""
          style={{
            marginRight: "90px",
          }}
        >
          <h4 className=""></h4>
        </div>
        <div
          className=""
          style={{
            marginRight: "90px",
          }}
        >
          <h4 className=""></h4>
        </div>
        <div
          className=""
          style={{
            marginRight: "90px",
          }}
        >
          <h4 className=""></h4>
        </div>
        <div
          className=""
          style={{
            marginRight: "90px",
          }}
        >
          <h4 className=""></h4>
        </div>
        <div
          className=""
          style={{
            marginRight: "90px",
          }}
        >
          <h4 className=""></h4>
        </div>
        <div
          className=""
          style={{
            marginRight: "90px",
          }}
        >
          <h4 className=""></h4>
        </div>
        <div
          className=""
          style={{
            marginRight: "90px",
          }}
        >
          <h4 className=""></h4>
        </div>
        <div
          className=""
          style={{
            marginRight: "90px",
          }}
        >
          <h4 className=""></h4>
        </div>
        <div
          className=""
          style={{
            marginRight: "90px",
          }}
        >
          <h4 className=""></h4>
        </div>
        <div className="">
          <h4></h4>
        </div>
      </div> */}
    </div>
  );
}
