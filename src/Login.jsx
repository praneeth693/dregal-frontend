import { useState } from "react";
import "./Login.css";
import Otp from "./Otp";

function Login({ onClose }) {

  const [mode, setMode] = useState("select"); 
  const [mobile, setMobile] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [error,setError]=useState("");
  
  const handleContinue = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/send-otp", {
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
      console.error(error);
    }
  };

  // ADMIN LOGIN
  const handleAdminLogin = async () => {
    setError("");
    const response = await fetch("http://localhost:5000/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: adminPassword }),
    });

    const data= await response.json();

    if (response.ok) {
      localStorage.setItem("adminAuth", "true");
      window.location.href = "/admin";
    } else {
      setError(data.message);
    }
  };

  return (
    <>
      <div className="login-overlay">
        <div className="login-box">

          <span className="login-close" onClick={onClose}>×</span>

          {/* SELECT MODE */}
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

              <button
                className="continue-btn"
                onClick={handleContinue}
              >
                CONTINUE
              </button>

              <p
                style={{ cursor: "pointer", marginTop: "10px" }}
                onClick={() => setMode("select")}
              >
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

              <button
                className="continue-btn"
                onClick={handleAdminLogin}
              >
                LOGIN
              </button>

              <p
                style={{ cursor: "pointer", marginTop: "10px" }}
                onClick={() => setMode("select")}
              >
                ← Back
              </p>
            </>
          )}

        </div>
      </div>

      {/* OTP MODAL */}
      {showOtp && (
        <Otp
          mobile={mobile}
          onClose={() => setShowOtp(false)}
        />
      )}
    </>
  );
}

export default Login;