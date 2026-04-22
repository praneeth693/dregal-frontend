import { Navigate, useNavigate } from "react-router-dom";

function AdminPanel() {

  const navigate = useNavigate();

  return (

    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f6f9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >

      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          textAlign: "center",
          width: "400px"
        }}
      >

        <h1 style={{ marginBottom: "30px" }}>
          Admin Dashboard
        </h1>

        <button
          onClick={() => navigate("/admin/add")}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            backgroundColor: "#2c7be5",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            
          }}
        >
          Add Product
        </button>

        <button
          onClick={() => navigate("/admin/view")}
          style={{
            width: "100%",
            padding: "12px",
             marginBottom: "15px",
            backgroundColor: "#2c7be5",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            
          }}
        >
          View Products
        </button>
        

     <button
  onClick={()=>navigate("/admin/users")}
  style={{
    width: "100%",
    padding: "12px",
    marginBottom: "15px",   // ✅ ADD THIS
    backgroundColor: "#2c7be5",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  }} 
>
  Manage Users
</button>

<button
  onClick={() => navigate("/admin/orders")}
  style={{
    width: "100%",
    padding: "12px",
    backgroundColor: "#2c7be5",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  }}
>
  Manage Orders
</button>

<button
  onClick={() => navigate("/admin/stats")}
  style={{
    width: "100%",
    padding: "12px",
    backgroundColor: "#2c7be5",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  }}
>
  STATISTICS
</button>


      </div>

    </div>

  );

}

export default AdminPanel;