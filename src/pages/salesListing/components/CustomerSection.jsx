import React from "react";

const CustomerSection = ({
  formData,
  handleInputChange,
  handleCustomerCodeChange,
  isLoadingCustomer,
}) => {
  return (
    <>
      {/* Row 1: Account + Customer Name */}
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
              fontFamily:
                "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
            }}
          >
            Customer Code
          </label>
          <div style={{ position: "relative" }}>
            <input
              value={formData.account}
              onChange={(e) => handleCustomerCodeChange(e.target.value)}
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
                position: "relative",
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
              placeholder={
                isLoadingCustomer
                  ? "Searching..."
                  : "Enter customer code (auto-search after typing)"
              }
              disabled={isLoadingCustomer}
            />
            {isLoadingCustomer && (
              <div
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "20px",
                  height: "20px",
                  border: "2px solid #f3f3f3",
                  borderTop: "2px solid #667eea",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                }}
              ></div>
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
              lineHeight: "1.4",
              padding: "4px 0",
              fontFamily:
                "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
            }}
          >
            Customer Name
          </label>
          <input
            value={formData.customerName}
            onChange={(e) => handleInputChange("customerName", e.target.value)}
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
            placeholder="Enter customer name"
          />
        </div>
      </div>

      {/* Row 3: Customer-code + Vila + Povint + dity */}
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
              fontFamily:
                "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
            }}
          >
            Vila
          </label>
          <input
            value={formData.vila}
            onChange={(e) => handleInputChange("vila", e.target.value)}
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
            placeholder="Enter customer Vila"
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
              fontFamily:
                "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
            }}
          >
            Povint
          </label>
          <input
            value={formData.povint}
            onChange={(e) => handleInputChange("povint", e.target.value)}
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
            placeholder="Enter customer Povint"
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
              fontFamily:
                "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
            }}
          >
            dity
          </label>
          <input
            value={formData.dity}
            onChange={(e) => handleInputChange("dity", e.target.value)}
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
            placeholder="Enter customer Dity"
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
              fontFamily:
                "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
            }}
          >
            Country
          </label>
          <input
            value={formData.cusCountry}
            onChange={(e) => handleInputChange("cusCountry", e.target.value)}
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
            placeholder="Enter customer Country"
          />
        </div>
      </div>

      {/* Row 4: Delivery-date */}
      <div style={{ marginBottom: "24px", display: "flex", gap: "12px" }}>
        <div style={{ marginBottom: "24px" }}>
          <label
            style={{
              color: "#2c3e50",
              fontWeight: 600,
              fontSize: "14px",
              marginBottom: "8px",
              display: "block",
              lineHeight: "1.4",
              padding: "4px 0",
              fontFamily:
                "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
            }}
          >
            Delivery Date
            <button
              type="button"
              onClick={() => {
                const today = new Date();
                const year = today.getFullYear();
                const month = String(today.getMonth() + 1).padStart(2, "0");
                const day = String(today.getDate()).padStart(2, "0");
                const todayStr = `${year}-${month}-${day}`;
                console.log('Setting delivery date to today:', todayStr);
                handleInputChange("deliveryDate", todayStr);
              }}
              style={{
                marginLeft: "10px",
                background: "linear-gradient(135deg, #ff9500 0%, #ff6b35 100%)",
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
                e.target.style.boxShadow = "0 2px 8px rgba(255, 149, 0, 0.3)";
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
            value={formData.deliveryDate}
            onChange={(e) => {
              console.log('Delivery date changed to:', e.target.value);
              handleInputChange("deliveryDate", e.target.value);
            }}
            min="1900-01-01"
            max="2100-12-31"
            style={{
              marginLeft: 0,
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
          />
        </div>
      </div>

      {/* Row 4.5: Customer Reference + Delivery Reference */}
      <div style={{ marginBottom: "24px", display: "flex", gap: "20px" }}>
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
              fontFamily:
                "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
            }}
          >
            Customer Reference
          </label>
          <input
            value={formData.cusRef}
            onChange={(e) => handleInputChange("cusRef", e.target.value)}
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
            placeholder="Enter customer reference"
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
              fontFamily:
                "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
            }}
          >
            Delivery Reference
          </label>
          <input
            value={formData.delRef}
            onChange={(e) => handleInputChange("delRef", e.target.value)}
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
            placeholder="Enter delivery reference"
          />
        </div>
      </div>
    </>
  );
};

export default CustomerSection;
