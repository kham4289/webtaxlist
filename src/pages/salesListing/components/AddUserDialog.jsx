import React, { useState } from 'react';

const AddUserDialog = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    c_code: '',
    c_name: '',
    c_village: '',
    c_district: '',
    c_province: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      c_code: '',
      c_name: '',
      c_village: '',
      c_district: '',
      c_province: ''
    });
    onClose();
  };

  const handleCancel = () => {
    setFormData({
      c_code: '',
      c_name: '',
      c_village: '',
      c_district: '',
      c_province: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(5px)'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #fff 0%, #f8f9ff 100%)',
        borderRadius: '20px',
        padding: '32px',
        width: '90%',
        height: '400px',
        marginTop: '50px',
        maxWidth: '650px',
        paddingTop: '20px',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        animation: 'slideIn 0.3s ease-out',
        fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '30px'
        }}>
          <h2 style={{
            color: '#2c3e50',
            fontWeight: 700,
            fontSize: '24px',
            lineHeight: "1.4",
            margin: '0 0 8px 0',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
          }}>
            ເພີ່ມຂໍ້ມູນຜູ້ໃຊ້
          </h2>
          <div style={{
            width: '60px',
            height: '3px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            margin: '0 auto',
            borderRadius: '2px'
          }}></div>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* First row: Customer Code and Customer Name */}
          <div style={{ 
            display: 'flex', 
            gap: '16px', 
            marginBottom: '20px' 
          }}>
            <div style={{ flex: 1 }}>
              <label style={{ 
                display: 'block', 
                color: '#2c3e50', 
                fontWeight: 600, 
                marginBottom: '8px',
                fontSize: '14px',
                fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
              }}>
                ລະຫັດລູກຄ້າ
              </label>
              <input
                type="text"
                value={formData.c_code}
                onChange={(e) => handleInputChange('c_code', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e8e8e8',
                  borderRadius: '12px',
                  fontSize: '14px',
                  transition: 'all 0.3s ease',
                  backgroundColor: '#fafafa',
                  boxSizing: 'border-box',
                  fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.backgroundColor = '#fff';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e8e8e8';
                  e.target.style.backgroundColor = '#fafafa';
                  e.target.style.boxShadow = 'none';
                }}
                required
              />
            </div>
            <div style={{ flex: 2 }}>
              <label style={{ 
                display: 'block', 
                color: '#2c3e50', 
                fontWeight: 600, 
                marginBottom: '8px',
                fontSize: '14px',
                fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
              }}>
                ຊື່ລູກຄ້າ
              </label>
              <input
                type="text"
                value={formData.c_name}
                onChange={(e) => handleInputChange('c_name', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e8e8e8',
                  borderRadius: '12px',
                  fontSize: '14px',
                  transition: 'all 0.3s ease',
                  backgroundColor: '#fafafa',
                  boxSizing: 'border-box',
                  fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.backgroundColor = '#fff';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e8e8e8';
                  e.target.style.backgroundColor = '#fafafa';
                  e.target.style.boxShadow = 'none';
                }}
                required
              />
            </div>
          </div>

          {/* Second row: Village, District, Province */}
          <div style={{ 
            display: 'flex', 
            gap: '16px', 
            marginBottom: '30px' 
          }}>
            <div style={{ flex: 1 }}>
              <label style={{ 
                display: 'block', 
                color: '#2c3e50', 
                fontWeight: 600, 
                marginBottom: '8px',
                fontSize: '14px',
                fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
              }}>
                ບ້ານ
              </label>
              <input
                type="text"
                value={formData.c_village}
                onChange={(e) => handleInputChange('c_village', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e8e8e8',
                  borderRadius: '12px',
                  fontSize: '14px',
                  transition: 'all 0.3s ease',
                  backgroundColor: '#fafafa',
                  boxSizing: 'border-box',
                  fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.backgroundColor = '#fff';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e8e8e8';
                  e.target.style.backgroundColor = '#fafafa';
                  e.target.style.boxShadow = 'none';
                }}
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ 
                display: 'block', 
                color: '#2c3e50', 
                fontWeight: 600, 
                marginBottom: '8px',
                fontSize: '14px',
                fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
              }}>
                ເມືອງ
              </label>
              <input
                type="text"
                value={formData.c_district}
                onChange={(e) => handleInputChange('c_district', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e8e8e8',
                  borderRadius: '12px',
                  fontSize: '14px',
                  transition: 'all 0.3s ease',
                  backgroundColor: '#fafafa',
                  boxSizing: 'border-box',
                  fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.backgroundColor = '#fff';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e8e8e8';
                  e.target.style.backgroundColor = '#fafafa';
                  e.target.style.boxShadow = 'none';
                }}
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ 
                display: 'block', 
                color: '#2c3e50', 
                fontWeight: 600, 
                marginBottom: '8px',
                fontSize: '14px',
                fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
              }}>
                ແຂວງ
              </label>
              <input
                type="text"
                value={formData.c_province}
                onChange={(e) => handleInputChange('c_province', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e8e8e8',
                  borderRadius: '12px',
                  fontSize: '14px',
                  transition: 'all 0.3s ease',
                  backgroundColor: '#fafafa',
                  boxSizing: 'border-box',
                  fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.backgroundColor = '#fff';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e8e8e8';
                  e.target.style.backgroundColor = '#fafafa';
                  e.target.style.boxShadow = 'none';
                }}
                required
              />
            </div>
          </div>

          {/* Buttons row */}
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'flex-end'
          }}>
            <button
              type="button"
              onClick={handleCancel}
              style={{
                padding: '12px 24px',
                border: '2px solid #e8e8e8',
                borderRadius: '12px',
                background: '#fff',
                color: '#7f8c8d',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600,
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
                e.target.style.borderColor = '#bdc3c7';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                e.target.style.borderColor = '#e8e8e8';
              }}
            >
              ຍົກເລີກ
            </button>
            <button
              type="submit"
              style={{
                padding: '12px 24px',
                border: 'none',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #ffd11a 0%, #333333 100%)',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600,
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                fontFamily: "'Noto Sans Lao', Inter, Avenir, Helvetica, Arial, sans-serif",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
              }}
            >
              ບັນທຶກ
            </button>
          </div>
        </form>
      </div>
      
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default AddUserDialog; 