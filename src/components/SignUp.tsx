import { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { toast } from "react-toastify";
import axios from "axios";

const SignUp = () => {
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Account created for " + name);

      await sendEmailVerification(userCredential.user);
      toast.info("Verification email sent to " + email);

      const token = await userCredential.user.getIdToken();

      await axios.post(
        "http://localhost:5000/api/users/signup-store",
        { name, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("User stored in database");
    } catch (err: any) {
      console.error("Sign up error:", err);
      toast.error("Sign up failed: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

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
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-success w-100">
        Sign Up
      </button>
    </form>
  );
};

export default SignUp;
