import React from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login"
import Signup from "./Components/Signup/Signup"
import Dashboard from "./Components/Dashboard/Dashboard";
import Projects from "./Components/Projects/Projects";
import Profile from "./Components/Profile/Profile";
const App = () => {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects/>}></Route>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
};

export default App;
