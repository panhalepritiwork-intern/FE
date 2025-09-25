import { useState, useEffect } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import PhoneAuth from "./PhoneAuth";
import "../assets/auth.css";

const taglines = [
  "✅ Because ticking tasks feels awesome!",
  "🎯 Focus. Finish. Celebrate.",
  "📱 Secure login with Phone OTP!"
];

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState<"login" | "signup" | "phone">("login");

  const [displayText, setDisplayText] = useState("");
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);


  useEffect(() => {
    if (charIndex < taglines[taglineIndex].length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + taglines[taglineIndex][charIndex]);
        setCharIndex(charIndex + 1);
      }, 80);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayText("");
        setCharIndex(0);
        setTaglineIndex((prev) => (prev + 1) % taglines.length);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, taglineIndex]);

  return (
    <div className="auth-page">
      <div className="auth-card">
        <p className="auth-tagline text-center">{displayText}</p>

        <div className="auth-tabs">
          <button
            className={activeTab === "login" ? "active" : ""}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={activeTab === "signup" ? "active" : ""}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </button>
          <button
            className={activeTab === "phone" ? "active" : ""}
            onClick={() => setActiveTab("phone")}
          >
            Phone OTP
          </button>
        </div>

        <div className="auth-form">
          {activeTab === "login" && <Login />}
          {activeTab === "signup" && <SignUp />}
          {activeTab === "phone" && <PhoneAuth />}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
