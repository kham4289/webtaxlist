import React from 'react';

const NavigationTabs = ({ mode, onModeChange }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div/>
      <div
        style={{
          display: "flex",
          background: "#f2f2f2",
          borderRadius: "0px 0px 999px 999px",
          overflow: "hidden",
        }}
      >
        <button
          onClick={() => onModeChange("insert")}
          style={{
            background: mode === "insert" ? "#f59e42" : "transparent",
            color: mode === "insert" ? "white" : "#374151",
            fontWeight: 600,
            border: "none",
            width: "200px",
            borderRadius: "0px 59px 0px 0px",
            padding: "12px 40px",
            fontSize: 16,
            cursor: "pointer",
            boxShadow:
              mode === "insert" ? "0 2px 8px rgba(52,211,153,0.15)" : "none",
            transition: "all 0.2s",
            outline: "none",
            fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
          }}
        >
          ບັນການສັ່ງຊື້
        </button>
        <button
          onClick={() => onModeChange("single")}
          style={{
            background: mode === "single" ? "#f59e42" : "transparent",
            color: mode === "single" ? "white" : "#374151",
            fontWeight: 600,
            border: "none",
            borderRadius: "0px 0px 69px 69px",
            padding: "12px 40px",
            fontSize: 16,
            width: "220px",
            cursor: "pointer",
            boxShadow:
              mode === "single" ? "0 2px 8px rgba(52,211,153,0.15)" : "none",
            transition: "all 0.2s",
            outline: "none",
            fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
          }}
        >
          ພິມໃບບີນ
        </button>
        <button
          onClick={() => onModeChange("all")}
          style={{
            background: mode === "all" ? "#f59e42" : "transparent",
            color: mode === "all" ? "white" : "#374151",
            fontWeight: 600,
            border: "none",
            width: "200px",
            borderRadius: "59px 0px 0px 0px",
            padding: "12px 40px",
            fontSize: 16,
            cursor: "pointer",
            boxShadow:
              mode === "all" ? "0 2px 8px rgba(52,211,153,0.15)" : "none",
            transition: "all 0.2s",
            outline: "none",
            fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
          }}
        >
          ລາຍງານລອມ
        </button>
      </div>
      <div/>
    </div>
  );
};

export default NavigationTabs; 