import React from 'react'
import { useNavigate } from "react-router-dom";
import './Login.css'
import { useState } from 'react';
import axios from "axios"

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async(event) => {
    event.preventDefault()
    const req=await axios.post("https://project-management-dashboard-bvuh.onrender.com/login", {
      email: email,
      password: password
    });
    const message=req.data.message;
    const isLogin=req.data.isLogin;
    if(isLogin){
        alert(message)
        navigate('/dashboard')
    }
    else{
        alert(message)
    }
  };
  return (
    <div className="login-container">
       <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" name="email" id="email"placeholder="Email" required value={email}
          onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" name="password"id="password" placeholder="Password" required value={password}
          onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/signup">Sign Up</a></p>  
    </div>
  )
}

export default Login