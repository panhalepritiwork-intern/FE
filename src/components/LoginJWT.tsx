import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginJwt = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      if (!userCredential.user.emailVerified) {
        toast.info("Please verify your email before logging in.");
        return;
      }

      const idToken = await userCredential.user.getIdToken();

      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: userCredential.user.email,
        name: userCredential.user.displayName || "User",
        firebaseToken: idToken,
      });

      localStorage.setItem("jwtToken", res.data.token);
      localStorage.setItem("role", res.data.role);

      console.log("JWT Login Success:", res.data);
      toast.success(`Login successful! Role: ${res.data.role}`);
    } catch (error: any) {
      console.error("JWT Login error:", error);
      toast.error("Login failed. Check your credentials.");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h4>JWT + Role Login</h4>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-success w-100">
        JWT Login
      </button>
    </form>
  );
};

export default LoginJwt;
