import { useState, useEffect } from "react";

function Otp({ mobile }) {

  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  useEffect(() => {
    const finalOtp = otp.join("");

    if (finalOtp.length === 4) {
      verifyOtp(finalOtp);
    }
  }, [otp]);

  const verifyOtp = async (finalOtp) => {
    const response = await fetch("http://localhost:5000/api/auth/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mobile, otp: finalOtp }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "admin") {
        window.location.href = "/admin-login";
      } else {
        window.location.href = "/user";
      }

    } else {
      alert(data.message);
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-box">
        <h2>Enter OTP</h2>

        <div className="otp-inputs">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Otp;