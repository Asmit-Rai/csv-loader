import "../css/SignIn.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function userData(e) {
    e.preventDefault();
    const response = await fetch("https://csv-loader-backend-9uya.onrender.com/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: email,
        userPassword: password,
      }),
    });

    const responseData = await response.json();
    if (responseData.auth == true) {
      sessionStorage.setItem("user", JSON.stringify(responseData.auth));
      alert(`Login Successful ${email}`);
      navigate("/");
    } else {
      alert("Incorrect Email and Password");
    }
  }

  return (
    <div className="signin-container">
      <div className="signin-card">
        <p className="title">Sign In</p>
        <form className="signin-form" onSubmit={userData}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
