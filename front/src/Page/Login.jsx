import React, { useState, useContext } from "react";
import Pages from "./Pages.module.scss";
import axios from "axios";
import {authContext} from '../Contaxt/Contaxt'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const [login, setLogin] = useState(true);

const {LogIn} = useContext(authContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await LogIn(email, password)
    } catch (error) {
      setErr(error.response.data.message);
      setLogin(false);
    }
    
  };
  return (
    <div className={Pages.signUp}>
      <div className={Pages.formDiv}>
        <h3>Log In </h3>
        <form onSubmit={onSubmit}>
          <div className={Pages.form_row}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={Pages.form_row}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={Pages.form_row}>
            <input type="submit" value="Login" />
          </div>
        </form>
        {err}
      </div>
    </div>
  );
};

export default Login;
