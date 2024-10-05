import React, {useState, useEffect, useContext} from 'react';
import Pages from './Pages.module.scss';
import {authContext} from '../Contaxt/Contaxt'
const Dashboard = () => {
  const { getUser, getUserPost } = useContext(authContext);
  const [data, setData] = useState([]);
  const [getPost, setGetPost] = useState([]);
  useEffect(() => {getUser(setData); getUserPost(setGetPost)},[]);
  return (
    <div>{
      data.map((item) => (
        <div key={item.id}>
          <p>Name : {item.name}</p>
          <p>Email : {item.email}</p>
          <p>UserName : {item.username}</p>
          <p>Phone : {item.phone}</p>
          <p>Role : {item.role}</p>

          </div>
      ))
    }
    
    <h2>Post from user</h2>
    {
      getPost.map((item) => (
        <div key={item.id}>
          <p>Title : {item.title}</p>
          <p>Body : {item.content}</p>
        </div>
      ))
    }
    
    </div>
  )
}

export default Dashboard