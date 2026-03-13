import React from "react";

const ItemsSection = ({
  formData,
  handleItemChange,
  addItem,
  removeItem
}) => {
  return (
    <div style={{ marginBottom: "30px" }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px"
      }}>
        <label
          style={{
            color: "#2c3e50",
            fontWeight: 600,
            fontSize: "18px",
            display: "block",
            padding: "4px 0",
            fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
          }}
        >
          Items & Products
        </label>
        <button
          type="button"
          onClick={addItem}
          style={{
            background: "linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            padding: "12px 20px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.3s ease",
            fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 4px 15px rgba(39, 174, 96, 0.3)"
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 6px 20px rgba(39, 174, 96, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 15px rgba(39, 174, 96, 0.3)";
          }}
        >
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>+</span>
          Add Item
        </button>
      </div>

      {formData.items.map((item, index) => (
        <div key={index} style={{
          border: "2px solid #e8e8e8",
          borderRadius: "15px",
          padding: "25px",
          marginBottom: "20px",
          background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
          position: "relative",
          boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
          transition: "all 0.3s ease"
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px"
          }}>
            <h4 style={{
              color: "#2c3e50",
              fontWeight: 600,
              fontSize: "16px",
              margin: 0,
              fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}>
              <span style={{
                background: "linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)",
                color: "white",
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: "bold"
              }}>
                {index + 1}
              </span>
              Item #{index + 1}
            </h4>
            {formData.items.length > 1 && (
              <button
                type="button"
                onClick={() => removeItem(index)}
                style={{
                  background: "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "10px",
                  padding: "8px 16px",
                  fontSize: "12px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontWeight: 600,
                  boxShadow: "0 4px 12px rgba(231, 76, 60, 0.3)"
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-1px)";
                  e.target.style.boxShadow = "0 6px 16px rgba(231, 76, 60, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 12px rgba(231, 76, 60, 0.3)";
                }}
              >
                Remove
              </button>
            )}
          </div>

          {/* Item fields in a grid layout */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr", gap: "20px" }}>
            <div>
              <label style={{
                color: "#2c3e50",
                fontWeight: 600,
                fontSize: "14px",
                marginBottom: "8px",
                display: "block",
                fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
              }}>
                Item Code
              </label>
              <input
                type="text"
                value={item.itemCode}
                onChange={(e) => handleItemChange(index, "itemCode", e.target.value)}
                style={{
                  width: "100%",
                  border: "2px solid #e8e8e8",
                  borderRadius: "10px",
                  padding: "12px 16px",
                  fontSize: "14px",
                  transition: "all 0.3s ease",
                  backgroundColor: "#fff",
                  fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
                  height: "45px"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#27ae60";
                  e.target.style.boxShadow = "0 0 0 3px rgba(39, 174, 96, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e8e8e8";
                  e.target.style.boxShadow = "none";
                }}
                placeholder="Item Code"
              />
            </div>

            <div>
              <label style={{
                color: "#2c3e50",
                fontWeight: 600,
                fontSize: "14px",
                marginBottom: "8px",
                display: "block",
                fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
              }}>
                Location
              </label>
              <input
                type="text"
                value={item.location}
                onChange={(e) => handleItemChange(index, "location", e.target.value)}
                style={{
                  width: "100%",
                  border: "2px solid #e8e8e8",
                  borderRadius: "10px",
                  padding: "12px 16px",
                  fontSize: "14px",
                  transition: "all 0.3s ease",
                  backgroundColor: "#fff",
                  fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
                  height: "45px"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#27ae60";
                  e.target.style.boxShadow = "0 0 0 3px rgba(39, 174, 96, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e8e8e8";
                  e.target.style.boxShadow = "none";
                }}
                placeholder="Location"
              />
            </div>

            <div>
              <label style={{
                color: "#2c3e50",
                fontWeight: 600,
                fontSize: "14px",
                marginBottom: "8px",
                display: "block",
                fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
              }}>
                Description
              </label>
              <input
                type="text"
                value={item.descript}
                onChange={(e) => handleItemChange(index, "descript", e.target.value)}
                style={{
                  width: "100%",
                  border: "2px solid #e8e8e8",
                  borderRadius: "10px",
                  padding: "12px 16px",
                  fontSize: "14px",
                  transition: "all 0.3s ease",
                  backgroundColor: "#fff",
                  fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
                  height: "45px"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#27ae60";
                  e.target.style.boxShadow = "0 0 0 3px rgba(39, 174, 96, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e8e8e8";
                  e.target.style.boxShadow = "none";
                }}
                placeholder="Description"
              />
            </div>

            <div>
              <label style={{
                color: "#2c3e50",
                fontWeight: 600,
                fontSize: "14px",
                marginBottom: "8px",
                display: "block",
                fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
              }}>
                Serial No
              </label>
              <input
                type="text"
                value={item.serialNo}
                onChange={(e) => handleItemChange(index, "serialNo", e.target.value)}
                style={{
                  width: "100%",
                  border: "2px solid #e8e8e8",
                  borderRadius: "10px",
                  padding: "12px 16px",
                  fontSize: "14px",
                  transition: "all 0.3s ease",
                  backgroundColor: "#fff",
                  fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
                  height: "45px"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#27ae60";
                  e.target.style.boxShadow = "0 0 0 3px rgba(39, 174, 96, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e8e8e8";
                  e.target.style.boxShadow = "none";
                }}
                placeholder="Serial No"
              />
            </div>

            <div>
              <label style={{
                color: "#2c3e50",
                fontWeight: 600,
                fontSize: "14px",
                marginBottom: "8px",
                display: "block",
                fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
              }}>
                Quantity
              </label>
              <input
                type="number"
                value={item.qty}
                onChange={(e) => handleItemChange(index, "qty", e.target.value)}
                style={{
                  width: "100%",
                  border: "2px solid #e8e8e8",
                  borderRadius: "10px",
                  padding: "12px 16px",
                  fontSize: "14px",
                  transition: "all 0.3s ease",
                  backgroundColor: "#fff",
                  fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
                  height: "45px"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#27ae60";
                  e.target.style.boxShadow = "0 0 0 3px rgba(39, 174, 96, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e8e8e8";
                  e.target.style.boxShadow = "none";
                }}
                placeholder="Quantity"
                min="1"
              />
            </div>
            <div>
              <label style={{
                color: "#2c3e50",
                fontWeight: 600,
                fontSize: "14px",
                marginBottom: "8px",
                display: "block",
                fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
              }}>
                Amount (KIP)

              </label>
              <input
                type="text"
                value={(() => {
                  const qty = parseFloat(item.qty) || 0;
                  const calculatedAmount = qty * 1000000; // 1 unit = 1,000,000 KIP
                  return calculatedAmount.toLocaleString() + " KIP";
                })()}
                readOnly
                disabled
                style={{
                  width: "100%",
                  border: "2px solid #e8e8e8",
                  borderRadius: "10px",
                  padding: "12px 16px",
                  fontSize: "14px",
                  backgroundColor: "#f5f5f5",
                  color: "#333",
                  fontWeight: "600",
                  cursor: "not-allowed",
                  fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
                  height: "45px"
                }}
                placeholder="Auto-calculated from Quantity"
              />
            </div>

            <div>
              <label style={{
                color: "#2c3e50",
                fontWeight: 600,
                fontSize: "14px",
                marginBottom: "8px",
                display: "block",
                fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
              }}>
                Tax Percentage (%)
              </label>
              <input
                type="number"
                value={item.taxPercentage || ""}
                onChange={(e) => handleItemChange(index, "taxPercentage", e.target.value)}
                style={{
                  width: "100%",
                  border: "2px solid #e8e8e8",
                  borderRadius: "10px",
                  padding: "12px 16px",
                  fontSize: "14px",
                  transition: "all 0.3s ease",
                  backgroundColor: "#fff",
                  fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
                  height: "45px"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#27ae60";
                  e.target.style.boxShadow = "0 0 0 3px rgba(39, 174, 96, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e8e8e8";
                  e.target.style.boxShadow = "none";
                }}
                placeholder="Tax % (e.g., 10 for 10%)"
                min="0"
                max="100"
                step="0.01"
              />
            </div>
            <div style={{ display: "flex", alignItems: "end" }}>
              <div style={{
                padding: "8px 12px",
                backgroundColor: "#f8f9fa",
                border: "2px solid #e8e8e8",
                borderRadius: "8px",
                fontSize: "12px",
                color: "#6c757d",
                fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
              }}>
                {(() => {
                  const qty = parseFloat(item.qty) || 0;
                  const calculatedAmount = qty * 1000000; // 1 unit = 1,000,000 KIP
                  const taxPercentage = parseFloat(item.taxPercentage) || 0;
                  const subtotal = calculatedAmount;
                  const taxAmount = subtotal * (taxPercentage / 100);
                  const total = subtotal - taxAmount;
                  return (
                    <div>
                      <div style={{ fontWeight: "bold", color: "#2c3e50" }}>
                        Total: {total.toLocaleString()} KIP
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemsSection; 