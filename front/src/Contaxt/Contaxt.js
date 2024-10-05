import React, { useState, createContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const authContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [login, setLogin] = useState(true);
  let Tdata = null;
  if (token) {
    Tdata = jwtDecode(token.token);
  }
  const LogIn = async (email, password) => {
    const LOGIN = await axios.post("http://localhost:9999/login", {
      email,
      password,
    });
    if (LOGIN.status === 200) {
      localStorage.setItem(
        "token",
        JSON.stringify({
          login: login,
          token: LOGIN.data.token,
        })
      );
      window.location.href = "/dashboard";
    }
  };

  const getUser = async (setUser) => {
    const user = await axios.get("http://localhost:9999/getAll");
    const filteredData = user.data.data.filter((item) => item.id === Tdata.id);
    if (filteredData) {
      setUser(filteredData);
    }
  };


  const getUserPost = async (setPost) => {
    const post = await axios.get(`http://localhost:9999/getUsersAddedPost`);
    const filteredData = post.data.data.filter((item) => {
      return item.userId === Tdata.id
    }
    );
    if (filteredData) {
      setPost(filteredData);
    }
   }

  const LogOut = () => {
    if (token) {
      localStorage.removeItem("token");
    } else {
      console.log("Already Logged Out");
    }
    window.location.reload();
  };

  return (
    <authContext.Provider value={{ LogIn, LogOut, getUser,getUserPost }}>
      {children}
    </authContext.Provider>
  );
};
