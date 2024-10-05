
import './App.scss';
import Navigation from './Components/Navigation';
import {Routes, Route} from 'react-router-dom';
import Login from './Page/Login';
import SignUp from './Page/SignUp';
import Dashboard from './Page/Dashboard';
import { useEffect, useState} from "react";
function App() {
  const [login, setLogin] = useState(false);
  const getLog = JSON.parse(localStorage.getItem("token"));
  useEffect(()=>{
    if(getLog) {
      setLogin(true)
    }
  },[])
  return (
    <div className="App">
      https://www.youtube.com/watch?v=BUTdsXM3ljI&t=630s
      <Navigation/>
      <Routes>
        <Route exact path="/" element={login ? <Dashboard/> : <Login/>}/> 
        <Route exact path="/signup" element={<SignUp/>}/>
        <Route exact path="/dashboard" element={login ? <Dashboard/> : <Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
