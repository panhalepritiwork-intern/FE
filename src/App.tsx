import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "./firebase";

import HomePage from "./pages/HomePage";
import lightLogo from "./assets/logo-light.png";
import darkLogo from "./assets/logo-dark.png";

//Import Firebase Auth Components
import SignUp from "./components/SignUp";
import Login from "./components/Login";

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [user, setUser] = useState<User | null>(null);

  //Track auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={theme}>
      {/* Header */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        {/* Logo + Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={theme === "light" ? lightLogo : darkLogo}
            alt="Logo"
            style={{ width: "50px", height: "50px", objectFit: "contain" }}
          />
          <h2 style={{ margin: 0 }}>Task Tracker</h2>
        </div>

        {/* Toggle Button */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {user && (
            <button
              onClick={() => signOut(auth)}
              style={{
                padding: "6px 12px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
                background: "red",
                color: "#fff",
              }}
            >
              Logout
            </button>
          )}

          <button
            onClick={toggleTheme}
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              background: "#007bff",
              color: "#fff",
            }}
          >
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
        </div>
      </header>

      {/* Main Content */}
      {user ? (
        <HomePage /> //Dashboard
      ) : (
        <div style={{ padding: "20px" }}>
          <Login />
          <SignUp />
        </div>
      )}
    </div>
  );
}

export default App;
