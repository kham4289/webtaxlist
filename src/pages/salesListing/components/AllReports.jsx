import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { salesInvoiceService } from "../../../services/salesInvoiceService";
import DeleteButton from "./DeleteInvoiceNo";

const AllReports = forwardRef(({ savedData, modeExportPDF = false }, ref) => {
  const [invoiceData, setInvoiceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [paidType, setPaidType] = useState("ALL");
  const [invoiceType, setInvoiceType] = useState("ALL");
  const [showFilters, setShowFilters] = useState(false);

  // Expose handlePrint function to parent component
  useImperativeHandle(ref, () => ({
    handlePrint: () => {
      if (invoiceData.length === 0) {
        alert("ກະລຸນາເລືອກຂໍ້ມູນກ່ອນພິມ");
        return;
      }
      printReport();
    },
  }));

  // Set default dates (current month)
  useEffect(() => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    setFromDate(firstDay.toISOString().split("T")[0]);
    setToDate(lastDay.toISOString().split("T")[0]);
  }, []);

  // Fetch invoice summary from API
  const fetchInvoiceSummary = async () => {
    if (!fromDate || !toDate) {
      setError("ກະລຸນາເລືອກວັນທີເລີ່ມ ແລະ ວັນທີສິ້ນສຸດ");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const data = await salesInvoiceService.getInvoiceSummary(
        fromDate,
        toDate,
        paidType
      );
      console.log("Invoice summary fetched:", data);

      // Filter by invoice type if not ALL
      let filteredData = data;
      if (invoiceType !== "ALL") {
        filteredData = data.filter((item) => {
          const orderRef = item.orderRef || "";
          return orderRef.startsWith(invoiceType);
        });
      }

      setInvoiceData(filteredData);
    } catch (error) {
      console.error("Error fetching invoice summary:", error);
      setError("ບໍ່ສາມາດດຶງລາຍງານໄດ້: " + error.message);
      setInvoiceData([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    fetchInvoiceSummary();
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB");
    } catch (error) {
      return dateString;
    }
  };

  // Calculate grand total
  const calculateGrandTotal = () => {
    return invoiceData.reduce(
      (sum, item) => sum + (parseFloat(item.grandTotalAmt) || 0),
      0
    );
  };

  // Handle print
  const printReport = () => {
    if (invoiceData.length === 0) {
      alert("ກະລຸນາເລືອກຂໍ້ມູນກ່ອນພິມ");
      return;
    }

    console.log("Printing data:", invoiceData); // Debug log

    // Prepare header info
    const now = new Date();
    const printDate = now.toLocaleDateString("en-GB");
    const printTime = now.toTimeString().slice(0, 5);
    const page = 1; // For now, always 1 page
    const transactionType = paidType;
    const transactionRef = invoiceType === "ALL" ? "ALL" : invoiceType;
    const transactionDate = formatDate(fromDate);

    // Generate table rows directly in JavaScript
    function pad(str, len, right) {
      str = str == null ? "" : String(str);
      if (str.length > len) return str.slice(0, len);
      return right ? str.padEnd(len, " ") : str.padStart(len, " ");
    }

    let tableRows = "";
    invoiceData.forEach((row) => {
      tableRows += pad(row.orderRef || "", 10, true) + " ";
      tableRows += pad(row.paidType || "", 7, true) + " ";
      tableRows += pad(row.ivRef || "", 12, true) + " ";
      tableRows +=
        pad(
          row.orderDate
            ? new Date(row.orderDate).toLocaleDateString("en-GB").slice(0, 8)
            : "",
          8,
          true
        ) + " ";
      tableRows += pad("-", 12, true) + " ";
      tableRows += pad("-", 8, true) + " ";
      tableRows += pad(row.cusCode || "", 8, true) + " ";
      tableRows += pad("-", 8, true) + " ";
      tableRows += pad(row.orderRef || "", 10, true) + " ";
      tableRows +=
        pad(
          row.orderDate
            ? new Date(row.orderDate).toLocaleDateString("en-GB").slice(0, 8)
            : "",
          8,
          true
        ) + " ";
      tableRows +=
        pad(parseFloat(row.grandTotalAmt || 0).toLocaleString(), 12, false) +
        "\n";
    });

    // Monospace header (pre tag for alignment)
    const header = `
VimpelCom Lao Company Ltd.                                             SALES LISTING         Page ${page}  Printed ${printDate}  ${printTime}
Transaction Type: ${transactionType.padEnd(
      6
    )}   Transaction Ref: ${transactionRef.padEnd(
      6
    )}   Transaction Date: ${transactionDate}   Invoices and Orders   Summary Print
`;

    const printWindow = window.open("", "_blank");
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>SALES LISTING - ${formatDate(fromDate)} to ${formatDate(
      toDate
    )}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Lao:wght@400;500;600;700&display=swap');
            
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: 'Noto Sans Lao', Arial, sans-serif;
              margin: 0;
              padding: 30px;
              background: white;
              font-size: 12px;
              line-height: 1.4;
              color: #333;
            }
            
            .header {
              text-align: center;
              margin-bottom: 30px;
              padding-bottom: 20px;
              border-bottom: 3px solid #2c3e50;
            }
            
            .company-name {
              font-size: 24px;
              font-weight: 700;
              color: #2c3e50;
              margin-bottom: 8px;
            }
            
            .report-title {
              font-size: 20px;
              font-weight: 600;
              color: #34495e;
              margin-bottom: 5px;
            }
            
            .report-info {
              font-size: 14px;
              color: #666;
              margin-bottom: 5px;
            }
            
            .print-info {
              font-size: 12px;
              color: #888;
              font-style: italic;
            }
            
            .table-container {
              margin: 20px 0;
              border: 2px solid #2c3e50;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            }
            
            .table-header {
              background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
              color: white;
              font-weight: 600;
              font-size: 11px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            
            .table-header-row {
              display: grid;
              grid-template-columns: 1.2fr 0.8fr 1.2fr 0.8fr 1fr 0.8fr 1fr 0.8fr 1.2fr 0.8fr 1.2fr;
              gap: 1px;
              background: #e0e0e0;
            }
            
            .table-header-cell {
              padding: 12px 8px;
              text-align: center;
              background: #2c3e50;
              color: white;
              font-weight: 700;
            }
            
            .table-body {
              background: #e0e0e0;
            }
            
            .table-row {
              display: grid;
              grid-template-columns: 1.2fr 0.8fr 1.2fr 0.8fr 1fr 0.8fr 1fr 0.8fr 1.2fr 0.8fr 1.2fr;
              gap: 1px;
              transition: background-color 0.2s ease;
            }
            
            .table-row:nth-child(even) {
              background: #f8f9fa;
            }
            
            .table-row:nth-child(odd) {
              background: #ffffff;
            }
            
            .table-cell {
              padding: 10px 8px;
              border-right: 1px solid #e0e0e0;
              font-size: 11px;
            }
            
            .table-cell:last-child {
              border-right: none;
            }
            
            .cell-order-ref {
              font-weight: 600;
              color: #2c3e50;
            }
            
            .cell-type {
              text-align: center;
              color: #666;
            }
            
            .cell-invoice {
              font-weight: 500;
              color: #2c3e50;
            }
            
            .cell-date {
              text-align: center;
              color: #666;
            }
            
            .cell-empty {
              text-align: center;
              color: #999;
              font-style: italic;
            }
            
            .cell-customer {
              text-align: center;
              font-weight: 500;
              color: #2c3e50;
            }
            
            .cell-value {
              text-align: right;
              font-weight: 700;
              color: #27ae60;
              font-size: 12px;
            }
            
            .totals-section {
              margin-top: 30px;
              text-align: right;
              padding: 20px;
              background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
              border: 2px solid #2c3e50;
              border-radius: 8px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            
            .total-label {
              font-size: 16px;
              font-weight: 600;
              color: #2c3e50;
              margin-bottom: 5px;
            }
            
            .total-amount {
              font-size: 20px;
              font-weight: 700;
              color: #27ae60;
            }
            
            .footer {
              margin-top: 30px;
              text-align: center;
              font-size: 12px;
              color: #666;
              border-top: 1px solid #ddd;
              padding-top: 15px;
            }
            
            .print-buttons {
              text-align: center;
              margin-top: 30px;
              padding: 20px;
              background: #f8f9fa;
              border-radius: 8px;
            }
            
            .print-btn {
              background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
              color: white;
              border: none;
              padding: 12px 24px;
              border-radius: 6px;
              cursor: pointer;
              font-size: 14px;
              font-weight: 600;
              margin: 0 10px;
              transition: all 0.2s ease;
              font-family: 'Noto Sans Lao', Arial, sans-serif;
            }
            
            .print-btn:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
            }
            
            .close-btn {
              background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
            }
            
            .close-btn:hover {
              box-shadow: 0 4px 12px rgba(107, 114, 128, 0.3);
            }
            
            @media print {
              body { 
                margin: 0; 
                padding: 15px;
              }
              .print-buttons { 
                display: none; 
              }
              .table-container {
                box-shadow: none;
                border: 1px solid #000;
              }
              .totals-section {
                box-shadow: none;
                border: 1px solid #000;
              }
            }
          </style>
        </head>
        <body>
          <div style="
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            width: 100%; 
            font-family: 'Courier New', monospace; 
            font-size: 13px; 
            margin: 0; 
            padding: 10px 0;
            border-bottom: 1px solid #333;
          ">
            <div>VimpelCom Lao Company Ltd.</div>
            <div>SALES LISTINGS</div>
            <div>Page ${page}  Printed ${printDate}  ${printTime}</div>
          </div>
          
          <div style="
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            width: 100%; 
            font-family: 'Courier New', monospace; 
            font-size: 13px; 
            margin: 10px 0;
            padding: 5px 0;
          ">
            <div>Transaction Type: ${transactionType.padEnd(6)}</div>
            <div>Transaction Ref: ${transactionRef.padEnd(6)}</div>
            <div>Transaction Date: ${transactionDate}</div>
            <div>Invoices and Orders Summary Print</div>
          </div>
          
                      <table style="
              width: 100%; 
              border-collapse: collapse; 
              margin: 20px 0; 
              font-family: 'Courier New', monospace; 
              font-size: 11px;
              border: 2px solid #2c3e50;
            ">
              <thead>
                <tr style="color: #000; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                  <th style="padding: 12px 8px; text-align: center; border: 1px solid #2c3e50;">Order Ref</th>
                  <th style="padding: 12px 8px; text-align: center; border: 1px solid #2c3e50;">Type</th>
                  <th style="padding: 12px 8px; text-align: center; border: 1px solid #2c3e50;">Invoice Ref</th>
                  <th style="padding: 12px 8px; text-align: center; border: 1px solid #2c3e50;">Date</th>
                  <th style="padding: 12px 8px; text-align: center; border: 1px solid #2c3e50;">Quotation</th>
                  <th style="padding: 12px 8px; text-align: center; border: 1px solid #2c3e50;">Q Date</th>
                  <th style="padding: 12px 8px; text-align: center; border: 1px solid #2c3e50;">Customer</th>
                  <th style="padding: 12px 8px; text-align: center; border: 1px solid #2c3e50;">Ack Date</th>
                  <th style="padding: 12px 8px; text-align: center; border: 1px solid #2c3e50;">Delivery</th>
                  <th style="padding: 12px 8px; text-align: center; border: 1px solid #2c3e50;">D Date</th>
                  <th style="padding: 12px 8px; text-align: center; border: 1px solid #2c3e50;">Value</th>
                </tr>
              </thead>
              <tbody>
                ${invoiceData
                  .map(
                    (item, index) => `
                  <tr style="background: ${
                    index % 2 === 0 ? "#ffffff" : "#f8f9fa"
                  };">
                    <td style="padding: 10px 8px; border: 1px solid #e0e0e0; font-weight: 600; color: #000;">${
                      item.orderRef || "-"
                    }</td>
                    <td style="padding: 10px 8px; border: 1px solid #e0e0e0; font-weight: 600; color: #000;">${
                      item.paidType || "-"
                    }</td>
                    <td style="padding: 10px 8px; border: 1px solid #e0e0e0; font-weight: 600; color: #000;">${
                      item.ivRef || "-"
                    }</td>
                    <td style="padding: 10px 8px; border: 1px solid #e0e0e0; font-weight: 600; color: #000;">${
                      item.orderDate
                        ? new Date(item.orderDate).toLocaleDateString("en-GB")
                        : "-"
                    }</td>
                    <td style="padding: 10px 8px; border: 1px solid #e0e0e0; font-weight: 600; color: #000;">-</td>
                    <td style="padding: 10px 8px; border: 1px solid #e0e0e0; font-weight: 600; color: #000;">-</td>
                    <td style="padding: 10px 8px; border: 1px solid #e0e0e0; font-weight: 600; color: #000;">${
                      item.cusCode || "-"
                    }</td>
                    <td style="padding: 10px 8px; border: 1px solid #e0e0e0; font-weight: 600; color: #000;">-</td>
                    <td style="padding: 10px 8px; border: 1px solid #e0e0e0; font-weight: 600; color: #000;">${
                      item.orderRef || "-"
                    }</td>
                    <td style="padding: 10px 8px; border: 1px solid #e0e0e0; font-weight: 600; color: #000;">${
                      item.orderDate
                        ? new Date(item.orderDate).toLocaleDateString("en-GB")
                        : "-"
                    }</td>
                    <td style="padding: 10px 8px; border: 1px solid #e0e0e0; text-align: right; font-weight: 700; color: #000; font-size: 12px;">${parseFloat(
                      item.grandTotalAmt || 0
                    ).toLocaleString()}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
          
          <div class="totals-section">
            <div class="total-label">ລວມທັງໝົດ:</div>
            <div class="total-amount">${calculateGrandTotal().toLocaleString()} KIP</div>
          </div>
          
          <div class="footer">
            <p>ລາຍງານນີ້ຖືກສ້າງຂຶ້ນໂດຍລະບົບອັດຕະໂນມັດ</p>
            <p>VimpelCom Lao Company Ltd. - Sales Management System</p>
          </div>
          
          <div class="print-buttons no-print">
            <button class="print-btn" onclick="window.print()">🖨️ ພິມເອກະສານ</button>
            <button class="print-btn close-btn" onclick="window.close()">❌ ປິດ</button>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
  };

  // Auto-fetch data when component mounts
  useEffect(() => {
    console.log("AllReports component rendered with invoiceType:", invoiceType);
    if (fromDate && toDate) {
      fetchInvoiceSummary();
    }
  }, [fromDate, toDate, paidType, invoiceType]);

  return (
    <div id="report-content" style={{ padding: modeExportPDF ? 45 : 0 }}>
      {/* Header for PDF Export */}
      {modeExportPDF && (
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
            paddingBottom: "20px",
            borderBottom: "2px solid #333",
          }}
        >
          <h1
            style={{
              color: "#2c3e50",
              fontSize: "28px",
              fontWeight: "bold",
              margin: "0 0 10px 0",
              fontFamily:
                "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
            }}
          >
            SALES LISTING
          </h1>
          <p
            style={{
              color: "#666",
              fontSize: "16px",
              margin: "0",
              fontFamily:
                "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
            }}
          >
            ຊ່ວງວັນທີ: {formatDate(fromDate)} - {formatDate(toDate)}
          </p>
          <p
            style={{
              color: "#666",
              fontSize: "14px",
              margin: "5px 0 0 0",
              fontFamily:
                "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
            }}
          >
            ວັນທີສ້າງລາຍງານ: {new Date().toLocaleDateString("en-GB")}
          </p>
        </div>
      )}

      {/* Filters Section */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "15px",
          padding: "20px",
          marginBottom: "20px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
          display: modeExportPDF ? "none" : "block", // Hide filters when exporting PDF
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <h3
            style={{
              color: "#2c3e50",
              fontWeight: 600,
              margin: 0,
              fontFamily:
                "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
            }}
          >
            ຕົວກອງລາຍງານ
          </h3>
        </div>

        <form
          onSubmit={handleSearch}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "15px",
            alignItems: "end",
          }}
        >
          <div>
            <label
              style={{
                color: "#2c3e50",
                fontWeight: 600,
                fontSize: "14px",
                marginBottom: "5px",
                display: "block",
              }}
            >
              ວັນທີເລີ່ມ
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              style={{
                width: "100%",
                border: "2px solid #e8e8e8",
                borderRadius: "8px",
                padding: "10px 12px",
                fontSize: "14px",
                transition: "all 0.3s ease",
                fontFamily:
                  "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#667eea";
                e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e8e8e8";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <div>
            <label
              style={{
                color: "#2c3e50",
                fontWeight: 600,
                fontSize: "14px",
                marginBottom: "5px",
                display: "block",
              }}
            >
              ວັນທີສິ້ນສຸດ
            </label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              style={{
                width: "100%",
                border: "2px solid #e8e8e8",
                borderRadius: "8px",
                padding: "10px 12px",
                fontSize: "14px",
                transition: "all 0.3s ease",
                fontFamily:
                  "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#667eea";
                e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e8e8e8";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <div>
            <label
              style={{
                color: "#2c3e50",
                fontWeight: 600,
                fontSize: "14px",
                marginBottom: "5px",
                display: "block",
              }}
            >
              ປະເພດການຊຳລະ
            </label>
            <select
              value={paidType}
              onChange={(e) => setPaidType(e.target.value)}
              style={{
                width: "100%",
                border: "2px solid #e8e8e8",
                borderRadius: "8px",
                padding: "10px 12px",
                fontSize: "14px",
                backgroundColor: "#fafafa",
                transition: "all 0.3s ease",
                cursor: "pointer",
                fontFamily:
                  "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#667eea";
                e.target.style.backgroundColor = "#fff";
                e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e8e8e8";
                e.target.style.backgroundColor = "#fafafa";
                e.target.style.boxShadow = "none";
              }}
            >
              <option value="CASHH">ເງິນສົດ</option>
              <option value="BANK">ເງິນໂອນ</option>
              <option value="ALL">ທັງໝົດ</option>
            </select>
          </div>

          <div>
            <label
              style={{
                color: "#2c3e50",
                fontWeight: 600,
                fontSize: "14px",
                marginBottom: "5px",
                display: "block",
              }}
            >
              ປະເພດໃບເກັບເງິນ
            </label>
            <select
              value={invoiceType}
              onChange={(e) => setInvoiceType(e.target.value)}
              style={{
                width: "100%",
                border: "2px solid #e8e8e8",
                borderRadius: "8px",
                padding: "10px 12px",
                fontSize: "14px",
                backgroundColor: "#fafafa",
                transition: "all 0.3s ease",
                cursor: "pointer",
                fontFamily:
                  "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#667eea";
                e.target.style.backgroundColor = "#fff";
                e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e8e8e8";
                e.target.style.backgroundColor = "#fafafa";
                e.target.style.boxShadow = "none";
              }}
            >
              <option value="ALL">ທັງໝົດ</option>
              <option value="CI-G">CI-G</option>
              <option value="CI-H">CI-H</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              background: "linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "10px 20px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.7 : 1,
              transition: "all 0.3s ease",
              height: "42px",
              fontFamily:
                "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
            }}
          >
            {isLoading ? (
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  border: "2px solid #f3f3f3",
                  borderTop: "2px solid #fff",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  margin: "0 auto",
                }}
              ></div>
            ) : (
              "ຄົ້ນຫາ"
            )}
          </button>
        </form>
        {error && (
          <div
            style={{
              color: "#e74c3c",
              fontSize: "14px",
              marginTop: "10px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}
      </div>

      {/* Report Display */}
      <div
        style={{
          background: modeExportPDF
            ? "transparent"
            : "rgba(255, 255, 255, 0.95)",
          borderRadius: modeExportPDF ? "0" : "15px",
          padding: modeExportPDF ? "0" : "0px",
          boxShadow: modeExportPDF ? "none" : "0 4px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        {!modeExportPDF && (
          <h2
            style={{
              color: "black",
              fontWeight: 700,
              marginBottom: 20,
              textAlign: "center",
              fontSize: "24px",
              fontFamily:
                "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
            }}
          >
            SALES LISTING
          </h2>
        )}

        {isLoading ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              color: "#666",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                border: "3px solid #f3f3f3",
                borderTop: "3px solid #667eea",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto 20px",
              }}
            ></div>
            ກຳລັງດຶງຂໍ້ມູນ...
          </div>
        ) : invoiceData.length > 0 ? (
          <>
            {/* Table Container */}
            <div
              style={{
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                overflow: "auto",
                maxHeight: "500px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                marginBottom: "20px",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <style>
                {`
                  .table-container::-webkit-scrollbar {
                    display: none;
                  }
                `}
              </style>
              {/* Table Header */}
              <div
                style={{
                  display: "grid",
                  gridAutoFlow: "column",
                  gridTemplateColumns:
                    "1.2fr 0.8fr 1.2fr 0.8fr 1fr 0.8fr 1fr 0.8fr 1.2fr 0.8fr 1.2fr",
                  gap: "1px",
                  background: "#e0e0e0",
                  fontWeight: 700,
                  fontSize: "11px",
                  fontFamily: "'Noto Sans Lao', Arial, sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  position: "sticky",
                  top: 0,
                  zIndex: 10,
                }}
              >
                <div
                  style={{
                    padding: "12px 8px",
                    background: "#2c3e50",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Order Ref
                </div>
                <div
                  style={{
                    padding: "12px 8px",
                    background: "#2c3e50",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Type
                </div>
                <div
                  style={{
                    padding: "12px 8px",
                    background: "#2c3e50",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Invoice Ref
                </div>
                <div
                  style={{
                    padding: "12px 8px",
                    background: "#2c3e50",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Date
                </div>
                <div
                  style={{
                    padding: "12px 8px",
                    background: "#2c3e50",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Quotation
                </div>
                <div
                  style={{
                    padding: "12px 8px",
                    background: "#2c3e50",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Q Date
                </div>
                <div
                  style={{
                    padding: "12px 8px",
                    background: "#2c3e50",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Customer
                </div>
                <div
                  style={{
                    padding: "12px 8px",
                    background: "#2c3e50",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Ack Date
                </div>
                <div
                  style={{
                    padding: "12px 8px",
                    background: "#2c3e50",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Delivery
                </div>
                <div
                  style={{
                    padding: "12px 8px",
                    background: "#2c3e50",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  D Date
                </div>
                <div
                  style={{
                    padding: "12px 8px",
                    background: "#2c3e50",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Value
                </div>
                <div
                  style={{
                    padding: "12px 8px",
                    background: "#2c3e50",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Action
                </div>
              </div>

              {/* Table Rows */}
              {invoiceData.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "grid",
                    gridAutoFlow: "column",
                    gridTemplateColumns:
                      "1.2fr 0.8fr 1.2fr 0.8fr 1fr 0.8fr 1fr 0.8fr 1.2fr 0.8fr 1.2fr",
                    gap: "1px",
                    background: "#e0e0e0",
                    fontSize: "12px",
                    fontFamily: "'Noto Sans Lao', Arial, sans-serif",
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.01)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      padding: "12px 8px",
                      background: index % 2 === 0 ? "#ffffff" : "#f8f9fa",
                      fontWeight: 600,
                      color: "#2c3e50",
                      borderRight: "1px solid #e0e0e0",
                    }}
                  >
                    {item.orderRef || "-"}
                  </div>
                  <div
                    style={{
                      padding: "12px 8px",
                      background: index % 2 === 0 ? "#ffffff" : "#f8f9fa",
                      textAlign: "center",
                      color: "#666",
                    }}
                  >
                    {item.paidType || "-"}
                  </div>
                  <div
                    style={{
                      padding: "12px 8px",
                      background: index % 2 === 0 ? "#ffffff" : "#f8f9fa",
                      color: "#2c3e50",
                      fontWeight: 500,
                    }}
                  >
                    {item.ivRef || "-"}
                  </div>
                  <div
                    style={{
                      padding: "12px 8px",
                      background: index % 2 === 0 ? "#ffffff" : "#f8f9fa",
                      textAlign: "center",
                      color: "#666",
                    }}
                  >
                    {item.orderDate ? formatDate(item.orderDate) : "-"}
                  </div>
                  <div
                    style={{
                      padding: "12px 8px",
                      background: index % 2 === 0 ? "#ffffff" : "#f8f9fa",
                      textAlign: "center",
                      color: "#999",
                    }}
                  >
                    -
                  </div>
                  <div
                    style={{
                      padding: "12px 8px",
                      background: index % 2 === 0 ? "#ffffff" : "#f8f9fa",
                      textAlign: "center",
                      color: "#999",
                    }}
                  >
                    -
                  </div>
                  <div
                    style={{
                      padding: "12px 8px",
                      background: index % 2 === 0 ? "#ffffff" : "#f8f9fa",
                      textAlign: "center",
                      color: "#2c3e50",
                      fontWeight: 500,
                    }}
                  >
                    {item.cusCode || "-"}
                  </div>
                  <div
                    style={{
                      padding: "12px 8px",
                      background: index % 2 === 0 ? "#ffffff" : "#f8f9fa",
                      textAlign: "center",
                      color: "#999",
                    }}
                  >
                    -
                  </div>
                  <div
                    style={{
                      padding: "12px 8px",
                      background: index % 2 === 0 ? "#ffffff" : "#f8f9fa",
                      color: "#2c3e50",
                      fontWeight: 500,
                    }}
                  >
                    {item.orderRef || "-"}
                  </div>
                  <div
                    style={{
                      padding: "12px 8px",
                      background: index % 2 === 0 ? "#ffffff" : "#f8f9fa",
                      textAlign: "center",
                      color: "#666",
                    }}
                  >
                    {item.orderDate ? formatDate(item.orderDate) : "-"}
                  </div>
                  <div
                    style={{
                      padding: "12px 8px",
                      background: index % 2 === 0 ? "#ffffff" : "#f8f9fa",
                      textAlign: "right",
                      fontWeight: 700,
                      color: "#27ae60",
                      fontSize: "13px",
                    }}
                  >
                    {parseFloat(item.grandTotalAmt || 0).toLocaleString()}
                  </div>
                  <div
                    style={{
                      padding: "12px 8px",
                      background: index % 2 === 0 ? "#ffffff" : "#f8f9fa",
                      textAlign: "center",
                      color: "#666",
                    }}
                  >
                    <DeleteButton invoiceNo={item.ivRef} onDeleted={()=> fetchInvoiceSummary()} />
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                textAlign: "right",
                fontSize: modeExportPDF ? "12px" : "16px",
                fontWeight: 600,
                padding: "15px",
                background: modeExportPDF ? "#f8f9fa" : "#f8f9fa",
                borderRadius: modeExportPDF ? "0" : "8px",
                marginTop: "20px",
                border: modeExportPDF ? "1px solid #333" : "none",
              }}
            >
              ລວມທັງໝົດ: {calculateGrandTotal().toLocaleString()} KIP
            </div>
          </>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              color: "#666",
              fontSize: "16px",
            }}
          >
            ບໍ່ມີຂໍ້ມູນໃນຊ່ວງວັນທີທີ່ເລືອກ
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
});

export default AllReports;
