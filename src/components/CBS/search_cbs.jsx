import { Stack, TextField } from "@mui/material";
import React, { useLayoutEffect, useState } from "react";
import { getCBS } from "../../services/tax.services";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

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

  return (
    <>
      <div>
        <Stack
          justifyContent="center"
          direction="row"
          paddingTop="2px"
          spacing={2}
        >
          <TextField
            type="number"
            onChange={(e) => {
              setSearchPhone(e.target.value);
            }}
            size="small"
            label="ຄົນຫາ...! ເບີໂທ"
          />
          {/* <div>
            <p>{phone.CustomerID}</p>
          </div> */}
          {phone.CustomerID ==
            !(
              <div>
                <a
                  href={`http://172.28.14.225:2024/tplus-service/update-pdf/BILL_202404/202404_HOT_BILL/202404_${phone.CustomerID}.pdf`}
                  target="_blank"
                  rel="nopener"
                >
                  Open PDF File
                </a>
                <br />
              </div>
            ) || <div>No File</div>}
        </Stack>
      </div>
    </>
  );
}
