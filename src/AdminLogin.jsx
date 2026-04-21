import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const API =
    import.meta.env.DEV
      ? "http://localhost:5000"
      : "https://dreagal-backend.onrender.com";

const handleLogin = async () => {
  try {
    const response = await fetch(`${API}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const data = await response.json();
    console.log("RESPONSE:", data);

    if (response.ok) {
      localStorage.setItem("adminAuth", "true");
      navigate("/admin");
    } else {
      alert("Wrong Password");
    }
  } catch (error) {
    console.log("ERROR:", error);
    alert("Server error");
  }
};
  return (
    <div style={{ padding: "40px" }}>
      <h2>Admin Password</h2>
      <input
        type="password"
        placeholder="Enter Admin Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default AdminLogin;