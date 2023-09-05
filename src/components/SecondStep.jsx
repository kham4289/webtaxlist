import React from "react";
import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import MyTextField from "../components/textField";
import { ValueContext } from "../context/value.context";
import { useContext } from "react";
import { CardItemData } from "./CardItemData";
import { NumericFormat} from "react-number-format"
function SecondStep() {
  const multiStep = useContext(ValueContext);

  return (
    <div style={{ marginTop: "2rem" }}>
      <form
        onSubmit={(e) =>
          multiStep.handleSubmitSecond(e, {
            nextStep: 2,
          })
        }
      >
        <Stack direction={"column"} spacing={2}>
          <div className="box" style={{ padding: "0px" }}>
            <div className="form">
              <MyTextField
                autoComplete="off"
                label="HS_CD/ ລະຫັດສີນຄ້າ"
                name="HS_CD"
                value={multiStep.second.HS_CD}
                onChange={multiStep.handleChange2}
                required
              />
              <MyTextField
                autoComplete="off"
                label="OTH_CD/ ລະຫັດສີນຄ້າຜູ້ຂາຍຜູ້ເສຍພາສີ"
                name="OTH_CD"
                value={multiStep.second.OTH_CD}
                onChange={multiStep.handleChange2}
                required
              />
              <MyTextField
                autoComplete="off"
                label="HS_NM/ ຊື່ຜະລີດຕະພັນ"
                name="HS_NM"
                value={multiStep.second.HS_NM}
                onChange={multiStep.handleChange2}
                required
              />
              <NumericFormat thousandSeparator="," customInput={MyTextField}
                // type="number"
                autoComplete="off"
                label="SALE_CNT/ ຈຳນວນຂອງການຂາຍ"
                name="SALE_CNT"
                value={multiStep.second.SALE_CNT}
                onChange={multiStep.handleChange2}
                required
              />

              <NumericFormat thousandSeparator="," customInput={MyTextField}
                // type="number"
                autoComplete="off"
                label="UNIT_SALE/ ຫົວໜ່ວຍຂາຍ"
                name="UNIT_SALE"
                value={multiStep.second.UNIT_SALE}
                onChange={multiStep.handleChange2}
                required
              />
              <NumericFormat thousandSeparator="," customInput={MyTextField}
                // type="number"
                autoComplete="off"
                label="UNIT_SALE_AMT/ ລາຄາຂາຍສີນຄ້າ"
                name="UNIT_SALE_AMT"
                value={multiStep.second.UNIT_SALE_AMT}
                onChange={multiStep.handleChange2}
                required
              />
              <NumericFormat thousandSeparator="," customInput={MyTextField}
                // type="number"
                autoComplete="off"
                label="SUPL_AMT/ ລວມຂາຍກ່ອນອາກອນ/ລາຍການ"
                name="SUPL_AMT"
                value={multiStep.second.SUPL_AMT}
                onChange={multiStep.handleChange2}
                required
              />
              <NumericFormat thousandSeparator="," customInput={MyTextField}
                // type="number"
                autoComplete="off"
                label="EXCISE_AMT/ ອາກອນຊົມໃຊ້/ລາຍການ"
                name="EXCISE_AMT"
                value={multiStep.second.EXCISE_AMT}
                onChange={multiStep.handleChange2}
                required
              />
              <NumericFormat thousandSeparator="," customInput={MyTextField}
                // type="number"
                autoComplete="off"
                label="VAT_AMT/ ອມພ ຕໍ່ລາຍການ"
                name="VAT_AMT"
                value={multiStep.second.VAT_AMT}
                onChange={multiStep.handleChange2}
                required
              />
              <NumericFormat thousandSeparator="," customInput={MyTextField}
                // type="Number"
                autoComplete="off"
                label="SALE_AMT/ ມູນຄ່າຂາຍລວມອາກອນ"
                name="SALE_AMT"
                value={multiStep.second.SALE_AMT}
                onChange={multiStep.handleChange2}
                required
              />
              {/* <MyTextField
                type="datetime"
                autoComplete="off"
                label="CDATE"
                placeholder="YYYYMMDD"
                name="CDATE"
                value={multiStep.second.CDATE}
                onChange={multiStep.handleChange2}
                required={true}
              /> */}
            </div>
            <br />
            <div
              className=""
              style={{ marginBottom: "2rem", textAlign: "center" }}
            >
              <Button
                variant="contained"
                onClick={() => multiStep.setStep(0)}
                color="primary"
                size="large"
                style={{
                  gap: "2rem",
                  marginRight: "50%",
                  // justifyContent: "between",
                }}
              >
                ກັບຄືນ
              </Button>
              <Button
                type="submit"
                variant="contained"
                size="large"
                color="success"
                style={{ gap: "0rem", marginRight: "10px" }}
              >
                ເພີ່ມ
              </Button>
              <Button
                type="button"
                variant="contained"
                size="large"
                onClick={() => {
                  multiStep.setStep(2);
                  localStorage.setItem("step", JSON.stringify(0));
                }}
                color="primary"
              >
                ໜ້າຕໍ່ໄປ
              </Button>
            </div>
          </div>
        </Stack>
      </form>
      <Stack>
        <h2 style={{ textAlign: "center" }}>Details TAXLIST</h2>
        <div>
          <CardItemData />
        </div>
      </Stack>
    </div>
  );
}

export default SecondStep;

{
  /* <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "2rem",
            boxShadow: "1px 3px 16px rgba(0, 0, 0, 0.25)",
            padding: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <hr />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              marginRight: "2rem",
              marginTop: "1rem",
            }}
          >
            {multiStep.list !== null ? (
              multiStep.list.map((item, index) => (
                <CardItemData key={index} item={item} />
              ))
            ) : (
              <p>nodata</p>
            )}
          </div>
        </div> */
}
