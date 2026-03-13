const API_BASE_URL = "http://172.28.17.102:4545";
function DeleteButton({ invoiceNo, onDeleted }) {
  const handleDelete = async () => {
    if (window.confirm(`ທ່ານແນ່ໃຈບໍ່ທີ່ຈະລົບ Invoice: ${invoiceNo}?`)) {
      try {
        const res = await fetch(`${API_BASE_URL}/taxInvoice/deleteInvoice/${invoiceNo}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            // mode: "cors",
          }
        );
          let data;
          try {
            data = await res.json();
          } catch {
            data = await res.text();
          }
        if (!res.ok) {
          throw new Error(`Failed to delete invoice ${res}`);
        }

        alert(`${data.resultDesc} ✅`);
        if (onDeleted) onDeleted(invoiceNo); // callback กลับไป parent
      } catch (err) {
        console.error(err);
        alert(`ບໍ່ສສມາດລົບລາຍການນີ້ໄດ້ ❌ ${err}`);
      }
    }
  };

  return (
    <button
      style={{
        //#FC2703
        background: "#e74c3c",
        color: "white",
        border: "none",
        borderRadius: "6px",
        padding: "4px 10px",
        cursor: "pointer",
        fontSize: "12px",
      }}
      onClick={handleDelete}
    >
      Delete
    </button>
  );
}

export default DeleteButton;
