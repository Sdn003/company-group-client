import React from 'react';
import './Navbar.css'
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="navBar_wrapper">
      <div className="navBar_container" onClick={() => navigate("/")}>
        Company Groups Management
      </div>
      <div className="navBar__btn">
        <button onClick={() => navigate("/")}>Home</button>
      </div>
    </div>
  );
}

export default Navbar