import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "./firebase";

import HomePage from "./pages/HomePage";
import lightLogo from "./assets/logo-light.png";
import darkLogo from "./assets/logo-dark.png";
import './index.css';
import AuthPage from "./components/AuthPage";

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [user, setUser] = useState<User | null>(null);

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
      <nav
        className={`navbar navbar-expand-lg shadow-sm ${
          theme === "light" ? "navbar-light bg-light" : "navbar-dark bg-dark"
        }`}
      >
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center gap-2" href="#">
            <img
              src={theme === "light" ? lightLogo : darkLogo}
              alt="Logo"
              style={{ width: "40px", height: "40px", objectFit: "contain" }}
            />
            <span className="fw-bold">Task Tracker</span>
          </a>

          <div className="d-flex align-items-center gap-2">
            {user && (
              <button
                onClick={() => signOut(auth)}
                className="btn btn-sm btn-danger"
              >
                Logout
              </button>
            )}
            <button
              onClick={toggleTheme}
              className="btn btn-sm btn-outline-primary"
            >
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        {user ? <HomePage /> : <AuthPage />}
      </div>
    </div>
  );
}

export default App;
