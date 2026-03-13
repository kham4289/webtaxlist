import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { salesInvoiceService } from '../../../services/salesInvoiceService';

const SingleReport = forwardRef(({ modeExportPDF = false, currentInvoiceNo = null, autoSearchInvoiceNo = null, onAutoSearchComplete = null, currentInvoiceData = null }, ref) => {
  const [invoiceData, setInvoiceData] = useState(null);
  const [searchInvoiceNo, setSearchInvoiceNo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Expose handlePrint function to parent component
  useImperativeHandle(ref, () => ({
    handlePrint: () => {
      if (!invoiceData) {
        alert('ກະລຸນາເລືອກໃບເກັບເງິນກ່ອນພິມ');
        return;
      }
      printInvoice();
    }
  }));

  console.log('SingleReport rendered with:', { 
    currentInvoiceNo, 
    autoSearchInvoiceNo, 
    modeExportPDF,
    searchInvoiceNo,
    invoiceData,
    currentInvoiceData 
  });

  // Set invoice data directly if available
  useEffect(() => {
    if (currentInvoiceData) {
      console.log('Setting invoice data directly from currentInvoiceData:', currentInvoiceData);
      setInvoiceData(currentInvoiceData);
      setSearchInvoiceNo(currentInvoiceData.ivRef || currentInvoiceData.invoiceNo || '');
      setError('');
    }
  }, [currentInvoiceData]);

  // Auto-fetch invoice details when currentInvoiceNo is provided
  useEffect(() => {
    console.log('useEffect for currentInvoiceNo triggered:', currentInvoiceNo);
    if (currentInvoiceNo) {
      console.log('Setting searchInvoiceNo to currentInvoiceNo:', currentInvoiceNo);
      setSearchInvoiceNo(currentInvoiceNo);
      console.log('Calling fetchInvoiceDetails with currentInvoiceNo:', currentInvoiceNo);
      fetchInvoiceDetails(currentInvoiceNo, false);
    }
  }, [currentInvoiceNo]);

  // Auto-populate and search when autoSearchInvoiceNo is provided
  useEffect(() => {
    console.log('useEffect for autoSearchInvoiceNo triggered:', autoSearchInvoiceNo);
    if (autoSearchInvoiceNo) {
      console.log('Setting searchInvoiceNo to autoSearchInvoiceNo:', autoSearchInvoiceNo);
      setSearchInvoiceNo(autoSearchInvoiceNo);
      console.log('Calling fetchInvoiceDetails with autoSearchInvoiceNo:', autoSearchInvoiceNo);
      fetchInvoiceDetails(autoSearchInvoiceNo, true);
    }
  }, [autoSearchInvoiceNo]);

  // Fetch invoice details from API
  const fetchInvoiceDetails = async (invoiceNo, isAutoSearch = false) => {
    console.log('fetchInvoiceDetails called with:', { invoiceNo, isAutoSearch });
    
    if (!invoiceNo.trim()) {
      console.log('Empty invoice number, returning early');
      setError('ກະລຸນາປ້ອນລະຫັດໃບເກັບເງິນ');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      console.log('Calling API to get invoice details for:', invoiceNo);
      const data = await salesInvoiceService.getInvoiceDetails(invoiceNo);
      console.log('Invoice details fetched successfully:', data);
      setInvoiceData(data);
      
      // Call callback only if this was an auto-search
      if (isAutoSearch && onAutoSearchComplete) {
        console.log('Calling onAutoSearchComplete callback');
        onAutoSearchComplete();
      }
    } catch (error) {
      console.error('Error fetching invoice details:', error);
      setError('ບໍ່ສາມາດດຶງຂໍ້ມູນໃບເກັບເງິນໄດ້: ' + error.message);
      setInvoiceData(null);
      
      // Call callback even on error for auto-search
      if (isAutoSearch && onAutoSearchComplete) {
        console.log('Calling onAutoSearchComplete callback on error');
        onAutoSearchComplete();
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    fetchInvoiceDetails(searchInvoiceNo, false);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      fetchInvoiceDetails(searchInvoiceNo, false);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB');
    } catch (error) {
      return dateString;
    }
  };

  // Calculate totals
  const calculateTotals = (items) => {
    if (!items || !Array.isArray(items)) return { subtotal: 0, tax: 0, grandTotal: 0 };
    
    const subtotal = items.reduce((sum, item) => sum + (parseFloat(item.amountKIP) || 0), 0);
    const tax = parseFloat(invoiceData.turnoverTax) || (subtotal * 0.1); // Use API tax or calculate 10%
    const grandTotal = subtotal + tax;
    
    return { subtotal, tax, grandTotal };
  };

  // Handle print
  const printInvoice = () => {
    if (!invoiceData) {
      alert('ກະລຸນາເລືອກໃບເກັບເງິນກ່ອນພິມ');
      return;
    }

    const printWindow = window.open('', '_blank');
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>ໃບເກັບເງິນຂາຍ - ${invoiceData.ivRef}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Lao:wght@400;600;700;800;900&display=swap');
            body {
              font-family: 'Noto Sans Lao', Arial, sans-serif;
              margin: 0;
              padding: 20px;
              background: white;
              color: #000;
              font-weight: 500;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              padding-bottom: 20px;
              border-bottom: 3px solid #000;
            }
            .header h1 {
              color: #000;
              font-size: 32px;
              font-weight: 900;
              margin: 0 0 10px 0;
            }
            .header p {
              color: #000;
              font-size: 18px;
              margin: 5px 0;
              font-weight: 600;
            }
            .company-info {
              display: flex;
              justify-content: space-between;
              margin-bottom: 20px;
            }
            .company-details {
              font-size: 16px;
              color: #000;
              font-weight: 600;
            }
            .invoice-details {
              text-align: right;
              font-size: 16px;
              color: #000;
              font-weight: 600;
            }
            .customer-section {
              background: #f0f0f0;
              padding: 15px;
              margin-bottom: 20px;
              border: 2px solid #000;
            }
            .customer-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
              gap: 10px;
              font-size: 16px;
              color: #000;
              font-weight: 600;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
              font-size: 16px;
              font-weight: 600;
            }
            th, td {
              border: 2px solid #000;
              padding: 12px 8px;
              text-align: left;
              color: #000;
              font-weight: 600;
            }
            th {
              background: #e0e0e0;
              font-weight: 800;
              text-align: center;
              font-size: 18px;
              color: #000;
            }
            td {
              font-size: 16px;
              font-weight: 600;
              color: #000;
            }
            .totals {
              text-align: right;
              font-size: 18px;
              margin-top: 20px;
              padding: 20px;
              background: #f0f0f0;
              border: 2px solid #000;
              font-weight: 700;
              color: #000;
            }
            .totals b {
              font-weight: 900;
              color: #000;
            }
            @media print {
              body { 
                margin: 0; 
                color: #000;
                font-weight: 600;
              }
              .no-print { display: none; }
              * {
                color: #000 !important;
                font-weight: 600 !important;
              }
              th, td {
                border: 2px solid #000 !important;
                color: #000 !important;
                font-weight: 600 !important;
              }
              .totals {
                background: #f0f0f0 !important;
                border: 2px solid #000 !important;
                color: #000 !important;
                font-weight: 700 !important;
              }
            }
          </style>
        </head>
        <body>
          <div class="company-info">
            <div class="company-details">
              <div style="font-weight: 600; font-size: 16px; margin-bottom: 5px;">TPlus Digital, LTD.</div>
              <div>DSP-TH doy, Souvannasing</div>
              <div>Kpudhit Village</div>
              <div>Attsephone District</div>
              <div>Savannakhet Province, Lao PDR</div>
            </div>
            <div class="invoice-details">
              <div style="margin-bottom: 5px;">ວັນທີໃບເກັບເງິນ: <b>${formatDate(invoiceData.ivDate)}</b></div>
              <div style="margin-bottom: 5px;">ລະຫັດໃບເກັບເງິນ: <b>${invoiceData.ivRef}</b></div>
              <div style="margin-bottom: 5px;">ລະຫັດອໍເດີ: <b>${invoiceData.orderRef}</b></div>
              <div style="margin-bottom: 5px;">ລະຫັດລູກຄ້າ: <b>${invoiceData.cusCode}</b></div>
              <div style="margin-bottom: 5px;">ຊື່ລູກຄ້າ: <b>${invoiceData.cusName}</b></div>
              <div style="margin-bottom: 5px;">ປະເທດ: <b>${invoiceData.cusCountry || "-"}</b></div>
            </div>
          </div>

          <div class="customer-section">
            <div style="font-weight: 600; margin-bottom: 10px;">ຂໍ້ມູນລູກຄ້າ:</div>
            <div class="customer-grid">
              <div>ຊື່: ${invoiceData.cusName}</div>
              <div>ບ້ານ: ${invoiceData.cusVillage}</div>
              <div>ເມືອງ: ${invoiceData.cusDistrict}</div>
              <div>ແຂວງ: ${invoiceData.cusProvince}</div>
              <div>ປະເທດ: ${invoiceData.cusCountry || "-"}</div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>ລຳດັບ</th>
                <th>ລາຍການ</th>
                <th>ຈຳນວນ</th>
                <th>ລາຄາ (KIP)</th>
              </tr>
            </thead>
            <tbody>
              ${invoiceData.dataItem ? invoiceData.dataItem.map((item, i) => `
                <tr>
                  <td style="text-align: center;">${i + 1}</td>
                  <td>${item.descript}</td>
                  <td style="text-align: center;">${item.qty}</td>
                  <td style="text-align: right;">${parseFloat(item.amountKIP).toLocaleString()}</td>
                </tr>
              `).join('') : ''}
            </tbody>
          </table>

          <div class="totals">
            ${(() => {
              const totals = calculateTotals(invoiceData.dataItem);
              return `
                <div style="margin-bottom: 5px;">ລວມຍ່ອຍ: <b>${totals.subtotal.toLocaleString()} KIP</b></div>
                <div style="margin-bottom: 5px;">ສ່ວນຫຼຸດມາດຕະຖານ: <b>${(parseFloat(invoiceData.totalStdDisc) || 0).toLocaleString()} KIP</b></div>
                <div style="margin-bottom: 5px;">ອາກອນການຄ້າ: <b>${(parseFloat(invoiceData.turnoverTax) || 0).toLocaleString()} KIP</b></div>
                <div style="margin-bottom: 5px;">ລວມທັງໝົດ: <b>${(parseFloat(invoiceData.grandTotalAmt) || totals.grandTotal).toLocaleString()} KIP</b></div>
                <div style="margin-bottom: 5px;">ປະເພດການຊຳລະ: <b>${invoiceData.paidType}</b></div>
              `;
            })()}
          </div>

          <div class="no-print" style="text-align: center; margin-top: 30px;">
            <button onclick="window.print()" style="
              background: #3b82f6;
              color: white;
              border: none;
              padding: 10px 20px;
              border-radius: 5px;
              cursor: pointer;
              font-size: 16px;
            ">ພິມເອກະສານ</button>
            <button onclick="window.close()" style="
              background: #6b7280;
              color: white;
              border: none;
              padding: 10px 20px;
              border-radius: 5px;
              cursor: pointer;
              font-size: 16px;
              margin-left: 10px;
            ">ປິດ</button>
          </div>
        </body>
      </html>
    `;
    
    printWindow.document.write(printContent);
    printWindow.document.close();
  };

  return (
    <div id="report-content" style={{ padding: modeExportPDF ? 45 : 0 }}>
      {/* Header for PDF Export */}
      {/* {modeExportPDF && invoiceData && (
        <div style={{
          textAlign: "center",
          marginBottom: "30px",
          paddingBottom: "20px",
          borderBottom: "2px solid #333"
        }}>
          <h1 style={{
            color: "#2c3e50",
            fontSize: "28px",
            fontWeight: "bold",
            margin: "0 0 10px 0",
            fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
          }}>
            ໃບເກັບເງິນຂາຍ
          </h1>
          <p style={{
            color: "#666",
            fontSize: "16px",
            margin: "0",
            fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
          }}>
            ລະຫັດໃບເກັບເງິນ: {invoiceData.ivRef}
          </p>
          <p style={{
            color: "#666",
            fontSize: "14px",
            margin: "5px 0 0 0",
            fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
          }}>
            ປະເທດ: {invoiceData.cusCountry || "-"}
          </p>
          <p style={{
            color: "#666",
            fontSize: "14px",
            margin: "5px 0 0 0",
            fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
          }}>
            ວັນທີສ້າງລາຍງານ: {new Date().toLocaleDateString('en-GB')}
          </p>
        </div>
      )} */}

      {/* Search Section */}
      <div style={{
        background: "rgba(255, 255, 255, 0.95)",
        borderRadius: "15px",
        padding: "20px",
        marginBottom: "20px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        display: modeExportPDF ? "none" : "block" // Hide search when exporting PDF
      }}>
        <h3 style={{
          color: "#2c3e50",
          fontWeight: 600,
          marginBottom: "15px",
          textAlign: "center",
          fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
        }}>
          ຄົ້ນຫາໃບເກັບເງິນ
        </h3>
        
        {/* Show current invoice number if available */}
        {currentInvoiceNo && (
          <div style={{
            background: "linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)",
            color: "white",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "15px",
            textAlign: "center",
            fontWeight: 600,
            fontSize: "16px"
          }}>
            ໃບເກັບເງິນປັດຈຸບັນ: {currentInvoiceNo}
          </div>
        )}
        
        <form onSubmit={handleSearch} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <input
            type="text"
            value={searchInvoiceNo}
            onChange={(e) => setSearchInvoiceNo(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="ປ້ອນລະຫັດໃບເກັບເງິນ (ຕົວຢ່າງ: CI-H000001)"
            style={{
              flex: 1,
              border: "2px solid #e8e8e8",
              borderRadius: "8px",
              padding: "10px 12px",
              fontSize: "14px",
              transition: "all 0.3s ease",
              fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
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
          <button
            type="submit"
            disabled={isLoading}
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "10px 20px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.7 : 1,
              transition: "all 0.3s ease",
              fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
            }}
          >
            {isLoading ? (
              <div style={{
                width: "16px",
                height: "16px",
                border: "2px solid #f3f3f3",
                borderTop: "2px solid #fff",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto"
              }}></div>
            ) : (
              "ຄົ້ນຫາ"
            )}
          </button>
        </form>
        {error && (
          <div style={{
            color: "#e74c3c",
            fontSize: "14px",
            marginTop: "10px",
            textAlign: "center"
          }}>
            {error}
          </div>
        )}
      </div>

      {/* Invoice Display */}
      {invoiceData ? (
        <div style={{
          background: modeExportPDF ? "transparent" : "rgba(255, 255, 255, 0.95)",
          borderRadius: modeExportPDF ? "0" : "15px",
          padding: modeExportPDF ? "0" : "30px",
          boxShadow: modeExportPDF ? "none" : "0 4px 15px rgba(0, 0, 0, 0.1)",
        }}>
          {!modeExportPDF && (
            <h2
              style={{
                color: "black",
                fontWeight: 700,
                marginBottom: 20,
                textAlign: "center",
                fontSize: "24px",
                fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
              }}
            >
              SALES INVOICE
            </h2>
          )}
          
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 20,
              flexWrap: "wrap",
              gap: "20px"
            }}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: "16px", marginBottom: "5px" }}>
                TPlus Digital, LTD.
              </div>
              <div style={{ fontSize: 14, color: "#666" }}>
                DSP-TH doy, Souvannasing
              </div>
              <div style={{ fontSize: 14, color: "#666" }}>
                Kpudhit Village
              </div>
              <div style={{ fontSize: 14, color: "#666" }}>
                Attsephone District
              </div>
              <div style={{ fontSize: 14, color: "#666" }}>
                Savannakhet Province, Lao PDR
              </div>
            </div>
            <div style={{ textAlign: "right", fontSize: 14 }}>
              <div style={{ marginBottom: "5px" }}>
                ວັນທີໃບເກັບເງິນ: <b>{formatDate(invoiceData.ivDate)}</b>
              </div>
              <div style={{ marginBottom: "5px" }}>
                ລະຫັດໃບເກັບເງິນ: <b>{invoiceData.ivRef}</b>
              </div>
              <div style={{ marginBottom: "5px" }}>
                ລະຫັດອໍເດີ: <b>{invoiceData.orderRef}</b>
              </div>
              <div style={{ marginBottom: "5px" }}>
                ລະຫັດລູກຄ້າ: <b>{invoiceData.cusCode}</b>
              </div>
              <div style={{ marginBottom: "5px" }}>
                ຊື່ລູກຄ້າ: <b>{invoiceData.cusName}</b>
              </div>
              <div style={{ marginBottom: "5px" }}>
                ປະເທດ: <b>{invoiceData.cusCountry || "-"}</b>
              </div>
            </div>
          </div>

          {/* Customer Details */}
          <div style={{
            background: modeExportPDF ? "#f8f9fa" : "#f8f9fa",
            padding: "15px",
            borderRadius: modeExportPDF ? "0" : "8px",
            marginBottom: "20px",
            border: modeExportPDF ? "1px solid #333" : "none"
          }}>
            <div style={{ 
              fontWeight: 600, 
              marginBottom: "10px",
              fontSize: modeExportPDF ? "12px" : "14px"
            }}>ຂໍ້ມູນລູກຄ້າ:</div>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
              gap: "10px",
              fontSize: modeExportPDF ? "10px" : "14px"
            }}>
              <div>ຊື່: {invoiceData.cusName}</div>
              <div>ບ້ານ: {invoiceData.cusVillage}</div>
              <div>ເມືອງ: {invoiceData.cusDistrict}</div>
              <div>ແຂວງ: {invoiceData.cusProvince}</div>
              <div>ປະເທດ: {invoiceData.cusCountry || "-"}</div>
            </div>
          </div>

          {/* Items Table */}
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              margin: "20px 0",
              fontSize: modeExportPDF ? "10px" : "14px",
              fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
            }}
          >
            <thead>
              <tr style={{ 
                background: modeExportPDF ? "#f8f9fa" : "#f1f5f9", 
                color: "black",
                fontWeight: "bold"
              }}>
                <th style={{ 
                  border: "1px solid #333", 
                  padding: modeExportPDF ? "6px" : "8px", 
                  textAlign: "center",
                  fontSize: modeExportPDF ? "9px" : "14px"
                }}>
                  ລຳດັບ
                </th>
                <th style={{ 
                  border: "1px solid #333", 
                  padding: modeExportPDF ? "6px" : "8px",
                  fontSize: modeExportPDF ? "9px" : "14px"
                }}>
                  ລາຍການ
                </th>
                <th style={{ 
                  border: "1px solid #333", 
                  padding: modeExportPDF ? "6px" : "8px", 
                  textAlign: "center",
                  fontSize: modeExportPDF ? "9px" : "14px"
                }}>
                  ຈຳນວນ
                </th>
                <th style={{ 
                  border: "1px solid #333", 
                  padding: modeExportPDF ? "6px" : "8px", 
                  textAlign: "right",
                  fontSize: modeExportPDF ? "9px" : "14px"
                }}>
                  ລາຄາ (KIP)
                </th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.dataItem && invoiceData.dataItem.map((item, i) => (
                <tr key={i} style={{
                  background: i % 2 === 0 ? "#ffffff" : "#f8f9fa"
                }}>
                  <td
                    style={{
                      border: "1px solid #333",
                      padding: modeExportPDF ? "6px" : "8px",
                      textAlign: "center",
                      fontSize: modeExportPDF ? "9px" : "14px"
                    }}
                  >
                    {i + 1}
                  </td>
                  <td style={{ 
                    border: "1px solid #333", 
                    padding: modeExportPDF ? "6px" : "8px",
                    fontSize: modeExportPDF ? "9px" : "14px"
                  }}>
                    {item.descript}
                  </td>
                  <td
                    style={{
                      border: "1px solid #333",
                      padding: modeExportPDF ? "6px" : "8px",
                      textAlign: "center",
                      fontSize: modeExportPDF ? "9px" : "14px"
                    }}
                  >
                    {item.qty}
                  </td>
                  <td
                    style={{
                      border: "1px solid #333",
                      padding: modeExportPDF ? "6px" : "8px",
                      textAlign: "right",
                      fontSize: modeExportPDF ? "9px" : "14px"
                    }}
                  >
                    {parseFloat(item.amountKIP).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div style={{ 
            textAlign: "right", 
            fontSize: modeExportPDF ? "12px" : "15px", 
            marginTop: "20px",
            padding: "15px",
            background: modeExportPDF ? "#f8f9fa" : "transparent",
            border: modeExportPDF ? "1px solid #333" : "none",
            borderRadius: modeExportPDF ? "0" : "8px"
          }}>
            {(() => {
              const totals = calculateTotals(invoiceData.dataItem);
              return (
                <>
                  <div style={{ marginBottom: "5px" }}>
                    ລວມຍ່ອຍ: <b>{totals.subtotal.toLocaleString()} KIP</b>
                  </div>
                  <div style={{ marginBottom: "5px" }}>
                    ສ່ວນຫຼຸດມາດຕະຖານ: <b>{(parseFloat(invoiceData.totalStdDisc) || 0).toLocaleString()} KIP</b>
                  </div>
                  {/* <div style={{ marginBottom: "5px" }}>
                    ສ່ວນຫຼຸດ SM: <b>{(parseFloat(invoiceData.totalSMDisc) || 0).toLocaleString()} KIP</b>
                  </div> */}
                  <div style={{ marginBottom: "5px" }}>
                    ອາກອນການຄ້າ<span style={{ color: "#000", fontSize: "12px" }}>
                      ({((parseFloat(invoiceData.turnoverTax) || 0) / ((parseFloat(invoiceData.grandTotalAmt) || 0) + (parseFloat(invoiceData.turnoverTax) || 0)) * 100).toFixed(1)}%)
                    </span>: <b>{(parseFloat(invoiceData.turnoverTax) || 0).toLocaleString()} KIP</b>
                  </div>
                  <div style={{ marginBottom: "5px" }}>
                    ລວມທັງໝົດ: <b>{(parseFloat(invoiceData.grandTotalAmt) || totals.grandTotal).toLocaleString()} KIP</b>
                  </div>
                  <div style={{ marginBottom: "5px" }}>
                    ປະເພດການຊຳລະ: <b>{invoiceData.paidType}</b>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      ) : !isLoading && !error ? (
        <div style={{
          textAlign: "center",
          padding: "40px",
          color: "#666",
          fontSize: "16px"
        }}>
          ກະລຸນາຄົ້ນຫາໃບເກັບເງິນເພື່ອເບິ່ງຂໍ້ມູນ
        </div>
      ) : null}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
});

export default SingleReport; 