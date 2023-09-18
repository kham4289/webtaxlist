import React, { useContext } from "react";
import { Button } from "@mui/material";
import { ValueContext } from "../context/value.context";
import { CardItemAlldata } from "./CardItemAlldata";
import { CardItemData } from "./CardItemData";

function TirstStep() {
  const multiStep = useContext(ValueContext);
  return (
    <div>
      <div>
        <CardItemAlldata />
      </div>
      <br />
      <h2 style={{ textAlign: "center" }}>ລາຍການຂອງ TAXLIST</h2>
      <br />
      <div>
        <CardItemData />
      </div>
      <br />
      <div
        style={{
          textAlign: "center",
        }}
      >
        <Button
          variant="contained"
          onClick={() => multiStep.setStep(1)}
          color="primary"
          size="large"
          style={{ marginRight: "10px" }}
        >
          ກັບຄືນ
        </Button>
        
          <Button
            variant="contained"
            onClick={multiStep.handleSubmitFinal}
            color="success"
            size="large"
            style={{ marginRight: "10px" }}
          >
            ບັນທືກ
          </Button>
          
      
        {multiStep.isLoading && <p>loading...!</p>}
        {/* {multiStep.error && <p>{multiStep.error.message}</p>} */}
      </div>
    </div>
  );
}

export default TirstStep;
