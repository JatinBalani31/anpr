import React, { useState } from "react";
import axios from "axios"; // Import Axios for making HTTP requests
import "./SignUpForm.css"; // Import CSS file for styling

const LoginSignUpForm = () => {
  // State to manage form mode (login or sign-up)
  const [mode, setMode] = useState("login");

  // State to store input values
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("gatekeeper");
  const [password, setPassword] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (mode === "login") {
        // Handle login
        response = await axios.post(" http://localhost:5000/login", {
          email,
          password,
        });
      } else {
        // Handle sign-up
        response = await axios.post(" http://localhost:5000/signup", {
          email,
          username,
          role,
          password,
        });
      }
      console.log("Server response:", response.data);
      // Handle successful form submission, e.g., redirect user
    } catch (error) {
      console.error("Error:", error);
      // Handle error, e.g., show error message to user
    }
  };

  return (
    <div className="login-signup-container">
      <form onSubmit={handleSubmit} className="login-signup-form">
        <h2>{mode === "login" ? "Log In" : "Sign Up"}</h2>
        {mode === "signup" && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {mode === "signup" && (
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="gatekeeper">Gatekeeper</option>
            <option value="guest">Guest</option>
          </select>
        )}
        <button type="submit">{mode === "login" ? "Log In" : "Sign Up"}</button>
        <p>
          {mode === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
          >
            {mode === "login" ? "Sign Up" : "Log In"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginSignUpForm;
