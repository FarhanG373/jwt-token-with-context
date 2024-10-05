import React, { useState } from "react";
import Pages from "./Pages.module.scss";
import axios from "axios";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [err, setErr] = useState(null);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const API = await axios.post(`http://localhost:9999/reg`, {
        name,
        email,
        phone,
        username,
        password,
        role,
      });
      if (API.status === 201) {
        alert("User registered successfully!");
      }
    } catch (error) {
      setErr(error.response.data.message);
    }
  };
  return (
    <div className={Pages.signUp}>
      <div className={Pages.formDiv}>
        <h3>SignUp</h3>
        <form onSubmit={onSubmit}>
          <div className={Pages.form_row}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={Pages.form_row}>
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              name="phone"
              id="phone"
              onChange={(e) => setPhone(e.target.value)}
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
            <label htmlFor="role">Role:</label>
            <select id="role" onChange={(e) => setRole(e.target.value)}>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <div className={Pages.form_row}>
            <input type="submit" value="Sign Up" />
          </div>
        </form>
        {err}
      </div>
    </div>
  );
};

export default SignUp;
