import React from 'react';

const ExportButtons = ({ onExportExcel, onPrint, mode }) => {
  if (mode === "insert") {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        paddingRight: 70,
      }}
    >
      <button
        onClick={onPrint}
        style={{
          background: "linear-gradient(90deg, #f43f5e 0%, #fff000 100%)",
          color: "white",
          fontWeight: 700,
          border: "none",
          borderRadius: "50px 0px 0px 50px",
          padding: "12px 40px",
          fontSize: 16,
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(59,130,246,0.15)",
          transition: "all 0.2s",
          fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
        }}
      >
        ພິມ
      </button>
      <button
        onClick={onExportExcel}
        style={{
          background: "linear-gradient(90deg, #ffff00 0%, #009933 100%)",
          color: "white",
          fontWeight: 700,
          border: "none",
          borderRadius: "0px 50px 50px 0px",
          padding: "12px 40px",
          fontSize: 16,
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(244,63,94,0.15)",
          transition: "all 0.2s",
          fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
        }}
      >
        Exl
      </button>
    </div>
  );
};

export default ExportButtons; 