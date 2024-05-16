import { Stack, TextField } from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { getCBS } from "../../services/tax.services";
import Nodata from "../../assets/picture/Nodatas.png";

export default function search_cbs() {
  const [phone, setPhone] = useState({});
  const [searchPhone, setSearchPhone] = useState("");
  const [fileUrl, setFileUrl] = useState(null);
  const searchCBS = (data) => {
    return {
      Msisdn: data.searchPhone,
    };
  };

  useLayoutEffect(() => {
    setPhone([]);
    getCBS(searchCBS({ searchPhone }))
      .then((data) => {
        setPhone(data.cbsDetail);
      })
      .catch((error) => console.log(error));
  }, [searchPhone]);

  useEffect(() => {
    const OponPDF = async () => {
      try {
        const response = await fetch(
          `http://172.28.14.225:2024/tplus-service/update-pdf/BILL_202404/202404_REL_BILL/202404_REL_BILL/202404_${phone.CustomerID}.pdf`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/pdf",
            },
          }
        );
        if (response.status === 200) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setFileUrl(url);
        } else {
          console.log("No data");
        }
      } catch (err) {
        console.log(err);
      }
    };
    OponPDF();
  });

  return (
    <>
      <Stack
        justifyContent="center"
        direction="row"
        paddingBottom="5px"
        gap="10px"
        alignItems="center"
      >
        <TextField
          type="number"
          onChange={(e) => {
            setSearchPhone(e.target.value);
          }}
          size="small"
          label="ຄົນຫາ...! ເບີໂທ"
        />
        {fileUrl ? (
          <div>
            <a href={`http://172.28.14.225:2024/tplus-service/update-pdf/BILL_202404/202404_REL_BILL/202404_REL_BILL/202404_${phone.CustomerID}_Detail.pdf`} target="_blank" rel="nopener">
              Open PDFFile Detail
            </a>
          </div>
        ) : (
          <div>no data</div>
        )}
      </Stack>
      <Stack>
        <div>
          {fileUrl ? (
            <iframe
              title="postpaid"
              width="100%"
              height="600px"
              src={`http://172.28.14.225:2024/tplus-service/update-pdf/BILL_202404/202404_REL_BILL/202404_REL_BILL/202404_${phone.CustomerID}.pdf`}
            />
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "10px",
              }}
            >
              <img src={Nodata} />
            </div>
          )}
        </div>
      </Stack>
    </>
  );
}
