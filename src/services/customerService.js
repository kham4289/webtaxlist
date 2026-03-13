// Customer API Service
const API_BASE_URL = 'http://172.28.17.102:4545';

export const customerService = {
  // Test API connectivity
  async testConnection() {
    console.log('Testing API connection...');
    try {
      const response = await fetch(`${API_BASE_URL}/taxInvoice/quryCustomer?cusCode=1111`);
      console.log('Test response status:', response.status);
      console.log('Test response ok:', response.ok);
      return response.ok;
    } catch (error) {
      console.error('API connection test failed:', error);
      return false;
    }
  },

  // Get customer data by customer code
  async getCustomerByCode(customerCode) {
    console.log('customerService.getCustomerByCode called with:', customerCode);
    const url = `${API_BASE_URL}/taxInvoice/quryCustomer?cusCode=${customerCode}`;
    console.log('API URL:', url);
    
    try {
      console.log('Making fetch request...');
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors', // Enable CORS
      });
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      console.log('Response headers:', response.headers);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Response data:', data);
      return data;
    } catch (error) {
      console.error('Error in customerService.getCustomerByCode:', error);
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('ບໍ່ສາມາດເຊື່ອມຕໍ່ກັບ API server ໄດ້');
      }
      throw error;
    }
  },

  // Parse customer data and return formatted object
  parseCustomerData(customerData) {
    console.log('parseCustomerData called with:', customerData);
    
    if (!customerData || customerData.length === 0) {
      console.log('No customer data found');
      return null;
    }

    const customer = customerData[0]; // Assuming API returns an array
    console.log('First customer in array:', customer);
    
    const parsedCustomer = {
      cusCode: customer.cusCode || customer.code || '',
      cusName: customer.cusName || customer.name || '',
      cusVillage: customer.cusVillage || customer.village || '',
      cusDistrict: customer.cusDistrict || customer.district || '',
      cusProvince: customer.cusProvince || customer.province || '',
      // Add more fields as needed based on API response
    };
    
    console.log('Parsed customer:', parsedCustomer);
    return parsedCustomer;
  }
};

export default customerService; 