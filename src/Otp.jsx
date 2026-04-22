import { useState, useEffect } from "react";
import "./Otp.css";

function Otp({ mobile }) {
  const [otp, setOtp] = useState(["", "", "", ""]);

  const API = "https://dreagal-backend.onrender.com";

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
    try {
      const response = await fetch(`${API}/api/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile, otp: finalOtp }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            mobile: mobile
          })
        );

        window.location.href = "/user";
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  return (
    <div className="otp-overlay">
      <div className="otp-modal">
        <h2 className="otp-title">Enter OTP</h2>

        <p className="otp-info">
          OTP sent to {mobile}
        </p>

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