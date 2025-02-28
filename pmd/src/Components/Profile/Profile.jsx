import React, { useState } from "react";
import "./Profile.css";
import img from "../../assets/profile.png";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "xyz",
    role: "Software Developer",
    info: "Passionate about building efficient and scalable applications. Skilled in MERN stack and always eager to learn new technologies.",
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    console.log("Profile Updated:", profile);
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    console.log("User logged out");
    navigate("/login");
  };
  const handleGoToDashboard = () => {
    navigate("/projects");
  };

  return (
    <div>
    <h2 profile-title>User Profile</h2>
    <div className="profile-container">
      <img src={img} alt="Profile" className="profile-img" />
      
      {isEditing ? (
        <input 
          type="text" 
          name="name" 
          value={profile.name} 
          onChange={handleChange} 
          className="profile-input" 
        />
      ) : (
        <h2 className="profile-name">{profile.name}</h2>
      )}

      {isEditing ? (
        <input 
          type="text" 
          name="role" 
          value={profile.role} 
          onChange={handleChange} 
          className="profile-input" 
        />
      ) : (
        <p className="profile-role">{profile.role}</p>
      )}

      {isEditing ? (
        <textarea 
          name="info" 
          value={profile.info} 
          onChange={handleChange} 
          className="profile-textarea" 
        />
      ) : (
        <p className="profile-info">{profile.info}</p>
      )}

      <div className="profile-actions">
        {isEditing ? (
          <button className="profile-btn save-btn" onClick={handleSaveClick}>
            Save
          </button>
        ) : (
          <button className="profile-btn edit-btn" onClick={handleEditClick}>
            Edit Profile
          </button>
        )}
        <button className="profile-btn logout-btn" onClick={handleLogout}>
          Logout
        </button>
        <button className="profile-btn dashboard-btn" onClick={handleGoToDashboard}>
          Go to Dashboard
        </button>
      </div>
    </div>
    </div>
  );
};

export default Profile;
