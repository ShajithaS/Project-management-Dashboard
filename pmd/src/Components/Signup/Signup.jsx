import React from 'react'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import './Signup.css'
import axios from "axios"
const Signup = () => {
  const navigate=useNavigate()
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [password, setPassword] = useState("");
  const handleSignup = async(event) => {
    event.preventDefault()
    const req=await axios.post("https://project-management-dashboard-bvuh.onrender.com/signup", {
      firstname: firstname,
      lastname: lastname,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
    });
    const message=req.data.message;
    const isSignup=req.data.isSignup;
    if(isSignup){
        alert(message)
        navigate('/login')
    }
    else{
        alert(message)
    }
  };
  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          id="firstname"
          placeholder="First Name"
          required
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          type="text"
          id="lastname"
          placeholder="Last Name"
          required
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="number"
          id="phoneNumber"
          placeholder="Phone no"
          required
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  )
}
export default Signup