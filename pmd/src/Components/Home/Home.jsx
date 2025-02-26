import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"
import teamImage from "../../assets/teamwork.jpg"
const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Project Management Dashboard</h1>
      <h3><strong>Organize your projects efficiently</strong></h3>
      <div className="home-buttons">
        <Link to="/login" className="btn">Login</Link>
        <Link to="/signup" className="btn">Sign Up</Link>
      </div>
      <div className="home-content">
      <div className="team-image-container">
          <img src={teamImage} alt="Team Collaboration" className="team-image" />
        </div>
        <ul className="features-list">
          <li>📌 Task Management – Create, assign, and track tasks with deadlines.</li>
          <li>👥 Team Collaboration – Assign tasks to team members and track progress.</li>
          <li>📅 Project Timeline – View deadlines and project milestones at a glance.</li>
          <li>📊 Dashboard Overview – Get insights into ongoing, completed, and upcoming projects.</li>
          <li>⚡ Real-time Updates – Status updates for tasks and projects.</li>
          <li>🔔 Notifications & Reminders – Stay informed about deadlines.</li>
        </ul>
        </div>
      
    </div>
  )
};

export default Home;
