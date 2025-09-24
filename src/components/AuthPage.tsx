import { useState, useEffect } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import "../assets/auth.css"; 

const taglines = [
  "✅ Because ticking tasks feels awesome!",
  "🎯 Focus. Finish. Celebrate."
];

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
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
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        <div className="auth-form">{isLogin ? <Login /> : <SignUp />}</div>
      </div>
    </div>
  );
};

export default AuthPage;
