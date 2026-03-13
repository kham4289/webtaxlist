import React, { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import SingleReport from "./components/SingleReport";
import AllReports from "./components/AllReports";
import ExportButtons from "./components/ExportButtons";
import NavigationTabs from "./components/NavigationTabs";
import InsertForm from "./components/InsertForm";

export default function Report() {
  const [mode, setMode] = useState("insert");
  const [modeExportPDF, setModeExportPDF] = useState(false);
  const [savedData, setSavedData] = useState([]);
  const [currentInvoiceNo, setCurrentInvoiceNo] = useState(null);
  const [autoSearchInvoiceNo, setAutoSearchInvoiceNo] = useState(null);
  const [currentInvoiceData, setCurrentInvoiceData] = useState(null);

  // Refs for components
  const singleReportRef = useRef();
  const allReportsRef = useRef();

  // Load saved data from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("salesData") || "[]");
    setSavedData(data);
  }, []);

  const handleSave = (completeData) => {
    // Store in localStorage
    const existingData = JSON.parse(localStorage.getItem("salesData") || "[]");
    existingData.push(completeData);
    localStorage.setItem("salesData", JSON.stringify(existingData));
    
    // Set current invoice number for Single Report
    if (completeData.invoiceNo) {
      setCurrentInvoiceNo(completeData.invoiceNo);
      setAutoSearchInvoiceNo(completeData.invoiceNo);
    }
    
    alert("ບັນທຶກຂ້ອມູນສຳເລັດ!");
    setMode("single"); // Switch to all reports view after saving
    setSavedData(existingData); // Update the state
  };

  const clearAutoSearchInvoiceNo = () => {
    setAutoSearchInvoiceNo(null);
  };

  const handleSwitchToSingle = (invoiceNo, invoiceData = null) => {
    console.log('handleSwitchToSingle called with invoiceNo:', invoiceNo, 'and invoiceData:', invoiceData);
    if (invoiceNo) {
      console.log('Setting currentInvoiceNo and autoSearchInvoiceNo to:', invoiceNo);
      setCurrentInvoiceNo(invoiceNo);
      setAutoSearchInvoiceNo(invoiceNo);
    }
    if (invoiceData) {
      console.log('Setting currentInvoiceData to:', invoiceData);
      setCurrentInvoiceData(invoiceData);
    }
    console.log('Switching to single mode');
    setMode("single");
  };

  const handleExportPDF = async () => {
    setModeExportPDF(true);
    setTimeout(async () => {
      const input = document.getElementById("report-content");
      if (!input) {
        console.error("Report content element not found");
        setModeExportPDF(false);
        return;
      }
      
      try {
        const canvas = await html2canvas(input, { 
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff"
        });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(imgData);
        const margin = 40; // Add some margin
      const pdfWidth = pageWidth - margin * 2;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        // Check if content fits on one page
        const pageHeight = pdf.internal.pageSize.getHeight();
        if (pdfHeight > pageHeight - margin * 2) {
          // Content is too long, split into multiple pages
          let heightLeft = pdfHeight;
          let position = margin;
          let page = 1;
          
          pdf.addImage(imgData, "PNG", margin, position, pdfWidth, pdfHeight);
          heightLeft -= (pageHeight - margin * 2);
          
          while (heightLeft >= 0) {
            position = heightLeft - pdfHeight + margin;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", margin, position, pdfWidth, pdfHeight);
            heightLeft -= (pageHeight - margin * 2);
            page++;
          }
        } else {
          // Content fits on one page
      pdf.addImage(imgData, "PNG", margin, margin, pdfWidth, pdfHeight);
        }
      
      // Generate filename with date and time
      const now = new Date();
      const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
      const timeStr = now.toTimeString().slice(0, 8).replace(/:/g, "");
      const filename =
        mode === "single"
          ? `invoice_${dateStr}_${timeStr}.pdf`
          : `all_invoices_${dateStr}_${timeStr}.pdf`;
      
      pdf.save(filename);
      } catch (error) {
        console.error("Error generating PDF:", error);
        alert("ບໍ່ສາມາດ export PDF ໄດ້: " + error.message);
      } finally {
      setModeExportPDF(false);
      }
    }, 500); // Increased timeout to ensure content is rendered
  };

  // Excel export function
  const exportExcel = () => {
    if (mode === "single") {
      alert("can not export single mode report to excel.");
      return;
    }
    const dataToExport = savedData.map((item) => ({
      order: item.orderReference,
      date: item.orderDate,
      dealer: item.account,
    }));
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "All Invoices");
    
    // Generate filename with date and time
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
    const timeStr = now.toTimeString().slice(0, 8).replace(/:/g, "");
    const filename = `all_invoices_${dateStr}_${timeStr}.xlsx`;
    
    XLSX.writeFile(wb, filename);
  };

  // Print function
  const handlePrint = () => {
    if (mode === "insert") {
      alert("ກະລຸນາເລືອກລາຍງານກ່ອນພິມ");
      return;
    }
    
    // Trigger print for the current mode
    if (mode === "single") {
      // For single report, call the handlePrint function from SingleReport
      if (singleReportRef.current) {
        singleReportRef.current.handlePrint();
      }
    } else {
      // For all reports, call the handlePrint function from AllReports
      if (allReportsRef.current) {
        allReportsRef.current.handlePrint();
      }
    }
  };

  return (
    <div
      style={{
        fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
        background: "#ffff",
        minHeight: "100vh",
      }}
    >
      <NavigationTabs mode={mode} onModeChange={setMode} />
      <ExportButtons 
        onExportPDF={handleExportPDF} 
        onExportExcel={exportExcel} 
        onPrint={handlePrint}
        mode={mode} 
      />
      <div
        style={{
          background: "#fff",
          borderRadius: "0px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          padding: 50,
          paddingTop: 0,
          minHeight: "100vh",
        }}
      >
        <div style={{ padding: modeExportPDF ? 45 : 0 }}>
          {mode === "insert" ? (
            <InsertForm onSave={handleSave} onSwitchToSingle={handleSwitchToSingle} />
          ) : mode === "single" ? (
            <SingleReport 
              ref={singleReportRef}
              modeExportPDF={modeExportPDF} 
              currentInvoiceNo={currentInvoiceNo}
              autoSearchInvoiceNo={autoSearchInvoiceNo}
              onAutoSearchComplete={clearAutoSearchInvoiceNo}
              currentInvoiceData={currentInvoiceData}
            />
          ) : (
            <AllReports 
              ref={allReportsRef}
              savedData={savedData} 
              modeExportPDF={modeExportPDF} 
            />
          )}
        </div>
      </div>
    </div>
  );
}
