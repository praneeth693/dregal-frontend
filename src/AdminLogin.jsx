import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API = "https://dreagal-backend.onrender.com";

  const handleLogin = async () => {
    setError("");
    try {
      const response = await fetch(`${API}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("adminAuth", "true");
        navigate("/admin");
      } else {
        setError(data.message || "Wrong Password");
      }
    } catch (error) {
      console.log(error);
      setError("Server error");
    }
  };

  return (
    <>
      <h2>Admin Login</h2>

      <input
        type="password"
        placeholder="Enter Admin Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>
        Login
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}

export default AdminLogin;