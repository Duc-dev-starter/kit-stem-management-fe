import React from "react";
import "./login.css";
import { Button } from "antd";

const Login: React.FC = () => {
  return (
    <div className="background">
      <div className="shape"></div>
      <div className="shape"></div>
      <form>
        <h3>Login Here</h3>

        <label htmlFor="username">Username</label>
        <input className="p-3" type="text" placeholder="Email or Phone" id="username" />

        <label htmlFor="password">Password</label>
        <input className="p-3" type="password" placeholder="Password" id="password" />

        <Button className="bg-black mt-5">Log In</Button>
        <div className="social">
          <div className="go">
            <i className="fab fa-google"></i> Google
          </div>
          <div className="fb">
            <i className="fab fa-facebook"></i> Facebook
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
