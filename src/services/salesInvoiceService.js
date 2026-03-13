// Sales Invoice API Service
const API_BASE_URL = 'http://172.28.17.102:4545';

export const salesInvoiceService = {
  // Generate order reference number based on type
  async generateOrderRef(orderType = 'CI-H') {
    console.log('Generating order reference for type:', orderType);
    
    let endpoint;
    if (orderType === 'CI-M') {
      endpoint = `${API_BASE_URL}/taxInvoice/ganerateInvioceNo?invType=CI-G`;
    } else {
      // Default for CI-H
      endpoint = `${API_BASE_URL}/taxInvoice/runOrderNo`;
    }
    
    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Order reference response:', data);

      if (data.resultCode === 200 && data.detail?.invoiceNo) {
        return data.detail.invoiceNo;
      } else {
        throw new Error(data.resultDesc || 'Failed to generate order reference');
      }
    } catch (error) {
      console.error('Error generating order reference:', error);
      throw new Error('ບໍ່ສາມາດສ້າງລະຫັດອໍເດີໄດ້: ' + error.message);
    }
  },

  // Get customer data by customer code
  async getCustomerByCode(customerCode) {
    console.log('Getting customer data for code:', customerCode);
    try {
      const response = await fetch(`${API_BASE_URL}/taxInvoice/quryCustomer?cusCode=${customerCode}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Customer data response:', data);

      if (data.resultCode === 200) {
        // Check if detail exists and has data
        if (data.detail && Array.isArray(data.detail) && data.detail.length > 0) {
          return data.detail;
        } else if (data.detail && typeof data.detail === 'object' && Object.keys(data.detail).length > 0) {
          // If detail is an object, wrap it in an array
          return [data.detail];
        } else {
          // No customer data found
          throw new Error('ບໍ່ພົບຂໍ້ມູນລູກຄ້າສຳລັບລະຫັດນີ້');
        }
      } else {
        throw new Error(data.resultDesc || 'Customer not found');
      }
    } catch (error) {
      console.error('Error getting customer data:', error);
      // Don't throw the error, just return null to indicate no customer found
      return null;
    }
  },

  // Create tax invoice
  async createTaxInvoice(invoiceData) {
    console.log('Creating tax invoice with data:', invoiceData);
    console.log('Request body:', JSON.stringify(invoiceData, null, 2));
    try {
      const response = await fetch(`${API_BASE_URL}/taxInvoice/createTaxInvoice`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(invoiceData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Create invoice API response:', data);

      if (data.resultCode === 200) {
        console.log('Invoice created successfully, returning:', data.detail);
        return data.detail;
      } else {
        throw new Error(data.resultDesc || 'Failed to create invoice');
      }
    } catch (error) {
      console.error('Error creating tax invoice:', error);
      throw new Error('ບໍ່ສາມາດສ້າງໃບເກັບເງິນໄດ້: ' + error.message);
    }
  },

  // Get invoice details for printing
  async getInvoiceDetails(invoiceNo) {
    console.log('Getting invoice details for:', invoiceNo);
    try {
      const response = await fetch(`${API_BASE_URL}/taxInvoice/printBillInvoice?invNo=${invoiceNo}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Invoice details API response:', data);

      if (data.resultCode === 200) {
        console.log('Returning invoice details:', data.detail);
        return data.detail;
      } else {
        throw new Error(data.resultDesc || 'Invoice not found');
      }
    } catch (error) {
      console.error('Error getting invoice details:', error);
      throw new Error('ບໍ່ສາມາດດຶງຂໍ້ມູນໃບເກັບເງິນໄດ້: ' + error.message);
    }
  },

  // Get invoice summary report
  async getInvoiceSummary(fromDate, toDate, paidType = 'CASHH') {
    console.log('Getting invoice summary from:', fromDate, 'to:', toDate, 'type:', paidType);
    try {
      const requestBody = {
        formDate: fromDate,
        toDate: toDate,
        paidType: paidType
      };

      const response = await fetch(`${API_BASE_URL}/taxInvoice/rptInvoiceSummary`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Invoice summary response:', data);

      if (data.resultCode === 200) {
        return data.detail || [];
      } else {
        throw new Error(data.resultDesc || 'Failed to get invoice summary');
      }
    } catch (error) {
      console.error('Error getting invoice summary:', error);
      throw new Error('ບໍ່ສາມາດດຶງລາຍງານໄດ້: ' + error.message);
    }
  },
  // Test API connection
  async testConnection() {
    console.log('Testing API connection...');
    try {
      const response = await fetch(`${API_BASE_URL}/taxInvoice/quryCustomer?cusCode=1111`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      });
      return response.ok;
    } catch (error) {
      console.error('API connection test failed:', error);
      return false;
    }
  },

  // Parse customer data
  parseCustomerData(customerData) {
    console.log('Parsing customer data:', customerData);
    
    if (!customerData || customerData.length === 0) {
      console.log('No customer data found');
      return null;
    }

    const customer = customerData[0]; // Assuming API returns an array
    console.log('First customer in array:', customer);
    
    const parsedCustomer = {
      cusCode: customer.cusCode || customer.code || '',
      cusName: customer.cusName || customer.name || '',
      cusVillage: customer.cusAddress1 || customer.cusVillage || customer.village || '',
      cusDistrict: customer.cusAddress2 || customer.cusDistrict || customer.district || '',
      cusProvince: customer.cusAddress3 || customer.cusProvince || customer.province || '',
      cusCountry: customer.cusCountry || customer.country || '',
    };
    
    console.log('Parsed customer:', parsedCustomer);
    return parsedCustomer;
  },

    // Format invoice data for API
  formatInvoiceData(formData, orderRef) {
    console.log('formatInvoiceData called with formData:', formData);
    console.log('formData.invoiceDate:', formData.invoiceDate);
    console.log('formData.orderDate:', formData.orderDate);
    console.log('formData.deliveryDate:', formData.deliveryDate);
    
    // Use selected dates from form or current date as fallback
    const formatDateForAPI = (dateString) => {
      console.log('formatDateForAPI called with dateString:', dateString);
      if (dateString && dateString.trim() !== '') {
        const date = new Date(dateString);
        const formatted = date.toISOString().slice(0, 19).replace('T', ' ');
        console.log('Formatted date:', formatted);
        return formatted;
      }
      // Fallback to current date if no date provided
      const now = new Date();
      const fallback = now.toISOString().slice(0, 19).replace('T', ' ');
      console.log('Using fallback date:', fallback);
      return fallback;
    };
    
    // Calculate totals with tax percentage
    let grandTotal = 0;
    let totalTurnoverTax = 0;
    
    if (formData.items && formData.items.length > 0) {
      formData.items.forEach(item => {
        const qty = parseFloat(item.qty) || 0;
        const calculatedAmount = qty * 1000000; // 1 unit = 1,000,000 KIP
        const taxPercentage = parseFloat(item.taxPercentage) || 0;
        
        const subtotal = calculatedAmount;
        const taxAmount = subtotal * (taxPercentage / 100);
        const itemTotal = subtotal - taxAmount; // Amount after tax deduction
        
        grandTotal += itemTotal; // Send total after tax deduction
        totalTurnoverTax += taxAmount;
      });
    }
    
    // Generate Invoice Reference from Order Type + Reference Number
    let invoiceRef = formData.invoiceRef;
    if (!invoiceRef && orderRef) {
      // If no invoiceRef, use orderRef as fallback
      invoiceRef = orderRef;
    }
    
    // Ensure all required fields are present and in correct format
    const invoiceData = {
      cusCode: formData.account || '-',
      cusName: formData.customerName || '-',
      cusVillage: formData.vila || '-',
      cusDistrict: formData.dity || '-',
      cusProvince: formData.povint || '-',
      cusCountry: formData.cusCountry || '-',
      orderRef: orderRef,
      orderDate: formatDateForAPI(formData.orderDate), // Use selected order date
      ivRef: invoiceRef,
      ivDate: formatDateForAPI(formData.invoiceDate || formData.orderDate), // Use invoice date or fallback to order date
      cusRef: formData.cusRef || '-',
      delRef: formData.delRef || '-',
      delDate: formatDateForAPI(formData.deliveryDate || formData.orderDate), // Use delivery date or fallback to order date
      totalStdDisc: formData.totalStdDisc || '0',
      totalSMDisc: formData.totalSMDisc || '0',
      turnoverTax: totalTurnoverTax.toString(),
      grandTotalAmt: grandTotal.toString(),
      paidType: formData.transType === 'Cash' ? 'CASHH' : 'TRANSFER',
      dataItem: formData.items && formData.items.length > 0 ? formData.items.map(item => {
        const qty = parseFloat(item.qty) || 0;
        const calculatedAmount = qty * 1000000; // 1 unit = 1,000,000 KIP
        const taxPercentage = parseFloat(item.taxPercentage) || 0;
        
        const subtotal = calculatedAmount;
        const taxAmount = subtotal * (taxPercentage / 100);
        const itemTotal = subtotal - taxAmount; // Amount after tax deduction
        
        return {
          itemCode: item.itemCode || '',
          location: item.location || '',
          descript: item.descript || 'Ezload',
          serialNo: item.serialNo || '',
          qty: item.qty || '1',
          amountKIP: itemTotal.toString() // Send amount after tax deduction
        };
      }) : [{
        itemCode: '',
        location: '',
        descript: 'Ezload',
        serialNo: '',
        qty: '1',
        amountKIP: '0'
      }]
    };
    
    console.log('Formatted invoice data:', invoiceData);
    console.log('Final ivDate being sent to API:', invoiceData.ivDate);
    console.log('Final orderDate being sent to API:', invoiceData.orderDate);
    console.log('Final delDate being sent to API:', invoiceData.delDate);
    return invoiceData;
  }
}; 