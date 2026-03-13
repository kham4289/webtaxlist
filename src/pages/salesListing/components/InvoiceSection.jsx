import React from "react";

const InvoiceSection = ({
  formData,
  handleInputChange,
  orderRef,
  referenceNumber
}) => {
  // Calculate total turnover tax from all items
  const calculateTotalTurnoverTax = () => {
    if (!formData.items || formData.items.length === 0) {
      return 0;
    }
    
    return formData.items.reduce((total, item) => {
      const qty = parseFloat(item.qty) || 0;
      const calculatedAmount = qty * 1000000; // 1 unit = 1,000,000 KIP
      const taxPercentage = parseFloat(item.taxPercentage) || 0;
      
      const subtotal = calculatedAmount;
      const taxAmount = subtotal * (taxPercentage / 100);
      
      return total + taxAmount;
    }, 0);
  };
  // Generate Invoice Reference from Order Type + Reference Number
  const generateInvoiceRef = () => {
    if (orderRef && referenceNumber) {
      // If the reference number already starts with CI-G or CI-H, use it as is
      if (referenceNumber.startsWith('CI-G') || referenceNumber.startsWith('CI-H')) {
        return referenceNumber;
      }
      
      // Remove orderRef from referenceNumber if it's already included
      let cleanReferenceNumber = referenceNumber;
      if (referenceNumber.startsWith(orderRef)) {
        cleanReferenceNumber = referenceNumber.substring(orderRef.length);
      }
      return `${orderRef}${cleanReferenceNumber}`;
    }
    return formData.invoiceRef || "";
  };

  return (
    <>
      {/* Row 1: Invoice Reference + Invoice Date */}
      <div style={{ marginBottom: "30px", display: "flex", gap: "25px" }}>
        <div style={{ flex: 1 }}>
          <label
            style={{
              color: "#2c3e50",
              fontWeight: 600,
              fontSize: "14px",
              marginBottom: "8px",
              display: "block",
              lineHeight: "1.4",
              padding: "4px 0",
              fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
            }}
          >
            Invoice Reference
          </label>
          <input
            value={generateInvoiceRef()}
            readOnly
            disabled
            style={{
              width: "100%",
              border: "2px solid #e8e8e8",
              borderRadius: "10px",
              padding: "12px 16px",
              height: "45px",
              fontSize: "14px",
              backgroundColor: "#f5f5f5",
              color: "#333",
              fontWeight: "600",
              cursor: "not-allowed",
            }}
            placeholder="Auto-generated from Order Type + Reference Number"
          />
        </div>
        <div style={{ flex: 1 }}>
          <label
            style={{
              color: "#2c3e50",
              fontWeight: 600,
              fontSize: "14px",
              marginBottom: "8px",
              display: "block",
              lineHeight: "1.4",
              padding: "4px 0",
              fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
            }}
          >
            Invoice Date
            <button
              type="button"
              onClick={() => {
                const today = new Date();
                const year = today.getFullYear();
                const month = String(today.getMonth() + 1).padStart(2, "0");
                const day = String(today.getDate()).padStart(2, "0");
                const todayStr = `${year}-${month}-${day}`;
                console.log('Setting invoice date to today:', todayStr);
                handleInputChange("invoiceDate", todayStr);
              }}
              style={{
                marginLeft: "10px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                borderRadius: "6px",
                padding: "4px 8px",
                fontSize: "12px",
                cursor: "pointer",
                fontWeight: "500",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-1px)";
                e.target.style.boxShadow = "0 2px 8px rgba(102, 126, 234, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              Today
            </button>
          </label>
                      <input
            type="date"
            value={formData.invoiceDate}
            onChange={(e) => {
              console.log('Invoice date changed to:', e.target.value);
              handleInputChange("invoiceDate", e.target.value);
            }}
            min="1900-01-01"
            max="2100-12-31"
            style={{
              width: "100%",
              border: "2px solid #e8e8e8",
              borderRadius: "10px",
              padding: "12px 16px",
              height: "45px",
              fontSize: "14px",
              transition: "all 0.3s ease",
              backgroundColor: "#fafafa",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#667eea";
              e.target.style.backgroundColor = "#fff";
              e.target.style.boxShadow =
                "0 0 0 3px rgba(102, 126, 234, 0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#e8e8e8";
              e.target.style.backgroundColor = "#fafafa";
              e.target.style.boxShadow = "none";
            }}
          />
        </div>
      </div>

      {/* Row 2: Paid Type */}
      <div style={{ marginBottom: "30px", display: "flex", gap: "25px" }}>
        <div style={{ flex: 1 }}>
          <label
            style={{
              color: "#2c3e50",
              fontWeight: 600,
              fontSize: "14px",
              marginBottom: "8px",
              display: "block",
              lineHeight: "1.4",
              padding: "4px 0",
              fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
            }}
          >
            Paid Type
          </label>
          <select
            value={formData.transType}
            onChange={(e) => handleInputChange("transType", e.target.value)}
            style={{
              width: "100%",
              border: "2px solid #e8e8e8",
              borderRadius: "10px",
              paddingLeft:"10px",
              height: "45px",
              fontSize: "14px",
              backgroundColor: "#fafafa",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#667eea";
              e.target.style.backgroundColor = "#fff";
              e.target.style.boxShadow =
                "0 0 0 3px rgba(102, 126, 234, 0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#e8e8e8";
              e.target.style.backgroundColor = "#fafafa";
              e.target.style.boxShadow = "none";
            }}
          >
            <option value="">Select Type</option>
            <option value="Cash">Cash</option>
            <option value="Transfer">Transfer</option>
          </select>
        </div>
      </div>

      {/* Row 3: Total Standard Discount + Total SM Discount */}
      <div style={{ marginBottom: "30px", display: "flex", gap: "25px" }}>
        <div style={{ flex: 1 }}>
          <label
            style={{
              color: "#2c3e50",
              fontWeight: 600,
              fontSize: "14px",
              marginBottom: "8px",
              display: "block",
              lineHeight: "1.4",
              padding: "4px 0",
              fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
            }}
          >
            Total Standard Discount
          </label>
          <input
            type="number"
            value={formData.totalStdDisc || "0"}
            onChange={(e) => handleInputChange("totalStdDisc", e.target.value)}
            style={{
              width: "100%",
              border: "2px solid #e8e8e8",
              borderRadius: "10px",
              padding: "12px 16px",
              height: "45px",
              fontSize: "14px",
              transition: "all 0.3s ease",
              backgroundColor: "#fafafa",
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
            placeholder="0"
          />
        </div>
        <div style={{ flex: 1 }}>
          <label
            style={{
              color: "#2c3e50",
              fontWeight: 600,
              fontSize: "14px",
              marginBottom: "8px",
              display: "block",
              lineHeight: "1.4",
              padding: "4px 0",
              fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
            }}
          >
            Total S&M Discount
          </label>
          <input
            type="number"
            value={formData.totalSMDisc || "0"}
            onChange={(e) => handleInputChange("totalSMDisc", e.target.value)}
            style={{
              width: "100%",
              border: "2px solid #e8e8e8",
              borderRadius: "10px",
              padding: "12px 16px",
              height: "45px",
              fontSize: "14px",
              transition: "all 0.3s ease",
              backgroundColor: "#fafafa",
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
            placeholder="0"
          />
        </div>
      </div>

      {/* Row 4: Turnover Tax */}
      <div style={{ marginBottom: "30px" }}>
        <label
          style={{
            color: "#2c3e50",
            fontWeight: 600,
            fontSize: "14px",
            marginBottom: "8px",
            display: "block",
            lineHeight: "1.4",
            padding: "4px 0",
            fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
          }}
        >
          Turnover Tax (Auto-calculated from Items)
        </label>
        <input
          type="text"
          value={calculateTotalTurnoverTax().toLocaleString() + " KIP"}
          readOnly
          disabled
          style={{
            width: "49%",
            border: "2px solid #e8e8e8",
            borderRadius: "10px",
            padding: "12px 16px",
            height: "45px",
            fontSize: "14px",
            backgroundColor: "#f5f5f5",
            color: "#333",
            fontWeight: "600",
            cursor: "not-allowed",
          }}
          placeholder="Auto-calculated from items"
        />
      </div>

      {/* Row 5: Grand Total (Read-only) */}
      <div style={{ marginBottom: "30px" }}>
        <label
          style={{
            color: "#2c3e50",
            fontWeight: 600,
            fontSize: "14px",
            marginBottom: "8px",
            display: "block",
            lineHeight: "1.4",
            padding: "4px 0",
            fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
          }}
        >
          Grand Total (Calculated from Items)
        </label>
        <input
          type="text"
          value={(() => {
            if (!formData.items || formData.items.length === 0) {
              return "0 KIP";
            }
            
            const grandTotal = formData.items.reduce((sum, item) => {
              const qty = parseFloat(item.qty) || 0;
              const calculatedAmount = qty * 1000000; // 1 unit = 1,000,000 KIP
              const taxPercentage = parseFloat(item.taxPercentage) || 0;
              
              const subtotal = calculatedAmount;
              const taxAmount = subtotal * (taxPercentage / 100);
              const itemTotal = subtotal - taxAmount;
              
              return sum + itemTotal;
            }, 0);
            
            return grandTotal.toLocaleString() + " KIP";
          })()}
          readOnly
          disabled
          style={{
            width: "49%",
            border: "2px solid #e8e8e8",
            borderRadius: "10px",
            padding: "12px 16px",
            height: "45px",
            fontSize: "14px",
            backgroundColor: "#f5f5f5",
            color: "#333",
            fontWeight: "600",
            cursor: "not-allowed",
          }}
        />
      </div>
    </>
  );
};

export default InvoiceSection; 