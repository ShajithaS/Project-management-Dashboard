import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";


const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/login");
  };
  return (
    <nav className="navbar">
      <h1 className="logo">Project Manager</h1>
      <ul className="nav-links">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </nav>
  )
}

export default Navbar