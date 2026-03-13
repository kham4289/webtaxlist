import React, { useState, useEffect } from "react";
import { salesInvoiceService } from "../../../services/salesInvoiceService";
import AddUserDialog from "./AddUserDialog";
import OrderReferenceSection from "./OrderReferenceSection";
import CustomerSection from "./CustomerSection";
import InvoiceSection from "./InvoiceSection";
import ItemsSection from "./ItemsSection";

const InsertForm = ({ onSave, onSwitchToSingle }) => {
  const [cancelHover, setCancelHover] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [isLoadingCustomer, setIsLoadingCustomer] = useState(false);
  const [isGeneratingOrderRef, setIsGeneratingOrderRef] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [debouncedCustomerCode, setDebouncedCustomerCode] = useState("");
  
  // Form data states
  const [formData, setFormData] = useState({
    account: "",
    customerName: "",
    cusRef: "",
    delRef: "",
    vila: "",
    povint: "",
    dity: "",
    cusCountry: "",
    deliveryDate: "",
    invoiceRef: "",
    invoiceDate: "",
    transType: "",
    totalStdDisc: "0",
    totalSMDisc: "0",
    turnoverTax: "0",
    oderRef: "CI-H",
    items: [{
      itemCode: "",
      location: "",
      descript: "",
      serialNo: "",
      qty: "1",
      amountKIP: "",
      taxPercentage: ""
    }]
  });

  // Generate auto reference number from API
  const generateReferenceNumber = async (orderType = 'CI-H') => {
    setIsGeneratingOrderRef(true);
    try {
      const orderRef = await salesInvoiceService.generateOrderRef(orderType);
      setReferenceNumber(orderRef);
    } catch (error) {
      console.error('Error generating order reference:', error);
      alert('ບໍ່ສາມາດສ້າງລະຫັດອໍເດີໄດ້: ' + error.message);
      // Fallback to local generation
      const timestamp = Date.now();
      const randomNum = Math.floor(Math.random() * 1000);
      const refNum = `${orderType}${String(randomNum).padStart(7, "0")}`;
      setReferenceNumber(refNum);
    } finally {
      setIsGeneratingOrderRef(false);
    }
  };

  // Set current date
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Handle form input changes
  const handleInputChange = (field, value) => {
    console.log(`handleInputChange called: ${field} = ${value}`);
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle item changes
  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData(prev => ({ ...prev, items: newItems }));
  };

  // Add new item
  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, {
        itemCode: "",
        location: "",
        descript: "",
        serialNo: "",
        qty: "1",
        amountKIP: "",
        taxPercentage: ""
      }]
    }));
  };

  // Remove item
  const removeItem = (index) => {
    if (formData.items.length > 1) {
      const newItems = formData.items.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, items: newItems }));
    }
  };

  // Handle save with API integration
  const handleSave = async () => {
    const confirmed = window.confirm("ທ່ານຕ້ອງການບັນທຶກຂໍ້ມູນນີ້ຫຼືບໍ່?");
    if (confirmed) {
      setIsSaving(true);
      try {
        // Format data for API - include orderDate from state
        console.log('Before API call - formData:', formData);
        console.log('Before API call - formData.invoiceDate:', formData.invoiceDate);
        console.log('Before API call - orderDate:', orderDate);
        
        const formDataWithOrderDate = {
          ...formData,
          orderDate: orderDate // Add orderDate to formData for API
        };
        console.log('formDataWithOrderDate:', formDataWithOrderDate);
        const invoiceData = salesInvoiceService.formatInvoiceData(formDataWithOrderDate, referenceNumber);
        console.log('Sending invoice data to API:', invoiceData);
        
        // Create invoice via API
        const result = await salesInvoiceService.createTaxInvoice(invoiceData);
        console.log('Invoice created successfully:', result);
        
        // Extract invoice number from API response
        const invoiceNo = result?.detail?.invoiceNo || result?.invoiceNo || result?.ivRef || null;
        console.log('Extracted invoice number:', invoiceNo, 'from result:', result);
        
        // Collect all form data for local storage
        const completeData = {
          orderReference: referenceNumber,
          orderDate: orderDate,
          transactionDate: currentDate,
          invoiceNo: invoiceNo,
          ...formData,
          timestamp: new Date().toISOString(),
          apiResult: result
        };
        
        onSave(completeData);
        
        if (invoiceNo) {
          alert(`ບັນທຶກຂ້ອມູນສຳເລັດ!\nInvoice Number: ${invoiceNo}`);
          // Auto-switch to single report mode with the new invoice number and data
          setTimeout(() => {
            // This will trigger the parent component to switch to single mode
            // and pass the invoice number for auto-search
            console.log('Calling onSwitchToSingle with invoiceNo:', invoiceNo);
            onSwitchToSingle(invoiceNo, result); // Pass the complete result data
          }, 1000);
        } else {
          alert("ບັນທຶກຂ້ອມູນສຳເລັດ!");
        }
        
        // Generate new order reference for next entry
        await generateReferenceNumber(formData.oderRef);
        
      } catch (error) {
        console.error('Error saving invoice:', error);
        alert('ບໍ່ສາມາດບັນທຶກຂ້ອມູນໄດ້: ' + error.message);
      } finally {
        setIsSaving(false);
      }
    }
  };

  // Handle add user
  const handleAddUser = (userData) => {
    // Store user data in localStorage
    const existingUsers = JSON.parse(localStorage.getItem("userData") || "[]");
    existingUsers.push({
      ...userData,
      id: Date.now(),
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem("userData", JSON.stringify(existingUsers));

    alert("ເພີ່ມຂ້ອມູນຜູ້ໃຊ້ສຳເລັດ!");
  };

  // Function to get customer data from API
  const getCustomerData = async (customerCode, force = false, isRetry = false) => {
    console.log('getCustomerData called with:', { customerCode, force, isRetry });
    
    if (!customerCode) {
      console.log('Early return - empty customer code');
      return;
    }
    
    setIsLoadingCustomer(true);
    console.log('Fetching customer data for code:', customerCode);
    
    try {
      const data = await salesInvoiceService.getCustomerByCode(customerCode);
      console.log('API response:', data);
      
      if (data && data.length > 0) {
        const customer = salesInvoiceService.parseCustomerData(data);
        console.log('Parsed customer data:', customer);
        
        if (customer) {
          setFormData(prev => ({
            ...prev,
            account: customer.cusCode,
            customerName: customer.cusName,
            cusRef: "",
            delRef: "",
            vila: customer.cusVillage,
            povint: customer.cusProvince,
            dity: customer.cusDistrict,
            cusCountry: customer.cusCountry,
          }));
          
          console.log('Customer data loaded successfully:', customer);
        } else {
          // Clear customer fields if parsing failed
          setFormData(prev => ({
            ...prev,
            customerName: '',
            cusRef: '',
            delRef: '',
            vila: '',
            povint: '',
            dity: '',
            cusCountry: '',
          }));
          console.log('Failed to parse customer data');
          if (force) {
            alert('Cannot process customer data');
          }
        }
      } else {
        // Clear customer fields if no data found
        setFormData(prev => ({
          ...prev,
          customerName: '',
          cusRef: '',
          delRef: '',
          vila: '',
          povint: '',
          dity: '',
          cusCountry: '',
        }));
        console.log('No customer found for code:', customerCode);
        
        // If this is not a retry attempt and no data found, retry after 0.5 seconds
        if (!isRetry && !force) {
          console.log('No data found, scheduling retry in 500ms...');
          setTimeout(() => {
            console.log('Retrying customer data fetch for:', customerCode);
            getCustomerData(customerCode, false, true);
          }, 500);
        } else if (force) {
          alert('No customer data found for code: ' + customerCode);
        }
      }
    } catch (error) {
      console.error('Error fetching customer data:', error);
      // Clear customer fields on error
      setFormData(prev => ({
        ...prev,
        customerName: '',
        cusRef: '',
        delRef: '',
        vila: '',
        povint: '',
        dity: '',
        cusCountry: '',
      }));
      
      if (force) {
        alert('Cannot fetch customer data: ' + error.message);
      }
    } finally {
      setIsLoadingCustomer(false);
    }
  };

  // Handle customer code change with debounce
  const handleCustomerCodeChange = (value) => {
    handleInputChange('account', value);
    setDebouncedCustomerCode(value);
  };

  // Debounce effect for API calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (debouncedCustomerCode && debouncedCustomerCode.trim()) {
        console.log('Debounced API call for:', debouncedCustomerCode);
        getCustomerData(debouncedCustomerCode);
      } else if (!debouncedCustomerCode) {
        // Clear customer fields only if customer code is completely empty
        setFormData(prev => ({
          ...prev,
          cusRef: '',
          delRef: '',
          vila: '',
          povint: '',
          dity: '',
          cusCountry: '',
        }));
      }
    }, 1000); // 100ms delay for faster response

    return () => clearTimeout(timeoutId);
  }, [debouncedCustomerCode]);

  // Handle order reference type change
  const handleOrderRefChange = async (newOrderRef) => {
    console.log('Order reference type changed to:', newOrderRef);
    handleInputChange("oderRef", newOrderRef);
    
    // Generate new reference number with the selected type
    try {
      await generateReferenceNumber(newOrderRef);
    } catch (error) {
      console.error('Error generating new order reference:', error);
      // Fallback to local generation if API fails
      const timestamp = Date.now();
      const randomNum = Math.floor(Math.random() * 1000);
      const refNum = `${newOrderRef}${String(randomNum).padStart(7, "0")}`;
      setReferenceNumber(refNum);
    }
  };

  useEffect(() => {
    generateReferenceNumber(formData.oderRef);
    // ไม่ตั้งค่าวันที่เริ่มต้นเพื่อให้ผู้ใช้สามารถเลือกวันที่ย้อนหลังได้
    // setCurrentDate(getCurrentDate());
    // setOrderDate(getCurrentDate());
  }, []);

  return (
    <div
      style={{
        background: "linear-gradient(135deg,#ffff4d 0%, #806600 100%)",
        borderRadius: "20px",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
        padding: "40px",
        maxWidth: "1200px",
        margin: "0 auto",
        fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
          padding: "30px",
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "20px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)"
        }}
      >
        <div>
          <h2
            style={{
              color: "#2c3e50",
              fontWeight: 700,
              fontSize: "36px",
              margin: 0,
              lineHeight: "1.2",
              padding: "8px 0",
              textShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}
          >
            Sales Order Entry
          </h2>
          <p style={{
            color: "#666",
            fontSize: "16px",
            margin: "8px 0 0 0",
            fontWeight: 400
          }}>
            Create and manage sales orders with customer information
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          {/* <button
            onClick={() => setShowAddUserDialog(true)}
            style={{
              background: "linear-gradient(135deg, #ffd11a 0%, #ffff00 100%)",
              color: "#000",
              border: "none",
              borderRadius: "15px",
              padding: "15px 30px",
              fontSize: "16px",
              fontWeight: 600,
              lineHeight: "1.4",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              boxShadow: "0 6px 20px rgba(255, 209, 26, 0.4)",
              transition: "all 0.3s ease",
              transform: "translateY(0)",
              fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
              minWidth: "140px"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-3px)";
              e.target.style.boxShadow = "0 8px 25px rgba(255, 209, 26, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 6px 20px rgba(255, 209, 26, 0.4)";
            }}
          >
            <span style={{ fontSize: "20px", fontWeight: "bold" }}>+</span>
            Add Customer
          </button> */}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "40px" }}>
        {/* Order Reference Section */}
        <div style={{
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "20px",
          padding: "30px",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)"
        }}>
          <h3 style={{
            color: "#2c3e50",
            fontWeight: 600,
            fontSize: "20px",
            margin: "0 0 20px 0",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            <span style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              width: "4px",
              height: "24px",
              borderRadius: "2px"
            }}></span>
            Order Information
          </h3>
          <OrderReferenceSection
            referenceNumber={referenceNumber}
            setReferenceNumber={setReferenceNumber}
            orderDate={orderDate}
            setOrderDate={setOrderDate}
            formData={formData}
            handleInputChange={handleInputChange}
            handleOrderRefChange={handleOrderRefChange}
            isGeneratingOrderRef={isGeneratingOrderRef}
          />
        </div>

        {/* Customer Section */}
        <div style={{
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "20px",
          padding: "30px",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)"
        }}>
          <h3 style={{
            color: "#2c3e50",
            fontWeight: 600,
            fontSize: "20px",
            margin: "0 0 20px 0",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            <span style={{
              background: "linear-gradient(135deg, #ff9500 0%, #ff6b35 100%)",
              width: "4px",
              height: "24px",
              borderRadius: "2px"
            }}></span>
            Customer Information
          </h3>
          <CustomerSection
            formData={formData}
            handleInputChange={handleInputChange}
            handleCustomerCodeChange={handleCustomerCodeChange}
            isLoadingCustomer={isLoadingCustomer}
          />
        </div>

        {/* Invoice Section */}
        <div style={{
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "20px",
          padding: "30px",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)"
        }}>
          <h3 style={{
            color: "#2c3e50",
            fontWeight: 600,
            fontSize: "20px",
            margin: "0 0 20px 0",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            <span style={{
              background: "linear-gradient(135deg, #007bff 0%, #0056b3 100%)",
              width: "4px",
              height: "24px",
              borderRadius: "2px"
            }}></span>
            Invoice Details
          </h3>
          <InvoiceSection
            formData={formData}
            handleInputChange={handleInputChange}
            orderRef={formData.oderRef}
            referenceNumber={referenceNumber}
          />
        </div>

        {/* Items Section */}
        <div style={{
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "20px",
          padding: "30px",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)"
        }}>
          <h3 style={{
            color: "#2c3e50",
            fontWeight: 600,
            fontSize: "20px",
            margin: "0 0 20px 0",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            <span style={{
              background: "linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)",
              width: "4px",
              height: "24px",
              borderRadius: "2px"
            }}></span>
            Items & Products
          </h3>
          <ItemsSection
            formData={formData}
            handleItemChange={handleItemChange}
            addItem={addItem}
            removeItem={removeItem}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "40px",
          paddingTop: "30px",
          borderTop: "2px solid rgba(255, 255, 255, 0.2)",
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "20px",
          padding: "30px",
          margin: "40px 0 0 0",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)"
        }}
      >
        <button
          style={{
            background: cancelHover ? "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)" : "linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%)",
            color: "white",
            fontWeight: 600,
            border: "none",
            borderRadius: "15px",
            padding: "15px 30px",
            height: "50px",
            fontSize: "16px",
            lineHeight: "1.4",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
            fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
            minWidth: "120px"
          }}
          onMouseEnter={(e) => {
            setCancelHover(true);
            e.target.style.transform = "translateY(-3px)";
            e.target.style.boxShadow = "0 8px 25px rgba(0,0,0,0.25)";
          }}
          onMouseLeave={(e) => {
            setCancelHover(false);
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)";
          }}
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={isSaving}
          style={{
            background: isSaving ? "linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%)" : "linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)",
            color: "white",
            fontWeight: 600,
            border: "none",
            borderRadius: "15px",
            padding: "15px 30px",
            height: "50px",
            fontSize: "16px",
            lineHeight: "1.4",
            cursor: isSaving ? "not-allowed" : "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 6px 20px rgba(39, 174, 96, 0.3)",
            position: "relative",
            fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
            minWidth: "120px"
          }}
          onMouseEnter={(e) => {
            if (!isSaving) {
              e.target.style.transform = "translateY(-3px)";
              e.target.style.boxShadow = "0 8px 25px rgba(39, 174, 96, 0.4)";
            }
          }}
          onMouseLeave={(e) => {
            if (!isSaving) {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 6px 20px rgba(39, 174, 96, 0.3)";
            }
          }}
        >
          {isSaving ? (
            <>
              <div style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "20px",
                height: "20px",
                border: "2px solid #f3f3f3",
                borderTop: "2px solid #fff",
                borderRadius: "50%",
                animation: "spin 1s linear infinite"
              }}></div>
              <span style={{ opacity: 0 }}>Saving...</span>
            </>
          ) : (
            "Save"
          )}
        </button>
      </div>

      {/* Add User Dialog */}
      <AddUserDialog
        isOpen={showAddUserDialog}
        onClose={() => setShowAddUserDialog(false)}
        onSave={handleAddUser}
      />
      
      <style>{`
        @keyframes spin {
          0% { transform: translateY(-50%) rotate(0deg); }
          100% { transform: translateY(-50%) rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default InsertForm; 