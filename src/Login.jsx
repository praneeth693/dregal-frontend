import { useState } from "react";
import "./Login.css";
import Otp from "./Otp";

function Login({ onClose }) {
  const [mode, setMode] = useState("select");
  const [mobile, setMobile] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [error, setError] = useState("");

  const API = "https://dreagal-backend.onrender.com";

  const handleContinue = async () => {
    try {
      const response = await fetch(`${API}/api/auth/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile }),
      });

      const data = await response.json();

      if (response.ok) {
        setShowOtp(true);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdminLogin = async () => {
    setError("");
    try {
      const response = await fetch(`${API}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: adminPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("adminAuth", "true");
        window.location.href = "/admin";
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
      <div className="login-overlay">
        <div className="login-box">
          <span className="login-close" onClick={onClose}>×</span>

          {/* SELECT */}
          {mode === "select" && (
            <>
              <h2>Sign Up or Sign In</h2>

              <button
                className="continue-btn"
                style={{ marginBottom: "15px" }}
                onClick={() => setMode("user")}
              >
                USER LOGIN
              </button>

              <button
                className="continue-btn"
                onClick={() => setMode("admin")}
              >
                ADMIN LOGIN
              </button>
            </>
          )}

          {/* USER LOGIN */}
          {mode === "user" && (
            <>
              <h2>User Login</h2>

              <b>Mobile Number</b>
              <input
                type="text"
                className="login-input"
                placeholder="Enter mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />

              <button className="continue-btn" onClick={handleContinue}>
                CONTINUE
              </button>

              <p onClick={() => setMode("select")} style={{ cursor: "pointer" }}>
                ← Back
              </p>
            </>
          )}

          {/* ADMIN LOGIN */}
          {mode === "admin" && (
            <>
              <h2>Admin Login</h2>

              <input
                type="password"
                className="login-input"
                placeholder="Enter Admin Password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
              />

              <button className="continue-btn" onClick={handleAdminLogin}>
                LOGIN
              </button>

              {error && <p style={{ color: "red" }}>{error}</p>}

              <p onClick={() => setMode("select")} style={{ cursor: "pointer" }}>
                ← Back
              </p>
            </>
          )}
        </div>
      </div>

      {showOtp && (
        <Otp mobile={mobile} onClose={() => setShowOtp(false)} />
      )}
    </>
  );
}

export default Login;