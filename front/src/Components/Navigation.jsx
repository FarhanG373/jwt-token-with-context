import React, { useState, useEffect, useContext } from "react";
import logo from "../logo.svg";
import component from "./Components.module.scss";
import { Link } from "react-router-dom";
import {authContext} from '../Contaxt/Contaxt'


const Navigation = () => {
  const [open, setOpen] = useState(false);
  const [userData, setUser] = useState([]);
  const getLog = JSON.parse(localStorage.getItem("token"));
  const {getUser} = useContext(authContext);
  const logOut = () => {
    if (getLog) {
      localStorage.removeItem("token");
    } else {
      console.log("Already Logged Out");
    }
    window.location.reload();
  };
  // const getUser = async () => {
  //   const user = await axios.get("http://localhost:9999/getAll");
  //   const filteredData = user.data.data.filter((item) => item.id === data.id);
  //   if (filteredData) {
  //     setUser(filteredData);
  //   }
  // };
  useEffect(() => {
    if (getLog) {
      getUser(setUser);
    } 
  }, []);
  return (
    <nav className={component.nav}>
      <div className={component.logo}>
        <img src={logo} alt={""} />
      </div>
      <ul>
        {getLog && (
          <li>
            Welcome, {userData.map((i) => i.name)}({userData.map((i) => i.role)} User)
          </li>
        )}
        {getLog && (
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        )}
        {getLog ? (
          <li>
            <button className={component.logOut} onClick={logOut}>
              Log Out
            </button>
          </li>
        ) : (
          <li>
            <Link to="/">Login</Link>
          </li>
        )}
        {!getLog && (
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
