import { useState } from "react";
import "./Login.css";
import Otp from "./Otp";
import AdminLogin from "./AdminLogin";

function Login({ onClose }) {
  const [mode, setMode] = useState("select");
  const [mobile, setMobile] = useState("");
  const [showOtp, setShowOtp] = useState(false);

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

  return (
    <>
      <div className="login-overlay">
        <div className="login-box">

          <span className="login-close" onClick={onClose}>×</span>

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

          {mode === "admin" && (
            <>
              <AdminLogin />

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