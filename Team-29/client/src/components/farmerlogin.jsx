import React, { useState } from "react";

export default function FarmerLogin() {
  const [phone, setPhone] = useState("");
  const [otpVisible, setOtpVisible] = useState(false);
  const [signinVisible, setSigninVisible] = useState(false);
  const [resendVisible, setResendVisible] = useState(false);
  const [resendMsg, setResendMsg] = useState("");

  function sendOTP() {
    if (phone.trim().length === 10) {
      setOtpVisible(true);
      setSigninVisible(true);
      setResendVisible(true);
      // Hide send OTP button by making it invisible:
      // (We handle by conditional rendering)
      console.log("OTP sent to: " + phone);
    } else {
      alert("Please enter a valid 10-digit phone number");
    }
  }

  function resendOTP(e) {
    e.preventDefault();
    if (phone.trim().length === 10) {
      setResendMsg(`OTP resent to ${phone}`);
      setTimeout(() => setResendMsg(""), 4000);
    } else {
      alert("Please enter a valid 10-digit phone number to resend OTP");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Implement actual sign in logic here
    alert(`Signing in with phone: ${phone} and OTP`);
  }

  return (
    <>
      {/* Global styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

        *{
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Montserrat', sans-serif;
        }

        body{
          background-color: #92dd6c;
          background: linear-gradient(to right, #e2e2e2, #92dd6c);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          height: 100vh;
        }

        .container {
          background-color: #fff;
          border-radius: 30px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
          position: relative;
          overflow: hidden;
          width: 90%;
          max-width: 400px;
          min-height: 480px;
        }

        .container p{
          font-size: 14px;
          line-height: 20px;
          letter-spacing: 0.3px;
          margin: 20px 0;
        }

        .container span{
          font-size: 12px;
        }

        .container a{
          color: #333;
          font-size: 13px;
          text-decoration: none;
          margin: 15px 0 10px;
          cursor: pointer;
        }

        .container button{
          background-color: #2da0a8;
          color: #fff;
          font-size: 12px;
          padding: 10px 45px;
          border: 1px solid transparent;
          border-radius: 8px;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-top: 10px;
          cursor: pointer;
        }

        .container button.hidden{
          background-color: transparent;
          border-color: #fff;
        }

        .container form{
          background-color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 0 40px;
          height: 100%;
        }

        .container input{
          background-color: #eee;
          border: none;
          margin: 8px 0;
          padding: 10px 15px;
          font-size: 13px;
          border-radius: 8px;
          width: 100%;
          outline: none;
        }

        .form-container {
          position: absolute;
          top: 0;
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sign-in {
          left: 0;
          width: 100%;
          z-index: 2;
        }
      `}</style>

      <div className="container" id="container">
        <div className="form-container sign-in">
          <form id="farmer-login-form" onSubmit={handleSubmit}>
            <h1 style={{ marginBottom: "20px" }}>Farmer Sign In</h1>
            <span>Enter your phone number to receive OTP</span>

            <input
              type="tel"
              id="phone"
              placeholder="Phone Number"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={10}
              pattern="[0-9]{10}"
            />

            {!otpVisible && (
              <button
                type="button"
                id="send-otp-btn"
                onClick={sendOTP}
              >
                Send OTP
              </button>
            )}

            {otpVisible && (
              <>
                <input
                  type="text"
                  id="otp"
                  placeholder="Enter OTP"
                  required
                  style={{ display: "block" }}
                />

                {resendVisible && (
                  <>
                    <a href="#" id="resend-link" onClick={resendOTP} style={{ marginTop: "10px", display: "inline-block" }}>
                      Didn't receive OTP?
                    </a>
                    {resendMsg && (
                      <p
                        id="resend-message"
                        style={{ color: "green", marginTop: "5px" }}
                      >
                        {resendMsg}
                      </p>
                    )}
                  </>
                )}
              </>
            )}

            {signinVisible && (
              <button
                type="submit"
                id="signin-btn"
                style={{ display: "inline-block" }}
              >
                Sign In
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
