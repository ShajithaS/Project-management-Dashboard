import React from 'react'
import "./Profile.css"
import img from "../../assets/profile.png"
const Profile = () => {
  return (
    <div className="profile-container">
      <img 
        src={img} 
        alt="Profile" 
        className="profile-img" 
      />
      <h2 className="profile-name">xyz</h2>
      <p className="profile-role">Software Developer</p>
      <p className="profile-info">
        Passionate about building efficient and scalable applications. Skilled in
        MERN stack and always eager to learn new technologies.
      </p>
      <div className="profile-actions">
        <button className="profile-btn">Edit Profile</button>
        <button className="profile-btn">Logout</button>
      </div>
    </div>
  )
}

export default Profile