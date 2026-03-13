import React, { useState } from "react";

const OrderReferenceSection = ({
  referenceNumber,
  setReferenceNumber,
  orderDate,
  setOrderDate,
  formData,
  handleInputChange,
  handleOrderRefChange,
  isGeneratingOrderRef
}) => {
  const [showOderRefDropdown, setShowOderRefDropdown] = useState(false);

  return (
    <>
      {/* Row 1: Oder-Ref + Oder-date */}
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
            Order Reference
          </label>
          <div style={{ position: "relative" }}>
            <input
              value={referenceNumber}
              onChange={(e) => setReferenceNumber(e.target.value)}
              style={{
                width: "100%",
                border: "2px solid #e8e8e8",
                borderRadius: "10px",
                padding: "12px 16px",
                height: "45px",
                fontSize: "14px",
                lineHeight: "1.4",
                transition: "all 0.3s ease",
                backgroundColor: "#fafafa",
                paddingRight: isGeneratingOrderRef ? "50px" : "16px",
                fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
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
              disabled={isGeneratingOrderRef}
            />
            {isGeneratingOrderRef && (
              <div style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "20px",
                height: "20px",
                border: "2px solid #f3f3f3",
                borderTop: "2px solid #667eea",
                borderRadius: "50%",
                animation: "spin 1s linear infinite"
              }}></div>
            )}
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <label
            style={{
              color: "#2c3e50",
              fontWeight: 600,
              fontSize: "14px",
              marginBottom: "8px",
              display: "block",
              padding: "4px 0",
              fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
            }}
          >
            Order Date
            <button
              type="button"
              onClick={() => {
                const today = new Date();
                const year = today.getFullYear();
                const month = String(today.getMonth() + 1).padStart(2, "0");
                const day = String(today.getDate()).padStart(2, "0");
                const todayStr = `${year}-${month}-${day}`;
                console.log('Setting order date to today:', todayStr);
                setOrderDate(todayStr);
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
            value={orderDate}
            onChange={(e) => {
              console.log('Order date changed to:', e.target.value);
              setOrderDate(e.target.value);
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

      {/* Row 2: Oder-Ref Type */}
      <div style={{ marginBottom: "30px", display: "flex", gap: "25px" }}>
        <div style={{ flex: 1, position: "relative" }}>
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
            Order Type
          </label>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <button
              type="button"
              onClick={() => setShowOderRefDropdown(!showOderRefDropdown)}
              style={{
                position: "absolute",
                background:
                  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "none",
                cursor: "pointer",
                fontSize: "12px",
                left: "2px",
                color: "#fff",
                borderRadius: "8px 0px 0px 8px",
                zIndex: 1,
                width: "60px",
                height: "41px",
                top: "2px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 600,
              }}
            >
              <span>
                ▼ {formData.oderRef === 'CI-H' ? formData.oderRef : 'CI-G'}
              </span>
            </button>
            <input
              type="text"
              value={referenceNumber}
              onChange={(e) => handleInputChange("oderRef", e.target.value)}
              style={{
                width: "100%",
                border: "2px solid #e8e8e8",
                borderRadius: "10px",
                padding: "12px 16px 12px 70px",
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
          {showOderRefDropdown && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                backgroundColor: "white",
                border: "2px solid #e8e8e8",
                borderRadius: "10px",
                zIndex: 100,
                boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                marginTop: "5px",
              }}
            >
              <div
                style={{
                  padding: "12px 16px",
                  cursor: "pointer",
                  borderBottom: "1px solid #f0f0f0",
                  transition: "background-color 0.2s ease",
                  borderRadius: "8px 8px 0 0",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#f8f9ff")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
                onClick={() => {
                  handleOrderRefChange("CI-H");
                  setShowOderRefDropdown(false);
                }}
              >
                <div style={{ fontWeight: 600 }}>CI-H</div>
              </div>
              <div
                style={{
                  padding: "12px 16px",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease",
                  borderRadius: "0 0 8px 8px",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#f8f9ff")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
                onClick={() => {
                  handleOrderRefChange("CI-M");
                  setShowOderRefDropdown(false);
                }}
              >
                <div style={{ fontWeight: 600 }}>CI-G</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderReferenceSection; 