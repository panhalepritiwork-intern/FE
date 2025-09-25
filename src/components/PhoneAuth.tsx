import { useState } from "react";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast } from "react-toastify";

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier | null;
    confirmationResult: any;
  }
}

const PhoneAuth = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const setupRecaptcha = () => {
    if (window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier.clear();
      } catch (err) {
        console.log("Old reCAPTCHA clear error:", err);
      }
      window.recaptchaVerifier = null;
    }

    window.recaptchaVerifier = new RecaptchaVerifier(
      auth, 
      "recaptcha-container", 
      {
        size: "normal",
        callback: (response: any) => {
          console.log("reCAPTCHA solved:", response);
        },
      }
    );

    window.recaptchaVerifier.render().then((widgetId: any) => {
      console.log("reCAPTCHA widget ready:", widgetId);
    });
  };

  const sendOtp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone) {
      toast.error("Please enter phone number");
      return;
    }

    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier!;

    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        toast.success("OTP sent! (For test numbers, use fixed OTP e.g. 123456)");
        console.log("OTP confirmationResult:", confirmationResult);
      })
      .catch((err: any) => {
        console.error("Send OTP error:", err);
        toast.error("Error sending OTP: " + err.message);
      });
  };

  
  const verifyOtp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!window.confirmationResult) {
      toast.info("Please request OTP first");
      return;
    }

    window.confirmationResult
      .confirm(otp)
      .then((result: any) => {
        toast.success("Phone verified: " + result.user.phoneNumber);
        console.log("Verified user:", result.user);
      })
      .catch((err: any) => {
        console.error("Verify error:", err);
        toast.error("Invalid OTP: " + err.message);
      });
  };

  return (
    <div>
      <form onSubmit={sendOtp}>
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="text"
            className="form-control"
            placeholder="+91XXXXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-warning w-100">
          Send OTP
        </button>
      </form>

      <form onSubmit={verifyOtp} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Enter OTP</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Verify OTP
        </button>
      </form>


      <div id="recaptcha-container" className="mt-3"></div>
    </div>
  );
};

export default PhoneAuth;
