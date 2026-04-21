import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const API = "https://dreagal-backend.onrender.com";

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        localStorage.setItem("adminAuth", "true");
        navigate("/admin");
      } else {
        alert("Wrong Password");
      }
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>Admin Login</h2>

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default AdminLogin;