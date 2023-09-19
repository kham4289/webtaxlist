import React, { useState, useContext, useReducer } from "react";
import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import MyTextField from "../components/textField";
import { ValueContext } from "../context/value.context";
import { NumericFormat} from "react-number-format"

function FirstStep() {
  const multiStep = useContext(ValueContext);

  return (
    <div style={{ marginTop: "2rem" }}>
      <form
        onSubmit={(e) =>
          multiStep.handleSubmitFirst(e, {
            nextStep: 1,
          })
        }
      >
        <Stack direction={"column"} spacing={2}>
          <div className="box" style={{ padding: "0px" }}>
            <div className="form">
              <MyTextField
                autoComplete="off"
                label="Taxpayer/ ເບີໂທ"
                name="TIN"
                value={multiStep.first.TIN}
                onChange={multiStep.handleChange1}
                required
              />
              <MyTextField
                autoComplete="off"
                label="Invioce NO/ ເລກທີໃບເກັບເງິນ"
                name="INV_NO"
                value={multiStep.first.INV_NO}
                onChange={multiStep.handleChange1}
                required
              />
              {/* <MyTextField
                autoComplete="off"
                label="Invoice Date/ ວັນທີປີນໃບບີນ"
                name="INV_DD"
                value={multiStep.first.INV_DD}
                onChange={multiStep.handleChange1}
                required
              /> */}
              <MyTextField
                autoComplete="off"
                label="Buyer TIN/ ເລກປະຈຳຕົວຜູ້ຊື້ ຫຼື ລະຫັດ"
                name="BY_TIN"
                value={multiStep.first.BY_TIN}
                onChange={multiStep.handleChange1}
                required
              />
              <MyTextField
                autoComplete="off"
                label="Buyer Name/ ຊື່ຜູ້ຊື້"
                name="BY_FULL_NM"
                value={multiStep.first.BY_FULL_NM}
                onChange={multiStep.handleChange1}
                required
              />
              <NumericFormat thousandSeparator="," customInput={MyTextField}
                // type="number"
                autoComplete="off"
                label="Count of Detail Lists/ ຈຳນວນລາຍການ"
                name="SALE_CNT"
                value={multiStep.first.SALE_CNT}
                onChange={multiStep.handleChange1}
                required
              />
              <NumericFormat thousandSeparator="," customInput={MyTextField}
                // type="number"
                autoComplete="off"
                label="SUPL_AMT/ ມູນຄ່າກ່ອນອາກອນ "
                name="SUPL_AMT"
                value={multiStep.first.SUPL_AMT}
                onChange={multiStep.handleChange1}
                required
              />
              <MyTextField
                autoComplete="off"
                label="Service Fee/ ໂຕຕັດຟຣີ"
                name="SVC_FEE"
                value={multiStep.first.SVC_FEE}
                onChange={multiStep.handleChange1}
                required
              />
              <NumericFormat thousandSeparator="," customInput={MyTextField}
                // type="number"
                autoComplete="off"
                label="EXCISE_AMT/ ມູນຄ່າອາກອນຊົມໃຊ້"
                name="EXCISE_AMT"
                value={multiStep.first.EXCISE_AMT}
                onChange={multiStep.handleChange1}
                required
              />
              <NumericFormat thousandSeparator="," customInput={MyTextField}
                // type="number"
                autoComplete="off"
                label="VAT_AMT/ ມູນຄ່າອາກອນມູນຄ່າເພີມ"
                name="VAT_AMT"
                value={multiStep.first.VAT_AMT}
                onChange={multiStep.handleChange1}
                required
              />
              <NumericFormat thousandSeparator="," customInput={MyTextField}
                // type="number"
                autoComplete="off"
                label="SALE_AMT/ ມູນຄ່າຂາຍລວມອາກອນ"
                name="SALE_AMT"
                value={multiStep.first.SALE_AMT}
                onChange={multiStep.handleChange1}
                required
              />
              <NumericFormat thousandSeparator="," customInput={MyTextField}
                // type="number"
                autoComplete="off"
                label="DISC_AMT/ ຈຳນວນສ່ວນຫຼຸດ"
                name="DISC_AMT"
                value={multiStep.first.DISC_AMT}
                onChange={multiStep.handleChange1}
                required
              />
              <NumericFormat thousandSeparator="," customInput={MyTextField}
                // type="number"
                autoComplete="off"
                label="SALE_CNCL_CNT/ ຈຳນວນຂອງການຍົກເລີກບິນ"
                name="SALE_CNCL_CNT"
                value={multiStep.first.SALE_CNCL_CNT}
                onChange={multiStep.handleChange1}
                required
              />
              <NumericFormat thousandSeparator="," customInput={MyTextField}
                // type="number"
                autoComplete="off"
                label="SALE_CNCL_AMT/ ຈຳນວນເງິນຍົກເລີກ"
                name="SALE_CNCL_AMT"
                value={multiStep.first.SALE_CNCL_AMT}
                onChange={multiStep.handleChange1}
                required
              />
              {/* <MyTextField
                
                autoComplete="off"
                placeholder="YYYYMMDD"
                label="CDATE"
                name="CDATE"
                value={multiStep.first.CDATE}
                onChange={multiStep.handleChange1}
                required
              /> */}
            </div>
            <br />
            <div className="bottom-form" style={{ textAlign: "center" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                ໜ້າຕໍ່ໄປ
              </Button>
            </div>
          </div>
        </Stack>
      </form>
    </div>
  );
}

export default FirstStep;
