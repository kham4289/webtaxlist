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

{
  /* <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "2rem",
        boxShadow: "2px 3px 16px rgba(0, 0, 0, 0.25)",
        padding: "2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "1rem",
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
