import { useState } from "react";
import HomePage from "./pages/HomePage";
import lightLogo from "./assets/logo-light.png";
import darkLogo from "./assets/logo-dark.png";

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

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
      </header>

      <HomePage />
    </div>
  );
}

export default App;
