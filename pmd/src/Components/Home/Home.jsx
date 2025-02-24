import React from "react";
import { Link } from "react-router-dom";
import './Home.css'

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Project Management Dashboard</h1>
      <p>Organize your projects efficiently</p>
      <div className="home-buttons">
        <Link to="/login" className="btn">Login</Link>
        <Link to="/signup" className="btn">Sign Up</Link>
      </div>
    </div>
  )
};

export default Home;
