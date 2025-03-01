import React from 'react'
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Navbar from "../Navbar/Navbar";

const Dashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("User logged out");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
        <h1>Welcome to Your Dashboard</h1>
      <p>Manage your projects efficiently!</p>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h2>5</h2>
          <p>Ongoing Projects</p>
        </div>
        <div className="stat-card">
          <h2>10</h2>
          <p>Completed Projects</p>
        </div>
        <div className="stat-card">
          <h2>3</h2>
          <p>Upcoming Deadlines</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard